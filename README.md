# Progetto-Italia

Piattaforma di analisi economico-industriale dell'ecosistema italiano.

Con conoscenze e/o competenze in materia di tutela dell'economia, dei mercati finanziari e creditizi, quotazioni mobiliari e dei titoli di Stato, contrasto alle forme più complesse di evasione ed elusione fiscale, tutela dalle minacce al patrimonio industriale e al know how tecnologico, nonché minacce derivanti dal riciclaggio o reimpiego di capitali illeciti, green economy e transizione energetica, approvvigionamento energetico ed energie rinnovabili, funzioni corporate, M&A e R&S.

Tra i settori di maggiore interesse vi sono:
- armamenti, missilistica e tecnologie associate, nonché materiali dual use e reti di procurement;
- sistemi satellitari, infrastrutture e programmi internazionali in ambito spaziale e aereospaziale;
- space economy in ambito nazionale ed internazionale;
- telerilevamento e interpretazione di immagini satellitari;
- lingue rare e dialetti d'area;
- infografica, editing, elaborazioni e produzioni di prodotti e supporti grafici, mappe e grafici.

Avvalersi solo di fonti autorevoli e certificate. Analisi di pubblicazioni scientifiche (paper) sugli argomenti.

---

## La piattaforma

Web app statica, senza dipendenze né build step: si apre direttamente nel browser (`index.html`) ed è pubblicabile così com'è su GitHub Pages.

### Contenuti

- **Panoramica** — l'economia italiana in un colpo d'occhio: PIL e sua composizione per macro-settore (con dettaglio del terziario), bilancia commerciale 2019–2024 e chi la traina, prime voci dell'export e mercati di sbocco, primati competitivi ("dove l'Italia si differenzia").
- **Settori e filiere** — 10 settori strategici (difesa, spazio, energia, meccanica strumentale, automotive, farmaceutica, agroalimentare, moda e lusso, semiconduttori, cantieristica e nautica). Ogni scheda ricostruisce la **catena del valore da monte a valle** e mappa le aziende che operano in ciascuno stadio, con KPI, punti di forza, criticità e fonti.
- **Aziende** — indice trasversale ricercabile e filtrabile di tutte le presenze aziendali mappate nelle filiere (azienda → ruolo → settore → stadio).
- **Metodologia e fonti** — fonti primarie (ISTAT, Banca d'Italia, Eurostat, ICE, associazioni di categoria), note di lettura e avvertenze.

### Architettura

```
index.html          shell della SPA (routing via hash: #/, #/settori, #/settore/<id>, #/aziende, #/metodologia)
assets/style.css    tema chiaro/scuro, palette dati validata daltonismo-compatibile, componenti UI
assets/data.js      dataset analitico: macroeconomia + catene del valore settoriali (unico punto di modifica dei contenuti)
assets/charts.js    motore grafici SVG senza dipendenze (donut, barre, colonne, barre divergenti, tooltip)
assets/app.js       router e renderer delle pagine
```

### Come aggiornare i dati

Tutti i contenuti vivono in `assets/data.js`:
- `MACRO` — indicatori macro, composizione del PIL, bilancia commerciale, export, primati;
- `SETTORI` — un oggetto per settore con `kpi`, `catena` (stadi con `posizione` MONTE/CENTRO/VALLE e `aziende`), `forza`, `criticita`, `fonti`.

I valori sono riferiti al 2024 (consuntivi e stime); il simbolo ≈ segnala ordini di grandezza. Le aziende citate sono una selezione rappresentativa, non un censimento.
