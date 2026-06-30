# Roadmap — Progetto Italia

## Visione

Costruire, in modo incrementale, una piattaforma di analisi economico-industriale
sull'ecosistema italiano basata solo su fonti autorevoli e certificate, che copra
progressivamente le aree tematiche indicate nel [README](../README.md). Vedi
[ARCHITETTURA.md](ARCHITETTURA.md) per le scelte tecniche.

## Fase 0 — Fondamenta (in corso)

- [x] README con visione e aree di interesse
- [x] `docs/ARCHITETTURA.md`: stack tecnico e struttura repo
- [x] `docs/ROADMAP.md`: questo documento
- [x] Linee guida editoriali minime (template per una nuova analisi, checklist fonti)

## Fase 1 — MVP contenuti

Obiettivo: validare il formato con contenuti reali, senza ancora costruire
infrastruttura complessa.

- [x] Scaffold Next.js + MDX in `/apps/web` (layout minimo, lista articoli, pagina articolo)
- [x] 2–3 analisi pilota in 1–2 settori (es. `spazio-osservazione-terra`,
  `energia-green-economy`)
- [ ] Ricerca testuale base (Pagefind)
- [ ] Deploy pubblico (Vercel o equivalente)

## Fase 2 — Dati e visualizzazione

- [ ] Primo script ETL in `/scripts` per un settore (es. dati ESA/space economy o
  energia da Eurostat)
- [ ] Dashboard/grafici incorporati nelle analisi del settore scelto
- [ ] Componente mappa (MapLibre) per contenuti geospaziali/telerilevamento

## Fase 3 — Espansione

- [ ] Copertura di tutti i settori del README
- [ ] Versione inglese per contenuti di interesse internazionale (space economy,
  difesa/dual-use)
- [ ] Automazione parziale dell'aggiornamento dati (job periodici)

## Fase 4 — Eventuale (da validare quando/se serve)

- [ ] Autenticazione per contenuti riservati o ad accesso limitato
- [ ] Collaborazione multi-autore con workflow di review basato su PR
- [ ] Alert su nuove pubblicazioni/paper rilevanti per i settori monitorati

## Prossimi passi immediati

1. Aggiungere ricerca testuale base (Pagefind) sul sito
2. Decidere hosting/account per il deploy pubblico (Vercel o equivalente)
3. Procedere con la Fase 2 (primo script ETL e visualizzazioni dati)
