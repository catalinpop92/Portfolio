import http.client
import socket
from datetime import datetime


# ===============================
# Richiesta dati all’utente
# ===============================

host = input("Inserire IP o hostname: ")
port = input("Inserire la porta (default 80): ")

# Se l’utente non inserisce nulla, viene usata la porta HTTP standard
if port == "":
    port = 80
else:
    port = int(port)

# Path del sito da testare
path = input("Inserire il path (default /): ")

# Se non viene inserito nulla, viene usata la root
if path == "":
    path = "/"

# Se il path non inizia con / lo aggiungiamo automaticamente
if not path.startswith("/"):
    path = "/" + path


# ===============================
# Impostazione file di log
# ===============================

file_name = f"httpscan_{host}_{port}_{path.replace('/', '_')}.txt"


# ===============================
# Funzione di logging
# ===============================
def log(*msg, blank_before=False, blank_after=False):
    with open(file_name, "a", encoding="utf-8") as f:
        if blank_before:
            f.write("\n")

        message = " ".join(map(str, msg))
        f.write(f"{message}\n")

        if blank_after:
            f.write("\n")


# ===============================
# Avvio scansione
# ===============================

start_time = datetime.now()

with open(file_name, "a", encoding="utf-8") as f:
    f.write(
        f"Scansione avviata il {start_time.strftime('%Y-%m-%d')} "
        f"alle ore {start_time.strftime('%H:%M:%S')}\n"
    )
    f.write("========================================\n\n")


# ===============================
# Metodi HTTP da testare
# ===============================

methods = ["OPTIONS", "GET", "POST", "PUT", "DELETE"]


# ===============================
# Ciclo principale di scansione
# ===============================

for method in methods:
    print("\n===============================")
    print("Metodo HTTP:", method)
    print("===============================")
    print("Path:", path)

    log("===============================", blank_before=True)
    log("Metodo HTTP:", method)
    log("===============================")
    log("Path:", path)

    try:
        # Apertura della connessione HTTP verso il target
        conn = http.client.HTTPConnection(host, port, timeout=5)

        headers = {}
        body = None

        # POST e PUT richiedono un body di test
        if method == "POST" or method == "PUT":
            body = "test-body"
            headers = {
                "Content-Type": "text/plain",
                "Content-Length": str(len(body))
            }

        # Invio della richiesta HTTP
        conn.request(method, path, body=body, headers=headers)

        # Ricezione della risposta dal server
        response = conn.getresponse()

        print("Status:", response.status)
        print("Reason:", response.reason)
        log("Status:", response.status)
        log("Reason:", response.reason)

        # Gestione specifica del metodo OPTIONS
        if method == "OPTIONS":
            allow_header = response.getheader("Allow")

            print(
                "Metodi consentiti:",
                allow_header if allow_header else "[header Allow non presente]"
            )
            log(
                "Metodi consentiti:",
                allow_header if allow_header else "[header Allow non presente]",
                blank_after=True
            )

        else:
            # Lettura parziale del body per evitare output troppo lunghi
            response_body = response.read(200).decode(errors="ignore")

            print("Body:")
            print(response_body if response_body else "[vuoto]")
            log("Body:")
            log(response_body if response_body else "[vuoto]", blank_after=True)

        # Chiusura della connessione
        conn.close()

    # Timeout di rete
    except socket.timeout:
        print("Errore: timeout della connessione")
        log("Errore: timeout della connessione", blank_after=True)

    # Server raggiungibile ma connessione rifiutata
    except ConnectionRefusedError:
        print("Errore: connessione rifiutata")
        log("Errore: connessione rifiutata", blank_after=True)

    # Qualsiasi altro errore non previsto
    except Exception as e:
        print("Errore generico:", e)
        log("Errore generico:", e, blank_after=True)


# ===============================
# Fine scansione
# ===============================

end_time = datetime.now()
duration = end_time - start_time

total_seconds = int(duration.total_seconds())
hours = total_seconds // 3600
minutes = (total_seconds % 3600) // 60
seconds = total_seconds % 60

with open(file_name, "a", encoding="utf-8") as f:
    f.write("========================================\n")
    f.write(
        f"Scansione completata il {end_time.strftime('%Y-%m-%d')} "
        f"alle ore {end_time.strftime('%H:%M:%S')}\n"
    )
    f.write(
        f"Durata totale della scansione: "
        f"{hours:02d}:{minutes:02d}:{seconds:02d}\n"
    )


print("\n===============================")
print("Fine Programma")
print("===============================")
