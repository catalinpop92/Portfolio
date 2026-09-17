import socket
from datetime import datetime

# -----------------------
# COLORI ANSI (OUTPUT CONSOLE)
# -----------------------
# Usati per evidenziare in rosso le porte considerate rischiose
RED = "\033[91m"
RESET = "\033[0m"

# -----------------------
# DATABASE PORTE RISCHIOSE
# -----------------------
# Dizionario: porta -> (servizio, descrizione rischio)
# Serve solo per contestualizzare le porte aperte
RISKY_PORTS = {
    20:  ("FTP-DATA", "Trasferimento FTP in chiaro"),
    21:  ("FTP", "Protocollo in chiaro, brute force"),
    22:  ("SSH", "Target comune per brute force"),
    23:  ("Telnet", "NON cifrato, molto insicuro"),
    25:  ("SMTP", "Possibile abuso relay"),
    53:  ("DNS", "Rischi di misconfigurazione"),
    69:  ("TFTP", "Nessuna autenticazione"),
    80:  ("HTTP", "Vulnerabilità applicative"),
    110: ("POP3", "Autenticazione debole"),
    111: ("RPCbind", "Spesso esposto"),
    135: ("RPC Windows", "Servizi sensibili Windows"),
    139: ("NetBIOS", "Enumerazione rete"),
    143: ("IMAP", "Autenticazione in chiaro"),
    161: ("SNMP", "Community strings deboli"),
    389: ("LDAP", "Directory esposta"),
    443: ("HTTPS", "Attacchi lato applicativo"),
    445: ("SMB", "Molto sfruttato in exploit"),
    512: ("rexec", "In chiaro, obsoleto"),
    513: ("rlogin", "In chiaro, obsoleto"),
    514: ("rsh", "In chiaro, obsoleto"),
    873: ("rsync", "Accesso a file se mal configurato"),
    1433: ("MSSQL", "Database esposto"),
    1521: ("Oracle DB", "Servizio critico"),
    2049: ("NFS", "Possibili leak file system"),
    3306: ("MySQL", "Molto rischioso se esposto"),
    3389: ("RDP", "Attacchi forza bruta"),
    5432: ("PostgreSQL", "Rischioso se accessibile"),
    5900: ("VNC", "Accesso remoto debole"),
    6379: ("Redis", "Accesso senza autenticazione"),
    8080: ("HTTP-alt", "Web server custom"),
    9200: ("Elasticsearch", "Accesso diretto ai dati"),
}

# -----------------------
# FILE DI LOG
# -----------------------
# Nome del file dove verranno salvati i risultati
filename = "port_scan.txt"

# -----------------------
# INPUT UTENTE
# -----------------------
# IP o hostname da scansionare
target = input("IP da scansionare: ")

# Range di porte in formato es. 20-100
portrange = input("Range delle porte (es 20-100): ")

# Estrazione porta iniziale e finale dal range
lowport = int(portrange.split('-')[0])
highport = int(portrange.split('-')[1])

print(f"Scansionando l'IP {target} da porta {lowport} a porta {highport}")

# Apertura file in append per non sovrascrivere scansioni precedenti
with open(filename, "a", encoding="utf-8") as file:

    # Intestazione della scansione
    file.write("Scansione porte\n")
    file.write(f"Target: {target}\n")
    file.write(f"Porte: {lowport}-{highport}\n")
    file.write(f"Ora inizio: {datetime.now()}\n")
    file.write("-" * 40 + "\n")

    # -----------------------
    # SCANSIONE PORTE
    # -----------------------
    for port in range(lowport, highport + 1):

        # Creazione socket TCP
        s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

        # Timeout per evitare blocchi su porte filtrate
        s.settimeout(1)

        # Tentativo di connessione alla porta
        status = s.connect_ex((target, port))

        # Se connect_ex restituisce 0, la porta è aperta
        if status == 0:

            # Se la porta è nel database delle porte rischiose
            if port in RISKY_PORTS:
                service, risk = RISKY_PORTS[port]

                # Output evidenziato in rosso
                print(f"{RED}Porta {port}: APERTA -> {service} | Rischio: {risk}{RESET}")

                # Log dettagliato su file
                file.write(f"Porta {port}: APERTA - {service} | Rischio: {risk}\n")

            else:
                # Porta aperta ma non classificata come rischiosa
                print(f"Porta {port}: APERTA")
                file.write(f"Porta {port}: APERTA\n")

        else:
            # Porta chiusa o filtrata
            print(f"Porta {port}: CHIUSA")
            file.write(f"Porta {port}: CHIUSA\n")

        # Chiusura del socket
        s.close()

    # Footer della scansione
    file.write("-" * 40 + "\n")
    file.write(f"Fine scansione: {datetime.now()}\n")
    file.write("-" * 40 + "\n")

print(f"\nRisultati salvati in: {filename}")
