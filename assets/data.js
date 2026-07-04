/* ============================================================
   Progetto Italia — Dataset analitico
   Valori indicativi riferiti al 2024 (consuntivi e stime),
   salvo diversa indicazione. Fonti primarie: ISTAT, Banca
   d'Italia, Eurostat, MEF, associazioni di categoria citate
   in ogni scheda. Importi in miliardi di euro (mld €).
   ============================================================ */

const MACRO = {
  anno: 2024,
  kpi: [
    { label: "PIL nominale", value: "€2.192 mld", delta: "+0,7% reale", trend: "up" },
    { label: "Export di beni", value: "€623,5 mld", delta: "2° manifattura UE", trend: "flat" },
    { label: "Saldo commerciale", value: "+€54,9 mld", delta: "dal -€34 mld del 2022", trend: "up" },
    { label: "Occupati", value: "24,1 mln", delta: "tasso occupazione 62,2%", trend: "up" },
    { label: "Debito pubblico", value: "135,3% PIL", delta: "≈ €3.000 mld", trend: "warn" },
    { label: "Inflazione (IPCA)", value: "+1,1%", delta: "rientrata dai picchi 2022", trend: "up" },
  ],

  // Composizione del valore aggiunto per macro-settore (% sul totale)
  pilComposizione: [
    { label: "Servizi", value: 74, detail: "Commercio, turismo, finanza, PA, immobiliare, professioni" },
    { label: "Industria in senso stretto", value: 19, detail: "di cui manifattura ≈ 15%" },
    { label: "Costruzioni", value: 5, detail: "Spinta 2021-23 dai bonus edilizi" },
    { label: "Agricoltura", value: 2, detail: "Ma a monte di un agroalimentare da €69 mld di export" },
  ],

  // Dettaglio dei servizi (% sul valore aggiunto totale)
  serviziDettaglio: [
    { label: "Commercio, trasporti, alloggio e ristorazione", value: 21 },
    { label: "PA, istruzione e sanità", value: 16 },
    { label: "Attività immobiliari", value: 13 },
    { label: "Servizi professionali e alle imprese", value: 10 },
    { label: "Finanza e assicurazioni", value: 5 },
    { label: "Informazione e comunicazione (ICT)", value: 4 },
    { label: "Altri servizi", value: 5 },
  ],

  // Bilancia commerciale beni (mld €) — ISTAT, coe.istat.it
  bilancia: [
    { anno: 2019, exp: 476, imp: 423 },
    { anno: 2020, exp: 436, imp: 373 },
    { anno: 2021, exp: 516, imp: 476 },
    { anno: 2022, exp: 625, imp: 659 },
    { anno: 2023, exp: 626, imp: 592 },
    { anno: 2024, exp: 623, imp: 569 },
  ],
  bilanciaNota:
    "Il rosso del 2022 è interamente energetico: lo shock dei prezzi di gas e petrolio ha gonfiato l'import di oltre €110 mld. Al netto dell'energia, la manifattura italiana genera stabilmente uno dei cinque maggiori surplus commerciali al mondo (≈ €100 mld), trainato da meccanica, farmaceutica, moda e agroalimentare.",

  // Prime voci dell'export di beni, mld € (classificazione ATECO, valori indicativi 2024)
  topExport: [
    { label: "Macchinari e apparecchi", value: 89, nota: "1ª voce: meccanica strumentale, packaging, macchine utensili" },
    { label: "Moda e accessori (tessile, abbigliamento, pelle)", value: 62, nota: "Include l'occhialeria e la pelletteria delle grandi maison" },
    { label: "Alimentari, bevande e tabacco", value: 59, nota: "€69 mld l'agroalimentare esteso; vino €8,1 mld" },
    { label: "Mezzi di trasporto", value: 57, nota: "Auto premium, componentistica, nautica, aerospazio" },
    { label: "Farmaceutica", value: 54, nota: "Export quasi triplicato in dieci anni" },
    { label: "Metalli e prodotti in metallo", value: 53, nota: "Acciai speciali, rubinetteria, forgiati" },
    { label: "Chimica, gomma e plastica", value: 52, nota: "Chimica fine e specialità" },
    { label: "Elettronica ed elettrotecnica", value: 35, nota: "Cavi, apparecchiature elettriche, semiconduttori" },
    { label: "Mobili e arredo", value: 20, nota: "Design: 1° esportatore UE di mobili" },
  ],

  // Quote dei principali mercati di sbocco (% export beni, 2024)
  partner: [
    { label: "Germania", value: 11.4 },
    { label: "Stati Uniti", value: 10.7 },
    { label: "Francia", value: 10.1 },
    { label: "Spagna", value: 5.5 },
    { label: "Svizzera", value: 4.8 },
    { label: "Regno Unito", value: 4.4 },
    { label: "Polonia", value: 3.3 },
    { label: "Cina", value: 2.5 },
  ],

  // Dove l'Italia si differenzia
  differenziazione: [
    { icona: "🏭", titolo: "2ª manifattura d'Europa", testo: "Dietro solo alla Germania per valore aggiunto manifatturiero; tra i cinque paesi al mondo con surplus manifatturiero superiore a $100 mld (Fondazione Edison su dati WTO)." },
    { icona: "📦", titolo: "Leader mondiale del packaging", testo: "La \"packaging valley\" emiliana (IMA, Coesia, Marchesini, Sacmi) domina le macchine per il confezionamento farmaceutico e alimentare: ~80% della produzione esportata." },
    { icona: "💊", titolo: "Hub farmaceutico d'Europa", testo: "1°-2° produttore UE di farmaci e 1° per principi attivi; polo mondiale del conto terzi (CDMO) e del vetro farmaceutico (Stevanato)." },
    { icona: "🛥️", titolo: "1° al mondo nei superyacht", testo: "Circa metà del portafoglio ordini globale di yacht sopra i 24 metri (Global Order Book); leadership assoluta nelle navi da crociera con Fincantieri." },
    { icona: "🛰️", titolo: "Potenza spaziale completa", testo: "Tra i pochi paesi con l'intera filiera: lanciatori (Avio), satelliti (Thales Alenia Space), servizi (Telespazio). 3° contributore ESA, leadership nel radar (COSMO-SkyMed)." },
    { icona: "🧀", titolo: "1° paese per prodotti DOP/IGP", testo: "856 denominazioni certificate, una \"DOP economy\" da €20 mld; 1° esportatore mondiale di vino in volume e riferimento del food premium." },
    { icona: "👓", titolo: "Capitale mondiale dell'occhialeria", testo: "Il distretto di Belluno con EssilorLuxottica, Safilo, Marcolin e De Rigo produce gran parte dell'eyewear di fascia alta mondiale." },
    { icona: "🧵", titolo: "L'unica filiera completa del lusso", testo: "Circa metà della produzione mondiale di beni di lusso passa da fabbriche e laboratori italiani, anche per conto delle maison francesi." },
  ],
};

