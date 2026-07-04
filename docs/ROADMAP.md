# Roadmap — Progetto Italia

## Visione

Uno strumento di lavoro **personale** per fare analisi economico-industriali
sull'ecosistema italiano, basato solo su fonti autorevoli e certificate, che copra
progressivamente le aree tematiche indicate nel [README](../README.md). Non è un sito
pubblico: serve a raccogliere fonti, scrivere analisi e tenerne traccia nel tempo. Vedi
[ARCHITETTURA.md](ARCHITETTURA.md) per le scelte tecniche.

## Metodo: prima per argomenti, poi orizzontale

Si documenta il dominio **per argomenti** dentro ciascun **settore verticale** — Energia
e green economy, Spazio e osservazione della Terra, Difesa e dual-use, Intelligenza
artificiale — fatti, attori, dati, con fonti, un argomento alla volta, costruendo
ampiezza prima di profondità.

L'**analisi orizzontale** applica sistematicamente una delle quattro **prospettive**
del [quadro teorico](QUADRO-TEORICO.md) — M&A, R&S, Sicurezza economico-finanziaria,
Patrimonio industriale e tecnologico — a più settori verticali insieme (es. barriere
all'entrata a confronto tra difesa, spazio ed energia, dalla prospettiva patrimonio
industriale). Arriva in un secondo momento, quando c'è abbastanza copertura verticale
perché il confronto abbia senso. Non è un tipo di documento diverso né uno schema
separato: un'analisi verticale può già segnalare nei tag una prospettiva che applica;
un'analisi orizzontale ne applica una a più settori insieme. Vedi
[ARCHITETTURA.md](ARCHITETTURA.md#settori-verticali-vs-prospettive-orizzontali) per il
dettaglio.

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

- [ ] Documentare per argomenti: copertura dei 4 settori verticali, un argomento alla
  volta (fatti, attori, dati con fonti) — prima l'ampiezza, non ancora l'analisi
  orizzontale
- [ ] Quando c'è copertura sufficiente: prime analisi orizzontali che applicano una
  prospettiva (M&A, R&S, Sicurezza economico-finanziaria, Patrimonio industriale e
  tecnologico) a più settori insieme (vedi "Metodo" sopra)
- [ ] Automazione parziale dell'aggiornamento dati (job periodici)

## Fase 4 — Eventuale (da validare quando/se serve)

- [ ] Autenticazione, solo se si decide di accedere da un deploy privato
  (vedi decisione in sospeso in Fase 1)
- [ ] Alert su nuove pubblicazioni/paper rilevanti per i settori monitorati

## Prossimi passi immediati

1. Aggiungere ricerca testuale base (Pagefind) sul sito
2. Procedere con la Fase 2 (primo script ETL e visualizzazioni dati)
