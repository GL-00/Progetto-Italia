# Linee guida editoriali — Progetto Italia

## Principio generale

Ogni analisi pubblicata deve potersi ricondurre a fonti autorevoli e certificate
(paper peer-reviewed, report istituzionali, dataset ufficiali). Nessuna affermazione
quantitativa senza una fonte citata.

## Chi fa cosa: raccolta fonti vs assistenza

La raccolta primaria delle fonti — sapere cosa esiste, leggerlo, valutarne la
rilevanza — resta un lavoro umano (lettura, conoscenza di settore, accesso a banche
dati specialistiche). La ricerca web di Claude è un campione di quello che è
indicizzato e raggiungibile online, non l'insieme di quello che esiste: non sostituisce
la raccolta primaria, e un risultato di ricerca (anche una ricerca "approfondita") non
va trattato come elenco esaustivo.

Il ruolo utile di Claude in questo progetto è:
- verificare fonti, dati e affermazioni già raccolti (date, attribuzioni, citazioni)
- fare ricerche puntuali e delimitate su elementi specifici e nominati
- aiutare a scrivere e strutturare l'analisi applicando il [quadro teorico](QUADRO-TEORICO.md)

## Dove va una nuova analisi

Un file MDX in `/content/<settore>/<slug>.mdx` oppure, se il settore ha sottotemi,
`/content/<settore>/<sottotema>/<slug>.mdx` (vedi
[ARCHITETTURA.md](ARCHITETTURA.md#4-struttura-del-repository-proposta)). `<slug>` è un
nome breve in kebab-case (es. `space-economy-2026.mdx`).

## Schema del frontmatter

```yaml
---
title: "Titolo dell'analisi"
settore: "spazio-osservazione-terra"   # deve corrispondere al nome della cartella
data: "2026-06-30"                     # data di pubblicazione/ultimo aggiornamento, ISO 8601
autore: "Nome Cognome"
sintesi: "Una o due frasi di riassunto, usate nelle liste articoli."
fonti:
  - "Nome fonte — link o riferimento bibliografico completo"
tags: ["tag1", "tag2"]
---
```

Tutti i campi sono obbligatori tranne `tags` (opzionale). `fonti` deve contenere almeno
un elemento.

Se l'analisi applica esplicitamente una delle quattro prospettive orizzontali definite
in [ARCHITETTURA.md](ARCHITETTURA.md#settori-verticali-vs-prospettive-orizzontali) —
M&A, R&S, Sicurezza economico-finanziaria, Patrimonio industriale e tecnologico — la si
segnala in `tags`, usando esattamente questi nomi.

## Checklist prima della pubblicazione

- [ ] Ogni dato/affermazione quantitativa ha una fonte corrispondente in `fonti`
- [ ] Le fonti sono autorevoli e certificate (istituzioni, paper peer-reviewed, dataset
  ufficiali) — non blog, social o fonti non verificabili
- [ ] Dove possibile, almeno due fonti indipendenti confermano i dati chiave
- [ ] La data nel frontmatter riflette l'effettiva data di redazione/aggiornamento
- [ ] Per il settore `difesa-dual-use`: l'analisi resta a livello economico,
  industriale e di policy — nessun contenuto tecnico-progettuale su sistemi d'arma

## Template

Per la sezione "Analisi", uno scheletro utile (non obbligatorio) è la tecnica
Struttura-Condotta-Performance — vedi
[QUADRO-TEORICO.md](QUADRO-TEORICO.md#struttura-condotta-performance-scp): struttura
del mercato, poi condotta delle imprese, poi performance quando i dati lo permettono.

```mdx
---
title: ""
settore: ""
data: ""
autore: ""
sintesi: ""
fonti:
  - ""
tags: []
---

## Contesto

## Analisi

## Implicazioni

## Fonti citate

```
