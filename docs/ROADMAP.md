# Roadmap — Progetto Italia

## Visione

Uno strumento di lavoro **personale** per fare analisi economico-industriali
sull'ecosistema italiano, basato solo su fonti autorevoli e certificate, che copra
progressivamente le aree tematiche indicate nel [README](../README.md). Non è un sito
pubblico: serve a raccogliere fonti, scrivere analisi e tenerne traccia nel tempo. Vedi
[ARCHITETTURA.md](ARCHITETTURA.md) per le scelte tecniche.

## Metodo: prima per argomenti, poi orizzontale

Si documenta il dominio **per argomenti** (fatti, attori, dati, con fonti — un
argomento alla volta, dentro il suo sottotema), costruendo ampiezza prima di
profondità. L'applicazione sistematica del [quadro teorico](QUADRO-TEORICO.md) — l'
**analisi orizzontale** che confronta più argomenti tra loro (es. barriere all'entrata
a confronto tra difesa, spazio ed energia) — arriva in un secondo momento, quando c'è
abbastanza copertura perché il confronto abbia senso. Non è un tipo di documento
diverso né uno schema separato: è solo la sequenza di lavoro — un'analisi può nascere
fattuale e diventare più interpretativa quando la riprendi in mano.

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

## Fase 2 — Dati e visualizzazione (solo quando serve davvero)

Non una pipeline da costruire a prescindere: si attiva la prima volta che un'analisi
specifica richiede di elaborare un dataset (es. confrontare più anni), non prima.

- [ ] Primo script una tantum, quando capita il primo caso reale che lo richiede
- [ ] Componente grafico/mappa incorporato in un'analisi, se quell'analisi ne ha
  davvero bisogno

## Fase 3 — Espansione

- [ ] Documentare per argomenti: copertura dei settori del README, un argomento alla
  volta (fatti, attori, dati con fonti) — prima l'ampiezza, non ancora l'analisi
  orizzontale
- [ ] Quando c'è copertura sufficiente: prime analisi orizzontali che confrontano più
  argomenti/settori applicando il quadro teorico (vedi "Metodo" sopra)
- [ ] Automazione parziale dell'aggiornamento dati (job periodici)

## Fase 4 — Eventuale (da validare quando/se serve)

- [ ] Autenticazione, solo se si decide di accedere da un deploy privato
  (vedi decisione in sospeso in Fase 1)
- [ ] Alert su nuove pubblicazioni/paper rilevanti per i settori monitorati

## Prossimi passi immediati

1. Aggiungere ricerca testuale base (Pagefind) sul sito
2. Procedere con la Fase 2 (primo script ETL e visualizzazioni dati)