/* ============================================================
   SETTORI — catene del valore da monte a valle
   ============================================================ */

const SETTORI = [
  {
    id: "difesa",
    icona: "🛡️",
    nome: "Difesa e Sicurezza",
    tagline: "Dai materiali avanzati ai sistemi d'arma: una filiera presente in tutti i domini — terra, mare, cielo, spazio e cyber.",
    kpi: [
      { label: "Fatturato filiera", value: "≈ €18 mld" },
      { label: "Addetti diretti", value: "≈ 55.000" },
      { label: "Spesa per la difesa", value: "≈ 1,5% PIL" },
      { label: "Export autorizzato", value: "≈ €6 mld/anno" },
    ],
    catena: [
      {
        fase: "R&S e materiali avanzati",
        posizione: "MONTE",
        descrizione: "Ricerca su materiali, propulsione e tecnologie dual use; centri pubblici e laboratori industriali.",
        aziende: [
          { nome: "CIRA", ruolo: "Centro Italiano Ricerche Aerospaziali (Capua)" },
          { nome: "Leonardo Labs", ruolo: "Rete di laboratori corporate su AI, materiali, quantum" },
          { nome: "Avio Aero (GE)", ruolo: "Additive manufacturing e trasmissioni aeronautiche" },
          { nome: "CETENA", ruolo: "Ricerca navale del gruppo Fincantieri" },
          { nome: "Distretti aerospaziali", ruolo: "DAC Campania, DAP Puglia, Piemonte, Lazio" },
        ],
      },
      {
        fase: "Componenti e sottosistemi",
        posizione: "MONTE",
        descrizione: "Elettronica di difesa, attuazione, munizionamento, equipaggiamenti: il tessuto di media impresa specializzata.",
        aziende: [
          { nome: "Elettronica Group", ruolo: "Guerra elettronica (Roma)" },
          { nome: "Microtecnica (Collins)", ruolo: "Attuatori e controlli di volo" },
          { nome: "Magnaghi Aeronautica", ruolo: "Carrelli d'atterraggio" },
          { nome: "Simmel Difesa (KNDS)", ruolo: "Munizionamento" },
          { nome: "Fiocchi Munizioni", ruolo: "Munizioni di piccolo calibro" },
        ],
      },
      {
        fase: "Sistemi e piattaforme",
        posizione: "CENTRO",
        descrizione: "I costruttori di piattaforme: elicotteri, velivoli, navi, veicoli blindati, missili, armi leggere.",
        aziende: [
          { nome: "Leonardo", ruolo: "Elicotteri, velivoli, elettronica per la difesa — ricavi 2024 ≈ €17,8 mld" },
          { nome: "Fincantieri", ruolo: "Navi militari (FREMM, PPA, sommergibili U212 NFS)" },
          { nome: "MBDA Italia", ruolo: "Missilistica (Aster, CAMM-ER, Teseo)" },
          { nome: "IDV — Iveco Defence Vehicles", ruolo: "Veicoli blindati e logistici" },
          { nome: "Beretta", ruolo: "Armi leggere, dal 1526" },
        ],
      },
      {
        fase: "Integrazione e prime contractor",
        posizione: "CENTRO",
        descrizione: "Capocommessa dei grandi programmi nazionali e internazionali; system-of-systems e C4ISR.",
        aziende: [
          { nome: "Leonardo", ruolo: "GCAP (con UK e Giappone), Eurofighter, NH90" },
          { nome: "Orizzonte Sistemi Navali", ruolo: "JV Fincantieri-Leonardo per i programmi navali" },
          { nome: "Telespazio", ruolo: "Comunicazioni satellitari governative (SICRAL)" },
        ],
      },
      {
        fase: "Servizi, MRO, addestramento ed export",
        posizione: "VALLE",
        descrizione: "Supporto logistico, manutenzione, simulazione e addestramento; l'export è regolato dalla L.185/90.",
        aziende: [
          { nome: "Leonardo — divisione training", ruolo: "International Flight Training School (con Aeronautica Militare)" },
          { nome: "Fincantieri Services", ruolo: "Supporto in servizio delle flotte" },
          { nome: "Elettronica — Cy4Gate", ruolo: "Cyber intelligence e cyber security" },
        ],
      },
    ],
    forza: [
      "Presenza in tutti i domini operativi e in tutti i grandi programmi europei (GCAP, Eurofighter, FREMM, MBDA)",
      "Leadership mondiale negli elicotteri (AW139) e nel navale militare di superficie",
      "Filiera dual use che alimenta anche spazio, avionica civile e cyber",
    ],
    criticita: [
      "Dipendenza estera per semiconduttori, ottiche e alcune materie prime critiche",
      "Scala ridotta rispetto ai prime USA; frammentazione della domanda europea",
      "Ricambio generazionale delle competenze specialistiche nelle PMI della filiera",
    ],
    fonti: ["AIAD", "Documento Programmatico Pluriennale Difesa", "SIPRI", "Relazione annuale export L.185/90"],
  },

  {
    id: "spazio",
    icona: "🛰️",
    nome: "Spazio e Space Economy",
    tagline: "Una delle poche filiere spaziali complete al mondo: dal lanciatore al dato satellitare interpretato.",
    kpi: [
      { label: "Fatturato spazio", value: "≈ €3 mld" },
      { label: "Addetti qualificati", value: "≈ 12.000" },
      { label: "Contributo ESA", value: "3° paese (≈ €3,1 mld/triennio)" },
      { label: "PNRR spazio", value: "€2,3 mld" },
    ],
    catena: [
      {
        fase: "Ricerca, agenzie e formazione",
        posizione: "MONTE",
        descrizione: "Programmazione pubblica, ricerca scientifica e pipeline di competenze.",
        aziende: [
          { nome: "ASI", ruolo: "Agenzia Spaziale Italiana — programmazione e missioni nazionali" },
          { nome: "CIRA", ruolo: "Ricerca aerospaziale, rientro atmosferico (Space Rider)" },
          { nome: "INAF / CNR", ruolo: "Astrofisica e scienze spaziali" },
          { nome: "PoliMi, PoliTo, Sapienza", ruolo: "Ingegneria aerospaziale, osservatorio Space Economy" },
        ],
      },
      {
        fase: "Lanciatori e propulsione",
        posizione: "MONTE",
        descrizione: "Accesso autonomo europeo allo spazio per carichi piccoli e medi.",
        aziende: [
          { nome: "Avio", ruolo: "Vega C e propulsione solida (Colleferro); motori P120C anche per Ariane 6" },
        ],
      },
      {
        fase: "Manifattura satellitare e infrastrutture orbitali",
        posizione: "CENTRO",
        descrizione: "Satelliti, moduli abitati, payload e piccole piattaforme.",
        aziende: [
          { nome: "Thales Alenia Space Italia", ruolo: "Satelliti e moduli abitati: oltre il 40% del volume pressurizzato della ISS è costruito a Torino" },
          { nome: "Leonardo", ruolo: "Sensori, ottiche, robotica spaziale, celle solari" },
          { nome: "Sitael", ruolo: "Piccoli satelliti e propulsione elettrica (Mola di Bari)" },
          { nome: "Argotec", ruolo: "Smallsat: missioni LICIACube e ArgoMoon (Torino)" },
          { nome: "OHB Italia", ruolo: "Sistemi e missioni scientifiche" },
        ],
      },
      {
        fase: "Lancio in orbita, operazioni e ground segment",
        posizione: "CENTRO",
        descrizione: "Controllo missione, logistica orbitale, stazioni di terra.",
        aziende: [
          { nome: "Telespazio", ruolo: "Centro spaziale del Fucino, tra i maggiori teleporti civili al mondo" },
          { nome: "D-Orbit", ruolo: "Logistica orbitale e space cargo (ION)" },
          { nome: "Leaf Space", ruolo: "Ground station as a service" },
        ],
      },
      {
        fase: "Dati, applicazioni e servizi",
        posizione: "VALLE",
        descrizione: "Osservazione della Terra, geoinformazione, telerilevamento e interpretazione delle immagini.",
        aziende: [
          { nome: "e-GEOS (Telespazio/ASI)", ruolo: "Dati COSMO-SkyMed, emergenze Copernicus" },
          { nome: "Planetek Italia", ruolo: "Geoinformazione e piattaforme EO (Bari)" },
          { nome: "Latitudo 40", ruolo: "Analytics satellitari per città e clima" },
          { nome: "Programma IRIDE", ruolo: "Costellazione nazionale EO finanziata dal PNRR" },
        ],
      },
    ],
    forza: [
      "Filiera completa monte-valle, rara a livello mondiale; leadership nel radar ad apertura sintetica (COSMO-SkyMed)",
      "Eccellenza nei moduli abitati e nelle infrastrutture orbitali (Torino hub mondiale)",
      "Telerilevamento e interpretazione immagini: asset strategico civile e di intelligence",
    ],
    criticita: [
      "Scala industriale e capitali privati limitati rispetto a USA e Francia",
      "Ritardi e costi del programma Vega; dipendenza temporanea da lanci esteri",
      "Downstream frammentato: molte startup, pochi campioni di scala",
    ],
    fonti: ["ASI", "ESA", "Osservatorio Space Economy PoliMi", "PNRR — Missione 1"],
  },

  {
    id: "energia",
    icona: "⚡",
    nome: "Energia e Transizione",
    tagline: "Hub mediterraneo del gas e leader tecnologico in cavi, turbomacchine ed elettrolizzatori, con una dipendenza strutturale dall'import.",
    kpi: [
      { label: "Dipendenza energetica", value: "≈ 74% import" },
      { label: "Rinnovabili", value: "> 40% mix elettrico" },
      { label: "Nuova capacità FER 2024", value: "+7,5 GW" },
      { label: "Campioni nazionali", value: "Eni, Enel, Snam, Terna" },
    ],
    catena: [
      {
        fase: "Approvvigionamento e upstream",
        posizione: "MONTE",
        descrizione: "Esplorazione e produzione, gas naturale liquefatto, diversificazione post-2022 dalle forniture russe.",
        aziende: [
          { nome: "Eni", ruolo: "E&P globale, GNL, bioraffinazione — ricavi ≈ €90 mld" },
          { nome: "Edison", ruolo: "Gas e generazione (gruppo EDF)" },
          { nome: "Snam FSRU", ruolo: "Rigassificatori di Piombino e Ravenna" },
        ],
      },
      {
        fase: "Generazione elettrica",
        posizione: "CENTRO",
        descrizione: "Parco termoelettrico a gas e crescita di solare, eolico e idroelettrico.",
        aziende: [
          { nome: "Enel", ruolo: "1° operatore; Enel Green Power per le rinnovabili" },
          { nome: "A2A / Iren / Hera", ruolo: "Multiutility territoriali" },
          { nome: "ERG", ruolo: "Pure player eolico e solare" },
          { nome: "Edison", ruolo: "Idroelettrico e gas" },
        ],
      },
      {
        fase: "Reti e infrastrutture",
        posizione: "CENTRO",
        descrizione: "Trasmissione, trasporto e distribuzione: monopoli naturali regolati, spina dorsale della transizione.",
        aziende: [
          { nome: "Terna", ruolo: "Rete di trasmissione; Tyrrhenian Link e interconnessioni" },
          { nome: "Snam", ruolo: "Rete gas, stoccaggi, corridoio idrogeno Nord Africa-Europa" },
          { nome: "Italgas", ruolo: "Distribuzione gas, reti digitali" },
        ],
      },
      {
        fase: "Tecnologie e supply chain della transizione",
        posizione: "CENTRO",
        descrizione: "La manifattura energetica: dove l'Italia esporta tecnologia in tutto il mondo.",
        aziende: [
          { nome: "Prysmian", ruolo: "1° produttore mondiale di cavi (interconnessioni HVDC)" },
          { nome: "Ansaldo Energia", ruolo: "Turbine a gas e Ansaldo Nucleare" },
          { nome: "Baker Hughes — Nuovo Pignone", ruolo: "Turbomacchine (Firenze)" },
          { nome: "Saipem", ruolo: "EPC offshore e ingegneria sottomarina" },
          { nome: "Industrie De Nora", ruolo: "Elettrodi ed elettrolizzatori per l'idrogeno" },
          { nome: "Enel 3Sun", ruolo: "Gigafactory fotovoltaica di Catania" },
        ],
      },
      {
        fase: "Vendita, servizi ed efficienza",
        posizione: "VALLE",
        descrizione: "Mercato retail liberalizzato, servizi energetici e demand response.",
        aziende: [
          { nome: "Enel Energia / Eni Plenitude", ruolo: "Retail elettricità, gas e mobilità elettrica" },
          { nome: "Acea / Hera / A2A", ruolo: "Vendita e servizi ambientali integrati" },
          { nome: "ESCo e aggregatori", ruolo: "Efficienza energetica, comunità energetiche (CER)" },
        ],
      },
    ],
    forza: [
      "Posizione di hub mediterraneo: rigassificatori, TAP, corridoi per l'idrogeno verde nordafricano",
      "Campioni tecnologici globali: Prysmian (cavi), Nuovo Pignone (turbomacchine), De Nora (idrogeno)",
      "Grandi utility con scala internazionale (Enel tra i primi operatori elettrici mondiali)",
    ],
    criticita: [
      "Prezzi elettrici tra i più alti d'Europa: svantaggio competitivo per l'industria energivora",
      "Dipendenza dall'import per il 74% del fabbisogno; assenza di generazione nucleare",
      "Permitting lento per rinnovabili e reti nonostante l'accelerazione recente",
    ],
    fonti: ["MASE", "Terna", "GSE", "ARERA", "Snam"],
  },

  {
    id: "meccanica",
    icona: "⚙️",
    nome: "Meccanica strumentale e Automazione",
    tagline: "La prima voce dell'export italiano: macchine che producono ciò che il mondo consuma, dal packaging farmaceutico agli impianti siderurgici.",
    kpi: [
      { label: "Export macchinari", value: "€89 mld (1ª voce)" },
      { label: "Macchine utensili", value: "4° esportatore mondiale" },
      { label: "Packaging", value: "≈ €9 mld, 80% export" },
      { label: "Modello", value: "Distretti + medie imprese" },
    ],
    catena: [
      {
        fase: "Metallurgia, fusioni e acciai speciali",
        posizione: "MONTE",
        descrizione: "La base materiale: acciai speciali, fusioni e forgiati dei distretti lombardi e veneti.",
        aziende: [
          { nome: "Lucchini RS", ruolo: "Acciai per ferroviario e meccanica (Lovere)" },
          { nome: "Acciaierie Venete", ruolo: "Acciai lunghi speciali" },
          { nome: "Distretto bresciano", ruolo: "Fonderie, stampaggio, minuteria" },
        ],
      },
      {
        fase: "Componentistica meccatronica",
        posizione: "MONTE",
        descrizione: "Riduttori, pneumatica, pompe, sensori: i \"campioni nascosti\" della subfornitura evoluta.",
        aziende: [
          { nome: "Bonfiglioli", ruolo: "Riduttori e motoriduttori (Bologna)" },
          { nome: "Interpump", ruolo: "1° mondiale pompe ad alta pressione" },
          { nome: "Camozzi", ruolo: "Automazione pneumatica (Brescia)" },
          { nome: "Carraro", ruolo: "Trasmissioni per off-highway" },
          { nome: "Gefran", ruolo: "Sensoristica e controllo di processo" },
        ],
      },
      {
        fase: "Macchine utensili e robotica",
        posizione: "CENTRO",
        descrizione: "Lavorazione di metallo, legno, vetro, lamiera e laser: il cuore del made in Italy industriale.",
        aziende: [
          { nome: "Biesse", ruolo: "Macchine per legno, vetro e pietra (Pesaro)" },
          { nome: "SCM Group", ruolo: "Tecnologie per il legno (Rimini)" },
          { nome: "Salvagnini", ruolo: "Sistemi per la lamiera" },
          { nome: "Prima Industrie", ruolo: "Macchine laser" },
          { nome: "Comau (Stellantis)", ruolo: "Robotica industriale (Torino)" },
        ],
      },
      {
        fase: "Macchine per il packaging e di settore",
        posizione: "CENTRO",
        descrizione: "La \"packaging valley\" emiliana: leadership mondiale nel confezionamento farmaceutico, alimentare e del beverage.",
        aziende: [
          { nome: "IMA", ruolo: "Packaging farmaceutico e food (Bologna)" },
          { nome: "Coesia", ruolo: "Gruppo di 21 aziende di automazione (Bologna)" },
          { nome: "Marchesini Group", ruolo: "Confezionamento farmaceutico e cosmetico" },
          { nome: "Sacmi", ruolo: "Macchine per ceramica, packaging e food (Imola)" },
        ],
      },
      {
        fase: "Impianti chiavi in mano e servizi",
        posizione: "VALLE",
        descrizione: "Ingegneria e realizzazione di impianti completi, service, retrofit digitale e manutenzione predittiva.",
        aziende: [
          { nome: "Danieli", ruolo: "Impianti siderurgici completi (Buttrio) — tra i 3 leader mondiali" },
          { nome: "MAIRE", ruolo: "Ingegneria impiantistica e chimica verde" },
          { nome: "Service e digitale 4.0", ruolo: "Teleassistenza, IoT industriale, ricambi — quota crescente dei ricavi" },
        ],
      },
    ],
    forza: [
      "Capacità di personalizzazione estrema: macchine \"su misura\" che i concorrenti tedeschi e giapponesi non replicano",
      "Distretti integrati (packaging valley bolognese, macchine legno pesarese) con know-how tacito difficilmente delocalizzabile",
      "Posizionamento premium con margini elevati e quota export strutturale ≈ 80%",
    ],
    criticita: [
      "Dimensione media d'impresa ridotta: vulnerabilità ad acquisizioni estere del know-how",
      "Ricambio generazionale di imprenditori e tecnici specializzati",
      "Dipendenza da componentistica elettronica e controlli numerici esteri (Siemens, Fanuc)",
    ],
    fonti: ["Federmacchine", "UCIMU", "Ucima", "ISTAT coe"],
  },

  {
    id: "automotive",
    icona: "🚗",
    nome: "Automotive e Motor Valley",
    tagline: "Volumi in crisi, eccellenza nel lusso: la componentistica e i marchi premium reggono una filiera in piena transizione elettrica.",
    kpi: [
      { label: "Produzione veicoli 2024", value: "≈ 475.000 (-37%)" },
      { label: "Filiera", value: "≈ 268.000 addetti" },
      { label: "Export componenti", value: "≈ €23 mld" },
      { label: "Ferrari", value: "> €90 mld di capitalizzazione" },
    ],
    catena: [
      {
        fase: "Design, ingegneria e materiali",
        posizione: "MONTE",
        descrizione: "Stile e ingegneria di veicolo: un'eccellenza che lavora per i costruttori di tutto il mondo.",
        aziende: [
          { nome: "Italdesign (Audi)", ruolo: "Ingegneria e stile (Moncalieri)" },
          { nome: "Pininfarina", ruolo: "Design (gruppo Mahindra)" },
          { nome: "Dallara", ruolo: "Compositi, aerodinamica, motorsport (Varano de' Melegari)" },
        ],
      },
      {
        fase: "Componentistica",
        posizione: "MONTE",
        descrizione: "≈ 2.200 imprese fornitrici: il segmento più solido della filiera, con saldo commerciale positivo.",
        aziende: [
          { nome: "Brembo", ruolo: "1° mondiale impianti frenanti ad alte prestazioni" },
          { nome: "Pirelli", ruolo: "Pneumatici premium" },
          { nome: "Marelli", ruolo: "Elettronica, illuminazione, propulsione" },
          { nome: "Eurogroup Laminations", ruolo: "Statori e rotori per motori elettrici" },
          { nome: "Sogefi", ruolo: "Filtrazione e sospensioni" },
        ],
      },
      {
        fase: "Costruttori (OEM)",
        posizione: "CENTRO",
        descrizione: "Grandi volumi in contrazione (Stellantis) e lusso ai massimi storici (Motor Valley emiliana).",
        aziende: [
          { nome: "Stellantis", ruolo: "Mirafiori, Cassino, Melfi, Pomigliano, Atessa" },
          { nome: "Ferrari", ruolo: "Maranello: margini e capitalizzazione record" },
          { nome: "Lamborghini (VW)", ruolo: "Sant'Agata Bolognese" },
          { nome: "Iveco Group", ruolo: "Veicoli industriali e bus" },
          { nome: "Piaggio", ruolo: "Due ruote (Pontedera)" },
        ],
      },
      {
        fase: "Distribuzione, aftermarket e mobilità",
        posizione: "VALLE",
        descrizione: "Reti di vendita, ricambi, noleggio a lungo termine e nuova mobilità.",
        aziende: [
          { nome: "Reti dealer e NLT", ruolo: "Consolidamento verso grandi gruppi (Autotorino, UnipolRental, Arval)" },
          { nome: "Aftermarket", ruolo: "Ricambi e officine: mercato ≈ €25 mld" },
        ],
      },
    ],
    forza: [
      "Motor Valley: concentrazione unica al mondo di marchi luxury/performance (Ferrari, Lamborghini, Maserati, Pagani, Ducati, Dallara)",
      "Componentisti globali con clienti diversificati (Brembo, Pirelli fornitori di tutti i premium mondiali)",
      "Competenze motorsport che alimentano il trasferimento tecnologico",
    ],
    criticita: [
      "Crollo dei volumi produttivi: dipendenza da un solo grande OEM (Stellantis) in ritirata",
      "Transizione elettrica: a rischio le imprese legate al powertrain termico (≈ 70.000 addetti esposti)",
      "Assenza di una gigafactory di celle operativa su scala",
    ],
    fonti: ["ANFIA", "ACEA", "MIMIT — tavolo automotive", "Osservatorio componentistica CCIAA Torino"],
  },

  {
    id: "farmaceutica",
    icona: "💊",
    nome: "Farmaceutica e Life Sciences",
    tagline: "Il settore export che cresce più veloce: hub produttivo europeo per farmaci, principi attivi, vaccini e packaging farmaceutico.",
    kpi: [
      { label: "Produzione", value: "≈ €52 mld (1°-2° UE)" },
      { label: "Export", value: "≈ €54 mld (2024)" },
      { label: "Addetti", value: "≈ 70.000 (60% laureati)" },
      { label: "R&S + investimenti", value: "≈ €4 mld/anno" },
    ],
    catena: [
      {
        fase: "Ricerca, biotech e clinica",
        posizione: "MONTE",
        descrizione: "IRCCS, poli biotech e ricerca traslazionale: il vivaio delle molecole.",
        aziende: [
          { nome: "IRCCS (San Raffaele, Humanitas, Gemelli)", ruolo: "Ricerca clinica e traslazionale" },
          { nome: "Dompé", ruolo: "Biotech proprietario (Oxervate)" },
          { nome: "Human Technopole", ruolo: "Ricerca genomica (Milano MIND)" },
        ],
      },
      {
        fase: "Principi attivi (API) e chimica fine",
        posizione: "MONTE",
        descrizione: "L'Italia è il 1° produttore europeo di principi attivi per conto terzi.",
        aziende: [
          { nome: "ACS Dobfar", ruolo: "Antibiotici e sterili" },
          { nome: "Olon", ruolo: "API e biotecnologie (gruppo P&R)" },
          { nome: "F.I.S.", ruolo: "Fabbrica Italiana Sintetici (Vicenza)" },
          { nome: "Flamma", ruolo: "Chimica fine per pharma" },
        ],
      },
      {
        fase: "Sviluppo e produzione farmaci",
        posizione: "CENTRO",
        descrizione: "Campioni nazionali a capitale familiare e grandi siti produttivi delle multinazionali.",
        aziende: [
          { nome: "Menarini", ruolo: "1° gruppo italiano (€4,7 mld, Firenze)" },
          { nome: "Chiesi", ruolo: "Respiratorio e malattie rare (Parma)" },
          { nome: "Recordati", ruolo: "Specialty e rare disease (quotata)" },
          { nome: "Angelini Pharma / Alfasigma / Zambon / Italfarmaco", ruolo: "Medi gruppi familiari internazionalizzati" },
          { nome: "Siti multinazionali", ruolo: "Novo Nordisk (Anagni), Eli Lilly (Sesto F.no), MSD, Pfizer (Ascoli), GSK Vaccines (Siena), BSP (Latina)" },
        ],
      },
      {
        fase: "Packaging farmaceutico e macchine",
        posizione: "CENTRO",
        descrizione: "Il vantaggio sistemico italiano: vetro, dispositivi e macchine di confezionamento nella stessa filiera.",
        aziende: [
          { nome: "Stevanato Group", ruolo: "Leader mondiale contenitori in vetro e drug delivery (Piombino Dese)" },
          { nome: "Bormioli Pharma", ruolo: "Vetro e plastica farmaceutica" },
          { nome: "IMA / Marchesini", ruolo: "Macchine di confezionamento (link meccanica)" },
        ],
      },
      {
        fase: "Distribuzione e sanità",
        posizione: "VALLE",
        descrizione: "Distribuzione intermedia, ≈ 20.000 farmacie e Servizio Sanitario Nazionale come primo acquirente.",
        aziende: [
          { nome: "Distribuzione intermedia", ruolo: "Comifar, Unico, Farla" },
          { nome: "Farmacie e SSN", ruolo: "Spesa farmaceutica pubblica ≈ €20 mld/anno" },
        ],
      },
    ],
    forza: [
      "Export quasi triplicato in dieci anni: qualità produttiva riconosciuta dalle big pharma globali (fill & finish, sterili, biologici)",
      "Filiera completa: API + produzione + vetro + macchine di confezionamento nello stesso sistema paese",
      "Polo vaccini di Siena (GSK) e nuovi mega-investimenti (Novo Nordisk ad Anagni)",
    ],
    criticita: [
      "Gran parte della produzione è conto terzi: la proprietà intellettuale resta all'estero",
      "Dipendenza da intermedi chimici asiatici per alcune molecole di base",
      "Prezzi regolati e payback: tensione tra spesa pubblica e attrattività degli investimenti",
    ],
    fonti: ["Farmindustria", "EFPIA", "AIFA", "Aschimfarma"],
  },

  {
    id: "agroalimentare",
    icona: "🍝",
    nome: "Agroalimentare",
    tagline: "Dal campo alla tavola: il soft power italiano che vale €69 mld di export e il primato mondiale delle denominazioni d'origine.",
    kpi: [
      { label: "Export agroalimentare", value: "€69 mld (record 2024)" },
      { label: "Industria alimentare", value: "≈ €193 mld fatturato" },
      { label: "DOP/IGP", value: "856 (1° in UE)" },
      { label: "Vino", value: "€8,1 mld export" },
    ],
    catena: [
      {
        fase: "Agricoltura e allevamento",
        posizione: "MONTE",
        descrizione: "≈ 700.000 aziende agricole; filiere del grano duro, pomodoro, latte, vigneto e zootecnia.",
        aziende: [
          { nome: "Cooperative agricole", ruolo: "Conserve Italia, Granlatte, Cantine Riunite-CIV" },
          { nome: "Grandi aziende agricole", ruolo: "Bonifiche Ferraresi (BF Spa), Genagricola" },
        ],
      },
      {
        fase: "Trasformazione industriale",
        posizione: "CENTRO",
        descrizione: "I marchi che portano il made in Italy alimentare nel mondo.",
        aziende: [
          { nome: "Ferrero", ruolo: "Dolciario: ≈ €18 mld di ricavi globali" },
          { nome: "Barilla", ruolo: "1° produttore mondiale di pasta" },
          { nome: "Lavazza", ruolo: "Caffè (Torino)" },
          { nome: "Cremonini / Inalca", ruolo: "Carni e distribuzione food service" },
          { nome: "Mutti", ruolo: "Pomodoro premium" },
          { nome: "Granarolo / Amadori / Rana", ruolo: "Lattiero-caseario, avicolo, pasta fresca" },
        ],
      },
      {
        fase: "Consorzi e certificazioni d'origine",
        posizione: "CENTRO",
        descrizione: "La \"DOP economy\": tutela, disciplinari e valore del territorio.",
        aziende: [
          { nome: "Parmigiano Reggiano / Grana Padano", ruolo: "I due formaggi DOP più esportati" },
          { nome: "Prosciutto di Parma", ruolo: "Consorzio dal 1963" },
          { nome: "Consorzi del vino", ruolo: "Prosecco, Chianti, Brunello, Barolo" },
        ],
      },
      {
        fase: "Tecnologie e packaging alimentare",
        posizione: "CENTRO",
        descrizione: "Il ponte con la meccanica: macchine e materiali per il food processing.",
        aziende: [
          { nome: "Sacmi / IMA", ruolo: "Macchine per il confezionamento alimentare" },
          { nome: "Goglio", ruolo: "Packaging flessibile per caffè e food" },
        ],
      },
      {
        fase: "Distribuzione, ristorazione ed export",
        posizione: "VALLE",
        descrizione: "GDO nazionale, Horeca e canali export: USA e Germania primi mercati.",
        aziende: [
          { nome: "Conad / Coop / Esselunga", ruolo: "GDO a insegna italiana" },
          { nome: "Eataly", ruolo: "Retail esperienziale del made in Italy" },
          { nome: "Autogrill (Avolta)", ruolo: "Ristorazione in concessione" },
        ],
      },
    ],
    forza: [
      "Premium price riconosciuto a livello globale: il consumatore paga il marchio Italia",
      "856 DOP/IGP: barriera all'imitazione fondata sul legame col territorio",
      "Resilienza: export cresciuto ogni anno anche durante crisi e pandemia",
    ],
    criticita: [
      "Italian sounding: il falso made in Italy vale ≈ €90 mld, più dell'export autentico",
      "Frammentazione agricola a monte: potere negoziale debole verso GDO e trasformazione",
      "Esposizione a clima, fitopatie e dazi (USA primo mercato extra-UE)",
    ],
    fonti: ["ISMEA", "Federalimentare", "Fondazione Qualivita", "ISTAT"],
  },

  {
    id: "moda",
    icona: "👔",
    nome: "Moda, Lusso e Design",
    tagline: "L'unica filiera del lusso completa al mondo: metà della produzione globale di alta gamma nasce in laboratori e distretti italiani.",
    kpi: [
      { label: "Sistema moda", value: "≈ €96 mld fatturato" },
      { label: "Export moda e accessori", value: "≈ €62 mld" },
      { label: "Occhialeria", value: "≈ 70% dell'alta gamma mondiale" },
      { label: "Legno-arredo", value: "≈ €52 mld, export €19 mld" },
    ],
    catena: [
      {
        fase: "Filati, tessuti e concia",
        posizione: "MONTE",
        descrizione: "I distretti delle materie prime nobili: lana a Biella, seta a Como, pelle in Toscana e Veneto.",
        aziende: [
          { nome: "Distretto laniero di Biella", ruolo: "Zegna, Loro Piana (LVMH), Reda, Vitale Barberis Canonico" },
          { nome: "Seta di Como", ruolo: "Ratti, Mantero" },
          { nome: "Concia", ruolo: "Santa Croce sull'Arno, Arzignano: 60% della pelle UE" },
          { nome: "Manteco", ruolo: "Lana riciclata (Prato), capitale del tessile circolare" },
        ],
      },
      {
        fase: "Manifattura e façonisti",
        posizione: "CENTRO",
        descrizione: "Migliaia di laboratori specializzati che producono per i brand italiani e per le maison estere.",
        aziende: [
          { nome: "Pelletteria toscana", ruolo: "Produzione borse per LVMH, Kering, Chanel" },
          { nome: "Calzature", ruolo: "Riviera del Brenta (lusso donna), Marche" },
          { nome: "Maglieria e confezione", ruolo: "Distretti di Carpi e Perugia" },
        ],
      },
      {
        fase: "Brand e maison",
        posizione: "CENTRO",
        descrizione: "I marchi italiani indipendenti e i gruppi esteri con radici produttive in Italia.",
        aziende: [
          { nome: "Prada Group", ruolo: "≈ €5,4 mld; acquisizione Versace 2025" },
          { nome: "Giorgio Armani", ruolo: "Il più grande gruppo indipendente" },
          { nome: "Moncler / Zegna / Cucinelli / Ferragamo / Max Mara / OTB", ruolo: "Campioni quotati e familiari" },
          { nome: "Gucci, Bottega Veneta, Fendi, Bulgari", ruolo: "Marchi italiani in gruppi francesi (Kering, LVMH)" },
        ],
      },
      {
        fase: "Occhialeria e accessori",
        posizione: "CENTRO",
        descrizione: "Il distretto di Belluno: capitale mondiale dell'eyewear.",
        aziende: [
          { nome: "EssilorLuxottica", ruolo: "1° gruppo mondiale (Ray-Ban, Oakley + licenze lusso)" },
          { nome: "Safilo / Marcolin / De Rigo", ruolo: "Produttori e licenziatari globali" },
          { nome: "Thélios (LVMH)", ruolo: "Eyewear delle maison LVMH, prodotto a Longarone" },
        ],
      },
      {
        fase: "Retail, e-commerce e circolarità",
        posizione: "VALLE",
        descrizione: "Distribuzione diretta, outlet, digitale e second hand in crescita.",
        aziende: [
          { nome: "Retail diretto e outlet", ruolo: "Serravalle, The Mall; flagship nelle capitali" },
          { nome: "E-commerce e resale", ruolo: "Piattaforme digitali, certificazioni di sostenibilità e tracciabilità" },
        ],
      },
    ],
    forza: [
      "Filiera completa e prossimità: dalla materia prima al prodotto finito in poche centinaia di km",
      "Saper fare artigianale non replicabile: le maison francesi producono in Italia l'alta pelletteria",
      "Design e brand equity: Milano capitale mondiale di moda e design (Salone del Mobile)",
    ],
    criticita: [
      "Proprietà estera crescente dei marchi: il valore aggiunto del brand migra fuori dall'Italia",
      "Ricambio generazionale degli artigiani; controlli di filiera (caporalato nella subfornitura)",
      "Domanda cinese debole e polarizzazione: soffre la fascia media",
    ],
    fonti: ["Confindustria Moda", "Altagamma", "ANFAO", "FederlegnoArredo"],
  },

  {
    id: "elettronica",
    icona: "🔬",
    nome: "Semiconduttori ed Elettronica",
    tagline: "Dalla \"Etna Valley\" del carburo di silicio alle probe card brianzole: presìdi di eccellenza in una filiera globalmente contesa.",
    kpi: [
      { label: "STMicroelectronics", value: "≈ $13 mld ricavi globali" },
      { label: "Campus SiC Catania", value: "€5 mld investimento" },
      { label: "Technoprobe", value: "Leader mondiale probe card" },
      { label: "Leva", value: "EU Chips Act" },
    ],
    catena: [
      {
        fase: "Materiali e wafer",
        posizione: "MONTE",
        descrizione: "Silicio, epitassia e materiali avanzati: pochi attori, altamente strategici.",
        aziende: [
          { nome: "MEMC (GlobalWafers)", ruolo: "Wafer di silicio (Novara e Merano)" },
          { nome: "LPE (ASM)", ruolo: "Reattori epitassiali per SiC (Baranzate)" },
          { nome: "SAES Getters", ruolo: "Materiali avanzati e getter (Lainate)" },
        ],
      },
      {
        fase: "Progettazione e fabbricazione chip",
        posizione: "CENTRO",
        descrizione: "Power electronics, sensori MEMS e carburo di silicio: le specialità italiane.",
        aziende: [
          { nome: "STMicroelectronics", ruolo: "Agrate Brianza e Catania: power, MEMS, SiC per auto elettriche" },
          { nome: "LFoundry", ruolo: "Fonderia analogica (Avezzano)" },
          { nome: "Vishay Semiconductor Italiana", ruolo: "Semiconduttori di potenza (Torino)" },
        ],
      },
      {
        fase: "Test, packaging e attrezzature",
        posizione: "CENTRO",
        descrizione: "Il segmento dove l'Italia è leader mondiale nascosto.",
        aziende: [
          { nome: "Technoprobe", ruolo: "1° mondiale nelle probe card per il test dei chip (Cernusco Lombardone)" },
          { nome: "SPEA", ruolo: "Sistemi automatici di test (Volpiano)" },
        ],
      },
      {
        fase: "Sistemi embedded ed elettronica applicata",
        posizione: "VALLE",
        descrizione: "Edge computing, identificazione automatica, elettronica professionale.",
        aziende: [
          { nome: "SECO", ruolo: "Edge computing e IoT (Arezzo)" },
          { nome: "Datalogic", ruolo: "Scanner e visione industriale (Bologna)" },
          { nome: "Eurotech", ruolo: "Computer embedded (Amaro)" },
          { nome: "Leonardo", ruolo: "Elettronica per difesa e spazio (link difesa)" },
        ],
      },
    ],
    forza: [
      "Leadership nel power e nel carburo di silicio: tecnologie chiave per auto elettrica e industria",
      "Catania \"Etna Valley\": primo impianto europeo integrato per wafer SiC da 200 mm",
      "Nicchie a leadership mondiale assoluta (Technoprobe nelle probe card)",
    ],
    criticita: [
      "Nessuna fab logica avanzata: dipendenza totale da Taiwan/Corea per i nodi di punta",
      "Scala degli investimenti fuori portata senza sostegno europeo (Chips Act)",
      "Fuga dei talenti STEM verso hub esteri meglio remunerati",
    ],
    fonti: ["MIMIT", "Commissione UE — Chips Act", "Bilanci societari (STM, Technoprobe)"],
  },

  {
    id: "nautica",
    icona: "🛥️",
    nome: "Cantieristica e Nautica",
    tagline: "Metà degli ordini mondiali di superyacht e la leadership nelle navi da crociera: il mare come piattaforma industriale.",
    kpi: [
      { label: "Fincantieri", value: "€8,1 mld ricavi 2024" },
      { label: "Nautica da diporto", value: "≈ €8,6 mld (record)" },
      { label: "Superyacht", value: "≈ 50% ordini mondiali" },
      { label: "Addetti diporto", value: "≈ 30.000 diretti" },
    ],
    catena: [
      {
        fase: "Design e progettazione navale",
        posizione: "MONTE",
        descrizione: "Studi di design e ingegneria che definiscono l'estetica mondiale dello yachting.",
        aziende: [
          { nome: "Officina Italiana Design", ruolo: "Design di Riva" },
          { nome: "Zuccon International Project", ruolo: "Superyacht design" },
          { nome: "Nuvolari Lenard", ruolo: "Design navale (Venezia)" },
        ],
      },
      {
        fase: "Costruzione navale (shipbuilding)",
        posizione: "CENTRO",
        descrizione: "Navi da crociera, militari e traghetti: cantieri di scala mondiale.",
        aziende: [
          { nome: "Fincantieri", ruolo: "Leader mondiale crociere (Monfalcone, Marghera, Sestri); militare e offshore" },
          { nome: "T. Mariotti", ruolo: "Navi speciali e refit (Genova)" },
        ],
      },
      {
        fase: "Nautica da diporto e superyacht",
        posizione: "CENTRO",
        descrizione: "I costruttori che dominano il Global Order Book mondiale.",
        aziende: [
          { nome: "Azimut|Benetti", ruolo: "1° gruppo mondiale per metri costruiti" },
          { nome: "Ferretti Group", ruolo: "Riva, Pershing, CRN, Wally" },
          { nome: "Sanlorenzo", ruolo: "Yacht su misura, quotata" },
          { nome: "The Italian Sea Group", ruolo: "Admiral, Tecnomar, Perini Navi" },
        ],
      },
      {
        fase: "Componentistica e allestimento",
        posizione: "CENTRO",
        descrizione: "Accessori, arredo nautico e sistemi di bordo: l'indotto dei distretti.",
        aziende: [
          { nome: "Quick Group", ruolo: "Ancoraggio, thruster, illuminazione (Ravenna)" },
          { nome: "Besenzoni", ruolo: "Passerelle e accessori" },
          { nome: "Arredo navale", ruolo: "Distretto brianzolo e pisano per interni yacht e crociere" },
        ],
      },
      {
        fase: "Marina, refit e servizi",
        posizione: "VALLE",
        descrizione: "Porti turistici, refit di superyacht, charter e brokeraggio: la coda lunga del valore.",
        aziende: [
          { nome: "Amico & Co", ruolo: "Refit superyacht (Genova), riferimento mondiale" },
          { nome: "Lusben (Azimut|Benetti)", ruolo: "Refit (Livorno/Viareggio)" },
          { nome: "Marina di Porto Cervo / Portofino", ruolo: "Infrastrutture turistico-nautiche premium" },
        ],
      },
    ],
    forza: [
      "Leadership mondiale assoluta nei superyacht e duopolio nelle crociere (con Meyer Werft)",
      "Integrazione civile-militare di Fincantieri: economie di scala e di scopo",
      "Distretti (Viareggio, La Spezia, Ancona, Ravenna) con indotto artigianale unico",
    ],
    criticita: [
      "Ciclicità della domanda di lusso ed esposizione geopolitica (sanzioni, clientela globale)",
      "Colli di bottiglia nella subfornitura e nei bacini di refit",
      "Concorrenza asiatica in crescita nelle costruzioni commerciali",
    ],
    fonti: ["Confindustria Nautica / Deloitte", "Global Order Book — BOAT International", "Fincantieri — bilancio 2024"],
  },
];

