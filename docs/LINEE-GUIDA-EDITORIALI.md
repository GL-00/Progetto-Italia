# Linee guida editoriali — Progetto Italia

## Principio generale

Ogni analisi pubblicata deve potersi ricondurre a fonti autorevoli e certificate
(paper peer-reviewed, report istituzionali, dataset ufficiali). Nessuna affermazione
quantitativa senza una fonte citata.

## Dove va una nuova analisi

Un file MDX in `/content/<settore>/<slug>.mdx`, dove `<settore>` è una delle cartelle
definite in [ARCHITETTURA.md](ARCHITETTURA.md#4-struttura-del-repository-proposta) e
`<slug>` è un nome breve in kebab-case (es. `space-economy-2026.mdx`).

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

## Checklist prima della pubblicazione

- [ ] Ogni dato/affermazione quantitativa ha una fonte corrispondente in `fonti`
- [ ] Le fonti sono autorevoli e certificate (istituzioni, paper peer-reviewed, dataset
  ufficiali) — non blog, social o fonti non verificabili
- [ ] Dove possibile, almeno due fonti indipendenti confermano i dati chiave
- [ ] La data nel frontmatter riflette l'effettiva data di redazione/aggiornamento
- [ ] Per il settore `difesa-dual-use`: l'analisi resta a livello economico,
  industriale e di policy — nessun contenuto tecnico-progettuale su sistemi d'arma

## Template

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
