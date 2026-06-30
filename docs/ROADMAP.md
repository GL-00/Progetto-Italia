# Roadmap — Progetto Italia

## Visione

Uno strumento di lavoro **personale** per fare analisi economico-industriali
sull'ecosistema italiano, basato solo su fonti autorevoli e certificate, che copra
progressivamente le aree tematiche indicate nel [README](../README.md). Non è un sito
pubblico: serve a raccogliere fonti, scrivere analisi e tenerne traccia nel tempo. Vedi
[ARCHITETTURA.md](ARCHITETTURA.md) per le scelte tecniche.

## Fase 0 — Fondamenta (in corso)

- [x] README con visione e aree di interesse
- [x] `docs/ARCHITETTURA.md`: stack tecnico e struttura repo
- [x] `docs/ROADMAP.md`: questo documento
- [x] Linee guida editoriali minime (template per una nuova analisi, checklist fonti)

## Fase 1 — MVP contenuti

Obiettivo: validare il formato con contenuti reali, senza ancora costruire
infrastruttura complessa.

- [x] Scaffold Next.js + MDX in `/apps/web`, in stile dashboard di lavoro (non sito
  editoriale): sidebar per area, home con copertura e analisi recenti
- [x] 2–3 analisi pilota in 1–2 settori (es. `spazio-osservazione-terra`,
  `energia-green-economy`)
- [ ] Ricerca testuale base (Pagefind)
- [ ] Accesso oltre al locale (eventuale deploy privato) — **decisione in sospeso**,
  per ora si usa con `npm run dev`

## Fase 2 — Dati e visualizzazione

- [ ] Primo script ETL in `/scripts` per un settore (es. dati ESA/space economy o
  energia da Eurostat)
- [ ] Dashboard/grafici incorporati nelle analisi del settore scelto
- [ ] Componente mappa (MapLibre) per contenuti geospaziali/telerilevamento

## Fase 3 — Espansione

- [ ] Copertura di tutti i settori del README
- [ ] Automazione parziale dell'aggiornamento dati (job periodici)

## Fase 4 — Eventuale (da validare quando/se serve)

- [ ] Autenticazione, solo se si decide di accedere da un deploy privato
  (vedi decisione in sospeso in Fase 1)
- [ ] Alert su nuove pubblicazioni/paper rilevanti per i settori monitorati

## Prossimi passi immediati

1. Aggiungere ricerca testuale base (Pagefind) sul sito
2. Procedere con la Fase 2 (primo script ETL e visualizzazioni dati)
