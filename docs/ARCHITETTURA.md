# Architettura — Progetto Italia

## 1. Cos'è

Uno strumento di lavoro **personale** per analisi economico-industriali
dell'ecosistema italiano, basato solo su fonti autorevoli e certificate (paper
scientifici, report istituzionali, dataset ufficiali), organizzato per aree tematiche
come definite nel [README](../README.md). Non è un sito destinato a un pubblico.

## 2. Principi architetturali

- **Contenuto prima di tutto**: ogni scelta tecnica è subordinata alla qualità,
  tracciabilità e verificabilità delle analisi pubblicate.
- **Fonti tracciabili**: ogni dato o affermazione deve poter risalire a una fonte citata.
- **Iterazione leggera**: si parte da un sito statico semplice; backend, database e
  autenticazione si introducono solo quando una funzionalità lo richiede davvero.
- **Apertura**: stack open-source, nessun vendor lock-in critico, dati versionati in git
  dove possibile.
- **Struttura minima ed emergente**: niente database, niente registro di fonti/entità
  (soggetti, indicatori, eventi) con ID da mantenere sincronizzati. Una cartella o un
  file si creano quando c'è davvero qualcosa da scriverci, non prima. Per una persona
  sola, ripetere una citazione in due analisi costa meno che mantenere un indice.

## 3. Stack tecnico proposto

| Livello | Scelta | Motivazione |
|---|---|---|
| Contenuti | Markdown/MDX con frontmatter strutturato | Versionabile in git, leggibile, permette di incorporare componenti (grafici, mappe) negli articoli |
| Frontend | Next.js (App Router) + Tailwind CSS | Generazione statica, ecosistema maturo per MDX e componenti interattivi |
| Mappe/geospaziale | MapLibre GL JS | Open-source, supporta tile raster/satellitari — utile per telerilevamento e cartografia |
| Grafici | Recharts / Observable Plot | Componenti leggeri per dashboard dati incorporate negli articoli |
| Ricerca | Pagefind | Ricerca full-text statica, zero infrastruttura server |
| Dati/ETL | Python (pandas, httpx), solo se serve | Niente pipeline permanente: uno script si scrive solo quando un'analisi richiede davvero di elaborare un dataset (es. confrontare più anni); altrimenti il dato si cita inline con link alla fonte |
| Hosting | Locale (`npm run dev`) | Uso personale, nessun deploy per ora — un eventuale deploy privato è una decisione in sospeso (vedi roadmap) |

Database, backend dinamico e autenticazione **non** sono previsti finché non emerge un
requisito concreto (es. accesso da più dispositivi via deploy privato, contributi
multi-autore con workflow di review).

## 4. Struttura del repository proposta

```
/docs                              documentazione di progetto (roadmap, architettura, linee guida)
/content/<settore>/<sottotema>/*.mdx   analisi: documenti autosufficienti, fonti citate inline
/data/...                          solo se un'analisi richiede davvero un dataset elaborato — eccezione, non regola
/scripts/                          solo lo script che serve in quel momento — eccezione, non pipeline permanente
/apps/web/                         dashboard Next.js per consultare e navigare le analisi
```

I sottotemi non si pianificano tutti in anticipo per tutti i settori verticali: la cartella
si crea quando c'è davvero la prima analisi da scriverci. Ogni file MDX è autosufficiente
— cita le sue fonti (qualitative e quantitative) direttamente nel testo, come già fatto
nei pilota e in `QUADRO-TEORICO.md`. Nessun registro fonti separato, nessun ID, nessuna
entità "soggetto"/"indicatore"/"evento" da mantenere a parte.

### Settori verticali vs prospettive orizzontali

Due categorie distinte, non equivalenti — vedi anche il
["Metodo" in ROADMAP.md](ROADMAP.md#metodo-prima-per-argomenti-poi-orizzontale).

**Settori (verticali)** — i domini sostanziali dove si documenta per argomenti (fatti,
attori, dati), ciascuno con la propria cartella `/content/<settore>`:

- `energia-green-economy` — transizione energetica, rinnovabili, approvvigionamento
- `spazio-osservazione-terra` — sistemi satellitari, programmi internazionali, space
  economy, telerilevamento
- `difesa-dual-use` — armamenti, missilistica, materiali dual-use, reti di procurement
  (analisi economico-industriale e di policy, non contenuti tecnico-progettuali)
- `intelligenza-artificiale` — filiera e applicazioni economico-industriali dell'IA

**Prospettive di analisi (orizzontali)** — le lenti del
[quadro teorico](QUADRO-TEORICO.md) applicate trasversalmente a più settori verticali
insieme. Non sono cartelle a sé: un'analisi le segnala nei `tags` del frontmatter
quando le applica esplicitamente.

- M&A
- R&S
- Sicurezza economico-finanziaria
- Patrimonio industriale e tecnologico

Un'analisi vive sempre nella cartella del settore verticale che tratta
(`/content/<settore>/...`); se applica una prospettiva lo dichiara nei tag, non cambia
cartella.

Un terzo asse, distinto da entrambi: le **tecniche di analisi** (il *come* si
struttura il ragionamento, non il *dove* o il *quale tema*) — per ora la sola
[Struttura-Condotta-Performance (SCP)](QUADRO-TEORICO.md#struttura-condotta-performance-scp),
documentata nel quadro teorico.

## 5. Flusso editoriale e qualità delle fonti

1. Individuazione di una fonte autorevole e certificata (paper peer-reviewed, report
   istituzionale, dataset ufficiale)
2. Verifica incrociata (almeno due fonti indipendenti quando possibile)
3. Bozza analisi in MDX: dati e fonti citati inline nel testo, con link alle fonti
   originali (un script di elaborazione dati si scrive solo se quel caso specifico lo
   richiede davvero, non come passaggio standard)
4. Auto-revisione: fonti citate? dati riproducibili? data di aggiornamento indicata?
5. Salvataggio del file in `/content/<settore>/<sottotema>` — consultabile da subito
   nella dashboard

## 6. Cosa non facciamo (per ora)

- Nessun deploy pubblico: uso locale, salvo diversa decisione futura
- Nessun backend con autenticazione/utenti
- Nessun database né registro di fonti/soggetti/indicatori con ID da tenere
  sincronizzati: è overhead da mantenere senza un bisogno reale dietro
- Nessuno scraping automatizzato di fonti non autorizzate o paywalled
- Nessun contenuto tecnico-progettuale su sistemi d'arma: l'analisi del settore
  difesa/dual-use resta a livello economico, industriale e di policy
