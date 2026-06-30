# Architettura — Progetto Italia

## 1. Cos'è

Una piattaforma di analisi economico-industriale dell'ecosistema italiano, basata solo su
fonti autorevoli e certificate (paper scientifici, report istituzionali, dataset ufficiali),
organizzata per aree tematiche come definite nel [README](../README.md).

## 2. Principi architetturali

- **Contenuto prima di tutto**: ogni scelta tecnica è subordinata alla qualità,
  tracciabilità e verificabilità delle analisi pubblicate.
- **Fonti tracciabili**: ogni dato o affermazione deve poter risalire a una fonte citata.
- **Iterazione leggera**: si parte da un sito statico semplice; backend, database e
  autenticazione si introducono solo quando una funzionalità lo richiede davvero.
- **Apertura**: stack open-source, nessun vendor lock-in critico, dati versionati in git
  dove possibile.

## 3. Stack tecnico proposto

| Livello | Scelta | Motivazione |
|---|---|---|
| Contenuti | Markdown/MDX con frontmatter strutturato | Versionabile in git, leggibile, permette di incorporare componenti (grafici, mappe) negli articoli |
| Frontend | Next.js (App Router) + Tailwind CSS | Generazione statica, buon SEO, ecosistema maturo per MDX e componenti interattivi |
| Mappe/geospaziale | MapLibre GL JS | Open-source, supporta tile raster/satellitari — utile per telerilevamento e cartografia |
| Grafici | Recharts / Observable Plot | Componenti leggeri per dashboard dati incorporate negli articoli |
| Ricerca | Pagefind | Ricerca full-text statica, zero infrastruttura server |
| Dati/ETL | Python (pandas, httpx) | Script di raccolta/normalizzazione da fonti aperte (ISTAT, Banca d'Italia, Eurostat, ESA, SIPRI, OCSE, ecc.) |
| Hosting | Vercel/Netlify o static hosting equivalente | Nessun backend necessario in Fase 1; deploy continuo da git |

Database, backend dinamico e autenticazione **non** sono previsti finché non emerge un
requisito concreto (es. contenuti riservati, contributi multi-autore con workflow di review).

## 4. Struttura del repository proposta

```
/docs                        documentazione di progetto (roadmap, architettura, linee guida)
/content/<settore>/*.mdx     analisi pubblicate, una cartella per area tematica
/data/<settore>/             dataset grezzi e processati, con provenienza documentata
/scripts/                    pipeline Python per raccolta/normalizzazione dati
/apps/web/                   applicazione Next.js (sito pubblico) — introdotta in Fase 1
```

### Aree tematiche (`/content/<settore>`)

Mappate dalle aree di interesse indicate nel README:

- `sicurezza-economico-finanziaria` — mercati finanziari/creditizi, evasione/elusione
  fiscale, antiriciclaggio
- `patrimonio-industriale-tecnologico` — know-how, proprietà industriale
- `energia-green-economy` — transizione energetica, rinnovabili, approvvigionamento
- `corporate-ma-rs` — funzioni corporate, M&A, R&S
- `difesa-dual-use` — armamenti, missilistica, materiali dual-use, reti di procurement
  (analisi economico-industriale e di policy, non contenuti tecnico-progettuali)
- `spazio-osservazione-terra` — sistemi satellitari, programmi internazionali, space
  economy, telerilevamento
- `lingue-aree` — lingue rare e dialetti d'area, a supporto linguistico/culturale
  dell'analisi
- `cartografia-infografica` — mappe, grafici, prodotti visivi, trasversale agli altri
  settori

## 5. Flusso editoriale e qualità delle fonti

1. Individuazione di una fonte autorevole e certificata (paper peer-reviewed, report
   istituzionale, dataset ufficiale)
2. Verifica incrociata (almeno due fonti indipendenti quando possibile)
3. Estrazione/elaborazione dati (script versionato in `/scripts`, se quantitativo)
4. Bozza analisi in MDX con citazioni puntuali e link alle fonti originali
5. Auto-revisione: fonti citate? dati riproducibili? data di aggiornamento indicata?
6. Pubblicazione

## 6. Cosa non facciamo (per ora)

- Nessun backend con autenticazione/utenti
- Nessuno scraping automatizzato di fonti non autorizzate o paywalled
- Nessun contenuto tecnico-progettuale su sistemi d'arma: l'analisi del settore
  difesa/dual-use resta a livello economico, industriale e di policy
