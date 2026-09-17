import socket
import struct
from datetime import datetime

# File di log dove verranno salvate tutte le informazioni sui pacchetti
LOG_FILE = "all_protocols_log.txt"

# Contatore incrementale per identificare univocamente ogni pacchetto
packet_id = 0


def log(line):
    """
    Scrive una riga nel file di log e la stampa a schermo.
    Serve a mantenere traccia persistente del traffico osservato.
    """
    with open(LOG_FILE, "a", encoding="utf-8") as f:
        f.write(line + "\n")
    print(line)


def ip_addr(raw):
    """
    Converte un indirizzo IP da formato binario (4 byte)
    al formato leggibile 'x.x.x.x'
    """
    return ".".join(map(str, raw))


# -----------------------
# CREAZIONE RAW SOCKET
# -----------------------
# AF_PACKET: accesso diretto al livello Ethernet (solo Linux)
# SOCK_RAW: ricezione pacchetti grezzi
# ETH_P_ALL (3): cattura TUTTI i frame Ethernet, indipendentemente dal protocollo
s = socket.socket(socket.AF_PACKET, socket.SOCK_RAW, socket.ntohs(3))

log("Sniffer avviato (CTRL+C per fermare)")

try:
    while True:
        # Riceve un frame Ethernet completo (fino a 65535 byte)
        packet, _ = s.recvfrom(65535)

        packet_id += 1

        # Timestamp ad alta precisione per analisi temporale
        ts = datetime.now().strftime("%Y-%m-%d %H:%M:%S.%f")[:-3]

        # =====================================================
        # LIVELLO 2 — ETHERNET
        # =====================================================
        # L'header Ethernet è lungo 14 byte:
        # 6 byte MAC destinazione
        # 6 byte MAC sorgente
        # 2 byte EtherType
        eth_header = packet[:14]
        dst, src, eth_type = struct.unpack("!6s6sH", eth_header)

        # EtherType 0x0800 indica IPv4
        # Ignoriamo ARP, IPv6, ecc. per semplificare l'analisi
        if eth_type != 0x0800:
            continue

        # =====================================================
        # LIVELLO 3 — IP
        # =====================================================
        # L'header IP minimo è 20 byte (può essere più lungo)
        ip_header = packet[14:34]

        # Parsing dei campi principali dell'header IP
        ver_ihl, tos, length, _, _, ttl, proto, _, src_ip, dst_ip = struct.unpack(
            "!BBHHHBBH4s4s", ip_header
        )

        # IHL (Internet Header Length) indica la lunghezza reale dell'header IP
        # Serve per sapere dove inizia il livello successivo
        ihl = (ver_ihl & 0x0F) * 4

        # Mappa numero protocollo IP → nome leggibile
        ip_proto_name = {
            1: "ICMP",
            6: "TCP",
            17: "UDP"
        }.get(proto, f"IP_PROTO_{proto}")

        # =====================================================
        # LIVELLO 4 — TCP
        # =====================================================
        if proto == 6:
            # Offset di inizio dell'header TCP
            tcp_start = 14 + ihl

            # Header TCP minimo: 20 byte
            tcp_header = packet[tcp_start:tcp_start + 20]

            # Estrazione dei campi principali TCP
            src_port, dst_port, seq, ack, off_flags, win, chk, urg = struct.unpack(
                "!HHLLHHHH", tcp_header
            )

            # Data Offset indica la lunghezza dell'header TCP
            offset = (off_flags >> 12) * 4

            # Calcolo della dimensione del payload TCP
            payload_len = len(packet) - (tcp_start + offset)

            log(
                f"[{packet_id:06d}] {ts} | "
                f"{ip_addr(src_ip)}:{src_port} → {ip_addr(dst_ip)}:{dst_port} | "
                f"TCP | payload={payload_len}B"
            )

        # =====================================================
        # LIVELLO 4 — UDP
        # =====================================================
        elif proto == 17:
            # L'header UDP ha dimensione fissa di 8 byte
            udp_start = 14 + ihl
            udp_header = packet[udp_start:udp_start + 8]

            src_port, dst_port, length, checksum = struct.unpack(
                "!HHHH", udp_header
            )

            # Il payload UDP è la lunghezza totale meno l'header
            payload_len = length - 8

            log(
                f"[{packet_id:06d}] {ts} | "
                f"{ip_addr(src_ip)}:{src_port} → {ip_addr(dst_ip)}:{dst_port} | "
                f"UDP | payload={payload_len}B"
            )

        # =====================================================
        # LIVELLO 4 — ICMP
        # =====================================================
        elif proto == 1:
            icmp_start = 14 + ihl

            # Header ICMP minimo: 4 byte
            icmp_type, code, checksum = struct.unpack(
                "!BBH", packet[icmp_start:icmp_start + 4]
            )

            log(
                f"[{packet_id:06d}] {ts} | "
                f"{ip_addr(src_ip)} → {ip_addr(dst_ip)} | "
                f"ICMP | type={icmp_type} code={code}"
            )

        # =====================================================
        # ALTRI PROTOCOLLI IP
        # =====================================================
        else:
            # Protocolli IP non decodificati esplicitamente
            # (es. GRE, ESP, OSPF, ecc.)
            log(
                f"[{packet_id:06d}] {ts} | "
                f"{ip_addr(src_ip)} → {ip_addr(dst_ip)} | "
                f"{ip_proto_name}"
            )

except KeyboardInterrupt:
    # Terminazione controllata dello sniffer
    log("Sniffer terminato")