/* Palette categorica di riferimento (validata) — slot per settore */
const SECTOR_SLOTS = {
  difesa: 1, spazio: 5, energia: 3, meccanica: 2, automotive: 6,
  farmaceutica: 7, agroalimentare: 4, moda: 8, elettronica: 1, nautica: 2,
};

const FONTI_GENERALI = [
  { nome: "ISTAT", url: "https://www.istat.it", ambito: "Conti nazionali, commercio estero (coe.istat.it), occupazione" },
  { nome: "Banca d'Italia", url: "https://www.bancaditalia.it", ambito: "Finanza pubblica, bilancia dei pagamenti, relazione annuale" },
  { nome: "Eurostat", url: "https://ec.europa.eu/eurostat", ambito: "Confronti europei, valore aggiunto manifatturiero" },
  { nome: "MEF / DEF", url: "https://www.mef.gov.it", ambito: "Quadro di finanza pubblica" },
  { nome: "ICE — Agenzia", url: "https://www.ice.it", ambito: "Rapporto export, quote di mercato" },
  { nome: "Fondazione Edison", url: "https://www.fondazioneedison.it", ambito: "Surplus manifatturiero, primati export" },
  { nome: "Associazioni di categoria", url: "", ambito: "AIAD, ASI, Farmindustria, ANFIA, Federmacchine, Ucima, Confindustria Moda, Confindustria Nautica, ISMEA, Altagamma" },
];
