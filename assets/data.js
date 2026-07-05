/* ============================================================
   Progetto Italia — Dataset analitico
   Valori indicativi riferiti al 2025 (consuntivi e stime),
   salvo diversa indicazione. Fonti primarie: ISTAT, Banca
   d'Italia, Eurostat, MEF, associazioni di categoria citate
   in ogni scheda. Importi in miliardi di euro (mld €).
   Ultimo aggiornamento dati: luglio 2026 (consuntivi ISTAT
   2025 pubblicati a febbraio-marzo 2026).
   ============================================================ */

const MACRO = {
  anno: 2025,
  kpi: [
    { label: "PIL nominale", value: "€2.258 mld", delta: "+0,5% reale nel 2025", trend: "up" },
    { label: "Export di beni", value: "≈ €644 mld", delta: "+3,3% nonostante i dazi USA", trend: "up" },
    { label: "Saldo commerciale", value: "+€50,7 mld", delta: "deficit energetico in calo", trend: "up" },
    { label: "Occupati", value: "24,3 mln", delta: "disoccupazione 6,1%: minimo dal 2007", trend: "up" },
    { label: "Debito pubblico", value: "≈ 136% PIL", delta: "≈ €3.100 mld", trend: "warn" },
    { label: "Inflazione (IPCA)", value: "+1,6%", delta: "dal +1,1% del 2024", trend: "flat" },
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
  // Nota: 2024 e 2025 secondo la revisione ISTAT di febbraio 2026.
  bilancia: [
    { anno: 2019, exp: 476, imp: 423 },
    { anno: 2020, exp: 436, imp: 373 },
    { anno: 2021, exp: 516, imp: 476 },
    { anno: 2022, exp: 625, imp: 659 },
    { anno: 2023, exp: 626, imp: 592 },
    { anno: 2024, exp: 623, imp: 575 },
    { anno: 2025, exp: 644, imp: 593 },
  ],
  bilanciaNota:
    "Il rosso del 2022 è interamente energetico: lo shock dei prezzi di gas e petrolio ha gonfiato l'import di oltre €110 mld. Nel 2025 l'export è tornato a crescere (+3,3%) nonostante i dazi USA, con un surplus di €50,7 mld e un deficit energetico in calo. Al netto dell'energia, la manifattura italiana genera stabilmente uno dei maggiori surplus commerciali al mondo, trainato da meccanica, farmaceutica, moda e agroalimentare.",

  // Prime voci dell'export di beni, mld € (classificazione ATECO, valori indicativi 2025)
  topExport: [
    { label: "Macchinari e apparecchi", value: 89, nota: "1ª voce: meccanica strumentale, packaging, macchine utensili" },
    { label: "Farmaceutica", value: 69, nota: "+28,5% nel 2025: 2ª voce, +248% in dieci anni" },
    { label: "Alimentari, bevande e tabacco", value: 62, nota: "+4,3% nel 2025; vino ≈ €8 mld" },
    { label: "Moda e accessori (tessile, abbigliamento, pelle)", value: 60, nota: "Include l'occhialeria e la pelletteria delle grandi maison" },
    { label: "Metalli e prodotti in metallo", value: 58, nota: "+9,8% nel 2025: acciai speciali, rubinetteria, forgiati" },
    { label: "Mezzi di trasporto", value: 57, nota: "Aerospazio e navale +11,6%; automotive in calo" },
    { label: "Chimica, gomma e plastica", value: 52, nota: "Chimica fine e specialità" },
    { label: "Elettronica ed elettrotecnica", value: 35, nota: "Cavi, apparecchiature elettriche, semiconduttori" },
    { label: "Mobili e arredo", value: 20, nota: "Design: 1° esportatore UE di mobili" },
  ],

  // Quote dei principali mercati di sbocco (% export beni, 2025, valori indicativi)
  partner: [
    { label: "Germania", value: 11.3 },
    { label: "Stati Uniti", value: 11.1 },
    { label: "Francia", value: 10.0 },
    { label: "Spagna", value: 5.5 },
    { label: "Svizzera", value: 4.7 },
    { label: "Regno Unito", value: 4.3 },
    { label: "Polonia", value: 3.2 },
    { label: "Cina", value: 2.4 },
  ],

  // Dove l'Italia si differenzia
  differenziazione: [
    { icona: "🏭", titolo: "2ª manifattura d'Europa", testo: "Dietro solo alla Germania per valore aggiunto manifatturiero; tra i cinque paesi al mondo con surplus manifatturiero superiore a $100 mld (Fondazione Edison su dati WTO)." },
    { icona: "📦", titolo: "Leader mondiale del packaging", testo: "La \"packaging valley\" emiliana (IMA, Coesia, Marchesini, Sacmi) domina le macchine per il confezionamento farmaceutico e alimentare: ~80% della produzione esportata." },
    { icona: "💊", titolo: "Hub farmaceutico d'Europa", testo: "1°-2° produttore UE di farmaci e 1° per principi attivi; 2° esportatore mondiale di farmaci confezionati. Export a €69 mld nel 2025 (+248% in dieci anni)." },
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
      { label: "Spesa per la difesa", value: "≈ 2% PIL (criteri NATO, 2025)" },
      { label: "Export autorizzato", value: "≈ €6 mld/anno" },
    ],
    approvvigionamento: {
      intro: "Nessuna piattaforma d'arma nasce senza una catena di approvvigionamento globale alle spalle. La filiera dipende da materie prime critiche in larga parte extra-europee: dai controlli cinesi del 2025 sull'export di terre rare e magneti (licenze da aprile; uso militare negato per policy da dicembre) il tema è passato da industriale a pienamente strategico. L'UE risponde con il Critical Raw Materials Act e con RESourceEU (acquisti congiunti e stoccaggi); l'Italia con il Fondo nazionale made in Italy e il golden power.",
      materiali: [
        { materiale: "Terre rare e magneti (NdFeB, SmCo)", impiego: "Attuatori di missili e munizioni guidate, radar, sonar, motori elettrici, guerra elettronica", fornitura: "Cina: ~90% della raffinazione mondiale e ~98% dei magneti importati in UE. Licenze export da apr 2025; domande per uso militare respinte per policy da dic 2025", rischio: "critico" },
        { materiale: "Gallio, germanio, antimonio", impiego: "Radar AESA (GaN), ottiche e visori a infrarossi, semiconduttori RF, primer di munizioni", fornitura: "Cina dominante (gallio ~98%); bandi e licenze dal 2023-24. Recupero UE solo marginale (riciclo, sottoprodotto dello zinco per il germanio)", rischio: "critico" },
        { materiale: "Titanio aeronautico", impiego: "Cellule, carrelli d'atterraggio, parti motore, scafi speciali", fornitura: "Fino al 2022 la Russia (VSMPO) era il primo fornitore; riorientamento su USA, Giappone e Kazakistan. In UE non si produce spugna di titanio", rischio: "alto" },
        { materiale: "Superleghe di nichel e cobalto", impiego: "Palette e dischi delle turbine (Avio Aero), propulsione navale", fornitura: "Nichel da Indonesia e Russia; cobalto da RD Congo con raffinazione cinese. Fonderie di precisione europee limitate", rischio: "alto" },
        { materiale: "Energetici e propellenti (nitrocellulosa, RDX, perclorato d'ammonio)", impiego: "Munizionamento, testate, motori a razzo e lanciatori", fornitura: "Linter di cotone in gran parte cinese; capacità europea in espansione post-2022 (piano ASAP). Perclorato: Avio tra i pochi produttori UE", rischio: "alto" },
        { materiale: "Tungsteno", impiego: "Penetratori, contrappesi, utensili per lavorazioni meccaniche", fornitura: "Cina ~80% dell'estrazione mondiale; riaperture minerarie in corso in Portogallo e Spagna", rischio: "alto" },
        { materiale: "Semiconduttori rad-hard e MMIC", impiego: "Guida di missili, satelliti militari, C4ISR, spolette intelligenti", fornitura: "Logica avanzata da Taiwan/USA; l'Europa presidia potenza e RF (ST, Infineon, UMS) ma con poche fonderie GaN", rischio: "alto" },
        { materiale: "Acciai speciali, blindati e alluminio", impiego: "Scafi navali, blindature, strutture e affusti", fornitura: "Capacità siderurgica UE e italiana presente (acciai speciali lombardi, piastre nordeuropee); il fattore critico è il costo dell'energia", rischio: "medio" },
        { materiale: "Compositi in fibra di carbonio", impiego: "Velivoli, UAV, missili, coperture radar-assorbenti", fornitura: "Precursore PAN da Giappone e USA; trasformazione e laminazione in Italia (Leonardo a Foggia e Grottaglie)", rischio: "medio" },
      ],
      fattori: [
        { nome: "Energia", nota: "Siderurgia, chimica degli energetici e cantieristica sono energivore: i prezzi elettrici italiani, tra i più alti d'Europa, pesano su tutta la subfornitura." },
        { nome: "Capitale umano", nota: "Ingegneri sistemisti, tecnici RF, saldatori navali certificati: collo di bottiglia demografico, presidiato con accademie aziendali (Fincantieri, Leonardo)." },
        { nome: "Capitale paziente", nota: "Programmi pluridecennali richiedono finanza dedicata: CDP, fondi europei EDF e SAFE, e regole bancarie/ESG in evoluzione sul settore." },
        { nome: "Certificazioni e golden power", nota: "Qualifiche militari dei materiali (AQAP/MIL-STD) e screening degli investimenti esteri: barriera all'ingresso e insieme protezione del know-how." },
      ],
    },
    catena: [
      {
        fase: "R&S e materiali avanzati",
        posizione: "MONTE",
        descrizione: "Ricerca su materiali, propulsione e tecnologie dual use; centri pubblici e laboratori industriali.",
        input: ["Capitale umano STEM", "Supercalcolo (HPC davinci-1)", "Finanziamenti EDF / PNRR", "Materiali sperimentali e banchi prova"],
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
        input: ["Semiconduttori GaN / MMIC", "Terre rare per magneti", "Germanio e ottiche IR", "Energetici (nitrocellulosa, RDX)", "Meccanica di precisione"],
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
        input: ["Acciai blindati e navali", "Titanio e alluminio aeronautico", "Superleghe per turbine", "Compositi in fibra di carbonio", "Sottosistemi qualificati"],
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
        input: ["Software e crittografia", "Capacità satellitari (SICRAL)", "Systems engineering", "Banchi di integrazione e poligoni"],
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
        input: ["Ricambi qualificati", "Logistica protetta", "Simulatori e sistemi di addestramento", "Personale certificato"],
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
    fonti: ["AIAD", "Documento Programmatico Pluriennale Difesa", "SIPRI", "Relazione annuale export L.185/90", "EPRS / CSIS — controlli export terre rare", "Commissione UE — CRMA e RESourceEU"],
  },

  {
    id: "spazio-osservazione-terra",
    icona: "🛰️",
    nome: "Spazio e Osservazione della Terra",
    tagline: "Una delle poche filiere spaziali complete al mondo — dal lanciatore al dato interpretato — con una leadership specifica nell'Osservazione della Terra: radar SAR, iperspettrale e la nuova costellazione nazionale IRIDE.",
    kpi: [
      { label: "Fatturato spazio", value: "≈ €3,1 mld" },
      { label: "Addetti qualificati", value: "≈ 12.000" },
      { label: "Contributo ESA", value: "3° paese (≈ €3,1 mld/triennio)" },
      { label: "Programma IRIDE", value: "€1,1 mld (PNRR)" },
    ],
    approvvigionamento: {
      intro: "Nello spazio il collo di bottiglia non è il volume ma la qualifica: ogni componente deve superare anni di certificazione al volo (radiazioni, termovuoto, vibrazioni) e spesso esiste un solo fornitore al mondo. La filiera italiana dipende dall'estero per elettronica rad-hard, germanio e gas nobili, ma presidia in casa alcuni punti rari: le celle solari di CESI, il perclorato d'ammonio di Avio, l'ottica di precisione. I controlli export — cinesi sulle materie prime, americani (ITAR/EAR) sui componenti — sono un fattore produttivo a tutti gli effetti.",
      materiali: [
        { materiale: "Elettronica rad-hard e FPGA spaziali", impiego: "Computer di bordo, elaborazione payload, guida dei lanciatori", fornitura: "FPGA qualificati dominati da fornitori USA sotto ITAR/EAR; l'Europa presidia con ST (rad-hard), Teledyne e2v e Microchip (Francia). Qualifiche ESCC lunghe anni", rischio: "critico" },
        { materiale: "Germanio (substrati per celle solari)", impiego: "Celle fotovoltaiche multigiunzione dei pannelli satellitari", fornitura: "Cina primo produttore mondiale, sotto licenza dal 2023-24; raffinazione UE quasi solo Umicore (Belgio). CESI a valle dipende dai substrati importati", rischio: "critico" },
        { materiale: "Terre rare e magneti (SmCo, NdFeB)", impiego: "Ruote di reazione, attuatori, tubi a onda progressiva (TWT), sensori", fornitura: "Controlli export cinesi 2025 con diniego per usi militari: colpiscono direttamente i satelliti dual-use come COSMO-SkyMed", rischio: "critico" },
        { materiale: "Xenon e kripton", impiego: "Propulsione elettrica dei satelliti (Sitael) e station keeping", fornitura: "Sottoprodotto della separazione dell'aria; l'Ucraina era fornitore chiave fino al 2022, prezzi ancora volatili; capacità di recupero in costruzione", rischio: "alto" },
        { materiale: "Idrazina e propellenti liquidi", impiego: "Propulsione satellitare e stadio AVUM di Vega", fornitura: "Pochi fornitori qualificati; il regolamento REACH ne restringe l'uso in UE e spinge la transizione ai green propellant", rischio: "alto" },
        { materiale: "Propellenti solidi (perclorato d'ammonio, HTPB, polvere di Al)", impiego: "Motori P120C, Zefiro e boosters", fornitura: "Perclorato: Avio tra i pochissimi produttori europei (asset strategico italiano); leganti HTPB da fornitori contati", rischio: "medio" },
        { materiale: "Ottiche, vetri speciali e carburo di silicio", impiego: "Telescopi per osservazione della Terra, specchi e banchi ottici (PRISMA)", fornitura: "Vetri Zerodur da Schott (Germania), SiC da Mersen Boostec (Francia); lavorazione e ottica di precisione in Italia (Leonardo, Media Lario)", rischio: "medio" },
        { materiale: "Compositi e materiali strutturali", impiego: "Casing dei lanciatori (filament winding), strutture e pannelli satellitari", fornitura: "Precursore PAN da Giappone/USA; avvolgimento e integrazione ad Avio (Colleferro) e nelle facility di Thales Alenia Space", rischio: "medio" },
      ],
      fattori: [
        { nome: "Capitale umano AIT e GNC", nota: "Ingegneri di assemblaggio-integrazione-test e di guida-navigazione: pochi, formati sui programmi, contesi anche dalle big tech. La pipeline universitaria è il vero asset." },
        { nome: "Infrastrutture di qualifica", nota: "Camere termovuoto, tavole vibranti, camere anecoiche: CIRA e i laboratori di Thales/Leonardo in Italia; l'accesso ai centri ESA (ESTEC) resta strategico." },
        { nome: "Domanda pubblica àncora", nota: "ASI, ESA, PNRR/IRIDE e Difesa finanziano la filiera: il mercato istituzionale è il volano, il venture capital spaziale italiano è ancora sottile." },
        { nome: "Regole e conformità", nota: "ITAR/EAR sui componenti USA, coordinamento delle frequenze ITU, policy dei dati EO: la compliance normativa è un fattore produttivo, non un dettaglio legale." },
      ],
    },
    focus: {
      titolo: "Perché l'Osservazione della Terra è strategica",
      testo: "Il telerilevamento e l'interpretazione delle immagini satellitari sono un asset dual-use: alimentano difesa e intelligence, monitoraggio ambientale e del territorio, agricoltura di precisione, gestione delle emergenze e sorveglianza marittima. L'Italia presidia l'intera catena — costruisce i satelliti radar e iperspettrali, li opera dal Fucino, distribuisce e interpreta i dati — un caso raro di autonomia end-to-end in Europa.",
      metriche: [
        { k: "COSMO-SkyMed", v: "Costellazione SAR dual-use (ASI + Difesa)" },
        { k: "PRISMA", v: "Satellite iperspettrale, tra i primi al mondo" },
        { k: "IRIDE", v: "≈ 60 satelliti LEO entro il 2026" },
        { k: "Copernicus", v: "Sentinel-1 SAR costruito in Italia" },
      ],
    },
    catena: [
      {
        fase: "Ricerca, agenzie e formazione",
        posizione: "MONTE",
        descrizione: "Programmazione pubblica, ricerca scientifica e pipeline di competenze; l'ASI è agenzia di riferimento e cliente-guida delle missioni EO nazionali.",
        input: ["Capitale umano STEM", "Fondi ASI / ESA / PNRR", "Laboratori e simulazione", "Cooperazione internazionale"],
        aziende: [
          { nome: "ASI", ruolo: "Agenzia Spaziale Italiana — programmazione, COSMO-SkyMed, PRISMA, IRIDE" },
          { nome: "CIRA", ruolo: "Ricerca aerospaziale, rientro atmosferico (Space Rider)" },
          { nome: "INAF / CNR-IREA", ruolo: "Astrofisica e ricerca sul telerilevamento e l'interferometria SAR" },
          { nome: "PoliMi, PoliTo, Sapienza, Tor Vergata", ruolo: "Ingegneria aerospaziale, geomatica, osservatorio Space Economy" },
        ],
      },
      {
        fase: "Lanciatori e accesso allo spazio",
        posizione: "MONTE",
        descrizione: "Accesso autonomo europeo allo spazio per carichi piccoli e medi: fondamentale per mettere in orbita costellazioni EO nazionali.",
        input: ["Propellenti solidi (perclorato, HTPB)", "Compositi filament winding", "Avionica di lancio", "Spazioporto (Kourou)", "Idrazina (AVUM)"],
        aziende: [
          { nome: "Avio", ruolo: "Vega C e propulsione solida (Colleferro); motori P120C anche per Ariane 6" },
          { nome: "Sitael", ruolo: "Propulsione elettrica per il mantenimento in orbita dei satelliti (Mola di Bari)" },
        ],
      },
      {
        fase: "Satelliti EO e payload (upstream)",
        posizione: "CENTRO",
        descrizione: "Il cuore dell'Osservazione della Terra: piattaforme e sensori radar (SAR), ottici e iperspettrali. Qui l'Italia è tra i leader mondiali del radar spaziale.",
        input: ["Elettronica rad-hard e FPGA", "Celle solari su germanio (CESI)", "Ottiche e vetri speciali", "Magneti e ruote di reazione", "Camere termovuoto (AIT)"],
        aziende: [
          { nome: "Thales Alenia Space Italia", ruolo: "Prime di COSMO-SkyMed e del SAR di Sentinel-1 (Copernicus); moduli abitati ISS a Torino" },
          { nome: "Leonardo", ruolo: "Strumento iperspettrale di PRISMA, ottiche, star tracker, sensori atmosferici, celle solari" },
          { nome: "OHB Italia", ruolo: "Prime della piattaforma PRISMA e di missioni scientifiche" },
          { nome: "Argotec", ruolo: "Smallsat e microsatelliti (LICIACube, ArgoMoon), segmento IRIDE" },
          { nome: "Sitael / Tyvak International", ruolo: "Piccole piattaforme e nanosatelliti per costellazioni EO" },
        ],
      },
      {
        fase: "Operazioni, ground segment e lancio",
        posizione: "CENTRO",
        descrizione: "Controllo missione, ricezione ed elaborazione a terra, logistica orbitale: la spina dorsale che trasforma il segnale in dato utilizzabile.",
        input: ["Antenne e teleporti", "Spettro e frequenze ITU", "Xenon per propulsione elettrica", "Cybersecurity dei collegamenti"],
        aziende: [
          { nome: "Telespazio", ruolo: "Centro spaziale del Fucino, tra i maggiori teleporti civili al mondo; operazioni COSMO-SkyMed e IRIDE" },
          { nome: "D-Orbit", ruolo: "Logistica orbitale e space cargo (ION), rilascio di smallsat" },
          { nome: "Leaf Space", ruolo: "Ground station as a service per costellazioni" },
          { nome: "e-GEOS", ruolo: "Ricezione, archiviazione e processing dei dati radar (JV Telespazio 80% / ASI 20%)" },
        ],
      },
      {
        fase: "Dati EO, geoinformazione e telerilevamento",
        posizione: "VALLE",
        descrizione: "Distribuzione dei dati e loro trasformazione in prodotti geospaziali: interpretazione delle immagini, mappe tematiche, interferometria per il monitoraggio di frane e subsidenza.",
        input: ["Calcolo e storage massivi", "Algoritmi SAR e interferometria", "Dati ancillari (GNSS, meteo)", "Licenze e policy dei dati"],
        aziende: [
          { nome: "e-GEOS (Telespazio/ASI)", ruolo: "Distribuzione dati COSMO-SkyMed; Copernicus Emergency Management Service" },
          { nome: "Planetek Italia", ruolo: "Geoinformazione, monitoraggio del territorio e piattaforme EO (Bari)" },
          { nome: "Aresys", ruolo: "Processori SAR e interferometria (spin-off PoliMi)" },
          { nome: "NAIS / Geo-K / Survey Lab", ruolo: "Servizi di telerilevamento, cartografia e monitoraggio infrastrutture" },
        ],
      },
      {
        fase: "Applicazioni, analytics e servizi al mercato",
        posizione: "VALLE",
        descrizione: "L'ultimo miglio del valore: analytics basati su intelligenza artificiale per città, clima, agricoltura, assicurazioni e sicurezza. È il segmento più dinamico e più frammentato.",
        input: ["AI e modelli geospaziali", "Infrastruttura cloud", "Domanda pubblica àncora (PA)", "Competenze di dominio verticale"],
        aziende: [
          { nome: "Latitudo 40", ruolo: "Analytics satellitari con AI per città, clima e rischio (Napoli)" },
          { nome: "Programma IRIDE", ruolo: "Costellazione nazionale EO (PNRR): upstream + downstream + hub di servizi, operativa entro il 2026" },
          { nome: "AIKO / Deep Blue", ruolo: "Autonomia di bordo con AI e human factors per le operazioni EO" },
          { nome: "Assicurazioni e PA", ruolo: "Utenti finali: agricoltura di precisione, parametrico, protezione civile, catasto" },
        ],
      },
    ],
    forza: [
      "Filiera completa monte-valle, rara al mondo; leadership nel radar ad apertura sintetica (COSMO-SkyMed) e nell'iperspettrale (PRISMA)",
      "Autonomia end-to-end nell'Osservazione della Terra: costruzione satelliti, operazioni dal Fucino, distribuzione e interpretazione dei dati",
      "IRIDE: una delle maggiori costellazioni EO europee, finanziata dal PNRR, che integra upstream, downstream e hub di servizi nazionali",
      "Eccellenza nei moduli abitati e nelle infrastrutture orbitali (Torino, hub mondiale della ISS)",
    ],
    criticita: [
      "Scala industriale e capitali privati limitati rispetto a USA e Francia; downstream molto frammentato",
      "Ritardi e costi del programma Vega; dipendenza temporanea da lanci esteri",
      "Valorizzazione economica del dato EO ancora bassa: molte startup, pochi campioni di scala capaci di fare mercato",
      "Dipendenza estera per componentistica elettronica e ottiche critiche di alcuni payload",
    ],
    fonti: ["ASI", "ESA", "e-GEOS", "Copernicus / Commissione UE", "Osservatorio Space Economy PoliMi", "PNRR — Missione 1 (IRIDE)", "ESA — componenti EEE e ESCC", "EPRS / CSIS — materie prime critiche"],
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
    approvvigionamento: {
      intro: "L'Italia importa circa tre quarti dell'energia che consuma: la sicurezza degli approvvigionamenti è da sempre il vincolo del sistema. La transizione non elimina la dipendenza, la trasforma: dalle molecole (gas, petrolio) ai materiali (rame, litio, silicio, terre rare) — dalla geopolitica dei pozzi a quella delle miniere e soprattutto della raffinazione, dove domina la Cina. I presìdi italiani a monte esistono e sono pregiati: i cavi di Prysmian, gli elettrolizzatori di De Nora, la bioraffinazione di Eni, la gigafactory 3Sun.",
      materiali: [
        { materiale: "Gas naturale e GNL", impiego: "Generazione termoelettrica (~45% del mix), industria, riscaldamento", fornitura: "Import ~95% del fabbisogno: Algeria via Transmed primo fornitore, GNL da USA e Qatar (FSRU di Piombino e Ravenna), TAP dall'Azerbaigian. Russia quasi azzerata dal 2022; il prezzo resta il più volatile d'Europa", rischio: "alto" },
        { materiale: "Petrolio e greggi", impiego: "Raffinazione, carburanti, petrolchimica", fornitura: "Import quasi totale con paniere diversificato post-embargo russo; la raffineria ISAB di Priolo, passata di proprietà dopo il 2022, resta uno snodo di sicurezza nazionale", rischio: "medio" },
        { materiale: "Rame", impiego: "Reti di trasmissione e distribuzione, cavi HVDC (Prysmian), motori e trasformatori", fornitura: "Estrazione Cile/Perù/RD Congo, raffinazione cinese crescente; domanda mondiale in accelerazione con l'elettrificazione e prezzi ai massimi; il riciclo europeo non basta", rischio: "alto" },
        { materiale: "Litio, nichel e grafite (batterie)", impiego: "Storage utility-scale, accumuli domestici, mobilità elettrica", fornitura: "Raffinazione dominata dalla Cina (litio ~65%, grafite ~90%); l'Italia non ha una gigafactory di celle operativa su scala e importa sistemi completi", rischio: "critico" },
        { materiale: "Silicio policristallino e wafer FV", impiego: "Moduli fotovoltaici — inclusa la gigafactory 3Sun di Catania", fornitura: "Polysilicon cinese ~85% e wafer ~97% del mercato mondiale: anche la produzione europea di moduli dipende da celle e wafer importati", rischio: "critico" },
        { materiale: "Terre rare e magneti per l'eolico", impiego: "Generatori direct-drive delle turbine, motori ad alta efficienza", fornitura: "Magneti NdFeB di provenienza cinese ~98% in UE, sotto controlli export dal 2025; le alternative senza terre rare sono ancora immature", rischio: "critico" },
        { materiale: "Acciaio elettrico (GOES) e trasformatori", impiego: "Trasformatori di rete (Terna), cabine primarie, elettrificazione", fornitura: "Acciai a grano orientato prodotti da pochissimi player mondiali; collo di bottiglia globale sui trasformatori con consegne a 3-5 anni", rischio: "alto" },
        { materiale: "Uranio e combustibile nucleare", impiego: "Prospettico: SMR e nuovo nucleare (Ansaldo Nucleare, Newcleo, alleanze EDF/Westinghouse)", fornitura: "Estrazione Kazakistan/Canada/Namibia, arricchimento Urenco/Orano: per l'Italia è tema di scenario, da presidiare prima di un eventuale rientro operativo", rischio: "medio" },
        { materiale: "Feedstock per biocarburanti", impiego: "Bioraffinerie Eni (Venezia, Gela), HVO e carburanti sostenibili per l'aviazione (SAF)", fornitura: "Oli esausti e grassi in larga parte importati, anche dall'Asia con problemi di tracciabilità; concorrenza d'uso con la filiera alimentare", rischio: "medio" },
      ],
      fattori: [
        { nome: "Prezzo dell'energia", nota: "Il paradosso del settore: l'input critico dell'energia è l'energia stessa. Il prezzo elettrico italiano, fissato dal gas marginale, resta sopra la media UE e frena elettrolisi e industria energivora." },
        { nome: "Permitting e consenso", nota: "Autorizzazioni per rinnovabili e reti: il vero collo di bottiglia italiano. Aree idonee, soprintendenze e contenziosi pesano più della tecnologia." },
        { nome: "Capitale e tassi", nota: "Reti, offshore e storage sono capital-intensive: massima sensibilità al costo del denaro. Ruolo di CDP, BEI e delle aste (FER X, MACSE per gli accumuli)." },
        { nome: "Capitale umano tecnico", nota: "Installatori, elettricisti industriali, ingegneri di rete e di cantiere: carenza cronica che rallenta la messa a terra degli investimenti." },
      ],
    },
    catena: [
      {
        fase: "Approvvigionamento e upstream",
        posizione: "MONTE",
        descrizione: "Esplorazione e produzione, gas naturale liquefatto, diversificazione post-2022 dalle forniture russe.",
        input: ["GNL e capacità di rigassificazione", "Gasdotti (Transmed, TAP)", "Stoccaggi (Stogit)", "Shipping e navi metaniere"],
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
        input: ["Gas per cicli combinati", "Moduli FV e inverter", "Turbine e pale eoliche", "Acqua e bacini (idro)", "Aree idonee e permitting"],
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
        input: ["Rame e cavi HVDC", "Trasformatori e acciai GOES", "Acciaio per tralicci e condotte", "Sistemi SCADA e cybersecurity"],
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
        input: ["Silicio e celle FV", "Litio e celle per storage", "Terre rare per magneti", "Superleghe per turbine a gas", "Elettrodi e catalizzatori (H2)"],
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
        input: ["Smart meter e piattaforme digitali", "Dati di consumo", "Capitale per efficienza (ESCo)", "Colonnine e infrastruttura EV"],
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
    fonti: ["MASE", "Terna", "GSE", "ARERA", "Snam", "IEA — Critical Minerals", "Commissione UE — Net-Zero Industry Act"],
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
    approvvigionamento: {
      intro: "Il paradosso della prima voce dell'export italiano: le macchine sono progettate e costruite in Italia, ma il loro 'cervello' — controlli numerici, PLC, azionamenti — è un oligopolio tedesco-giapponese. La base metallurgica invece è un punto di forza domestico (acciaierie e fonderie bresciane e venete), pur dipendendo da rottame, ferroleghe ed energia ai prezzi italiani. La crisi dei chip 2021-23 ha insegnato la lezione: una macchina da un milione di euro può restare ferma per un componente elettronico da cento.",
      materiali: [
        { materiale: "Controlli numerici (CNC)", impiego: "Il cervello di ogni macchina utensile: governa assi, utensili e cicli", fornitura: "Oligopolio Siemens, Fanuc, Heidenhain, Mitsubishi: nessun produttore italiano su scala. Dipendenza strategica accettata da decenni, senza alternative a breve", rischio: "critico" },
        { materiale: "PLC, elettronica industriale e semiconduttori", impiego: "Automazione, motion control, sensoristica, quadri", fornitura: "Siemens, Rockwell, Omron, Schneider a monte; la scarsità di chip 2021-23 ha bloccato consegne di intere linee. Scorte strategiche ora prassi nei distretti", rischio: "alto" },
        { materiale: "Cuscinetti, guide lineari e viti a ricircolo", impiego: "Precisione del moto: il cuore meccanico delle macchine", fornitura: "SKF, Schaeffler, THK, NSK, Bosch Rexroth: produzione svedese-tedesco-giapponese con lead time lunghi nei picchi di ciclo", rischio: "alto" },
        { materiale: "Sorgenti laser e ottiche di potenza", impiego: "Taglio e lavorazione lamiera (Prima Industrie, BLM)", fornitura: "Sorgenti in fibra dominate da IPG e Trumpf; presidio italiano parziale con El.En (Firenze) e fotonica torinese", rischio: "alto" },
        { materiale: "Software CAD/CAM/PLM e digital twin", impiego: "Progettazione, simulazione, gemello digitale delle linee", fornitura: "Licenze estere (Siemens PLM, Dassault, Autodesk): come nei semiconduttori, un fattore produttivo sotto giurisdizione altrui", rischio: "alto" },
        { materiale: "Acciai speciali, fusioni e forgiati", impiego: "Basamenti, alberi, ingranaggi, carpenteria", fornitura: "Presidio domestico forte (acciaierie bresciane e venete, Lucchini RS), ma alimentato da rottame e ferroleghe importati e gravato dal costo dell'energia", rischio: "medio" },
        { materiale: "Riduttori, servomotori e azionamenti", impiego: "Trasmissione del moto e attuazione", fornitura: "Qui l'Italia gioca in casa: Bonfiglioli, Interpump e la meccatronica emiliana esportano nel mondo; inverter e servo di fascia alta restano in parte esteri", rischio: "medio" },
      ],
      fattori: [
        { nome: "Energia per fonderie", nota: "Forni elettrici e trattamenti termici: il differenziale di prezzo elettrico con Germania e Francia è un dazio occulto sulla base metallurgica dei distretti." },
        { nome: "Capitale umano tecnico", nota: "Periti, ITS, montatori trasfertisti: i 'sarti della meccanica' vanno in pensione più in fretta di quanto se ne formino. Il collo di bottiglia è demografico." },
        { nome: "Export credit e fiere", nota: "Con l'80% di export, SACE, Simest e le fiere (EMO, Interpack) sono infrastruttura di vendita; dazi e cambio euro-dollaro spostano interi bilanci." },
        { nome: "Finanza di commessa", nota: "Impianti pagati a milestone su 12-24 mesi: il circolante è il vero vincolo di crescita delle medie imprese; anticipi e garanzie bancarie decidono le gare." },
      ],
    },
    catena: [
      {
        fase: "Metallurgia, fusioni e acciai speciali",
        posizione: "MONTE",
        descrizione: "La base materiale: acciai speciali, fusioni e forgiati dei distretti lombardi e veneti.",
        input: ["Rottame ferroso e ferroleghe", "Energia (forni elettrici)", "Refrattari", "Sabbie e leganti da fonderia"],
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
        input: ["Acciai da cementazione", "Cuscinetti e guide lineari", "Elettronica di controllo", "Lavorazioni di precisione"],
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
        input: ["CNC (Siemens, Fanuc, Heidenhain)", "Sorgenti laser e ottiche", "Servomotori e azionamenti", "Software CAD/CAM"],
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
        input: ["PLC e motion control", "Robotica e sistemi di visione", "Acciaio inox alimentare/farma", "Software e digital twin"],
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
        input: ["Ingegneria e project management", "Componenti su specifica", "Export credit (SACE/Simest)", "Montatori trasfertisti"],
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
    fonti: ["Federmacchine", "UCIMU", "Ucima", "ISTAT coe", "ANIMA", "Siderweb — congiuntura acciaio"],
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
      { label: "Produzione", value: "≈ €56 mld (1°-2° UE)" },
      { label: "Export", value: "€69 mld (2025, +28,5%)" },
      { label: "Addetti", value: "≈ 70.000 (60% laureati)" },
      { label: "R&S + investimenti", value: "≈ €4 mld/anno" },
    ],
    approvvigionamento: {
      intro: "Il grande paradosso della filiera: l'Italia è il primo produttore europeo di principi attivi per conto terzi, ma a monte dipende dall'Asia per gli intermedi chimici di base — per alcune molecole mature (antibiotici in testa) la Cina è di fatto monopolista. La pandemia lo ha reso evidente e l'UE risponde con il Critical Medicines Act (proposta 2025) per riportare in Europa le produzioni essenziali. A valle della chimica, però, l'Italia presidia in casa un pezzo raro della catena: vetro farmaceutico (Stevanato), macchine di confezionamento (IMA, Marchesini) e capacità sterile riconosciuta dalle big pharma.",
      materiali: [
        { materiale: "Intermedi chimici e KSM (key starting materials)", impiego: "Sintesi dei principi attivi: il gradino sotto gli API", fornitura: "Cina e India dominano gli intermedi di base: anche il 1° produttore UE di API compra i precursori in Asia. Reshoring avviato solo su molecole selezionate", rischio: "critico" },
        { materiale: "Penicilline e antibiotici di base (6-APA)", impiego: "Antibiotici: la classe più esposta a carenze", fornitura: "Cina quasi monopolista del 6-APA e delle fermentazioni di base; ACS Dobfar tra gli ultimi produttori occidentali di sterili antibiotici", rischio: "critico" },
        { materiale: "Solventi, reagenti e chimica di base", impiego: "Processi di sintesi e purificazione della chimica fine", fornitura: "La petrolchimica europea in ritirata restringe le fonti locali; costi energetici italiani sopra la media aggravano il divario con l'Asia", rischio: "alto" },
        { materiale: "Eccipienti e lipidi speciali", impiego: "Formulazione; lipidi per nanoparticelle (mRNA), gelatine, lattosio", fornitura: "Mercato globale concentrato su pochi fornitori qualificati; per i lipidi LNP la capacità è nata quasi tutta fuori dall'Italia", rischio: "alto" },
        { materiale: "Filtri sterili e sistemi single-use", impiego: "Bioproduzione e riempimento asettico (fill & finish)", fornitura: "Oligopolio globale (Merck Millipore, Sartorius, Pall): durante il Covid code d'attesa di mesi; l'Italia è utente, non produttrice, di questi consumabili critici", rischio: "alto" },
        { materiale: "Vetro farmaceutico (tubing borosilicato)", impiego: "Fiale, siringhe e cartucce a contatto diretto col farmaco", fornitura: "Stevanato è leader mondiale nella trasformazione, ma il tubo di vetro a monte è concentrato in pochi player (Schott, Corning, Nipro): presidio italiano forte a valle, esposto a monte", rischio: "medio" },
        { materiale: "Isotopi per medicina nucleare", impiego: "Radiofarmaci diagnostici e teranostica", fornitura: "Il tecnezio-99m dipende da pochi reattori esteri (Paesi Bassi, Belgio) prossimi al fine vita; filiera fragile e senza scorte possibili", rischio: "alto" },
      ],
      fattori: [
        { nome: "Standard GMP e regolatorio", nota: "Ogni sito, materiale e fornitore va certificato GMP e ispezionato da AIFA/EMA/FDA: cambiare fornitore richiede mesi o anni. È insieme barriera all'ingresso e rigidità della catena." },
        { nome: "Capitale umano scientifico", nota: "Chimici di processo, biotecnologi ed esperti di regulatory affairs: il 60% degli addetti è laureato. Il polo lombardo-emiliano e Siena formano competenze contese a livello globale." },
        { nome: "Energia e acqua di processo", nota: "Sintesi chimica, sterilizzazione e liofilizzazione sono energivore; l'acqua for injection (WFI) ultrapura è un input di processo obbligato e regolato." },
        { nome: "Prezzi regolati e payback", nota: "Il farmaco è a prezzo amministrato: tetti di spesa e payback comprimono i margini. La tensione tra sostenibilità del SSN e attrattività degli investimenti è strutturale." },
      ],
    },
    catena: [
      {
        fase: "Ricerca, biotech e clinica",
        posizione: "MONTE",
        descrizione: "IRCCS, poli biotech e ricerca traslazionale: il vivaio delle molecole.",
        input: ["Capitale umano scientifico", "Reagenti e strumentazione di laboratorio", "Finanziamenti R&S e venture", "Dati clinici e biobanche"],
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
        input: ["Intermedi chimici (Asia)", "Solventi ad alta purezza", "Reagenti di fermentazione", "Energia e acqua di processo", "Certificazione GMP"],
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
        input: ["Principi attivi (API)", "Eccipienti e formulazione", "Reagenti biotech e single-use", "Vetro e primary packaging", "Camere sterili e liofilizzatori"],
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
        input: ["Tubing di vetro borosilicato", "Polimeri medicali e gomme", "Alluminio e materiali di chiusura", "Meccanica di precisione"],
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
        input: ["Logistica a temperatura controllata", "Sistemi di tracciabilità (serializzazione)", "Fondi del SSN", "Personale sanitario e farmacisti"],
        aziende: [
          { nome: "Distribuzione intermedia", ruolo: "Comifar, Unico, Farla" },
          { nome: "Farmacie e SSN", ruolo: "Spesa farmaceutica pubblica ≈ €20 mld/anno" },
        ],
      },
    ],
    forza: [
      "Export +248% in dieci anni: dei €19 mld di crescita dell'export manifatturiero 2025, €15 mld vengono dal pharma (fill & finish, sterili, biologici)",
      "Filiera completa: API + produzione + vetro + macchine di confezionamento nello stesso sistema paese",
      "Polo vaccini di Siena (GSK) e nuovi mega-investimenti (Novo Nordisk ad Anagni)",
    ],
    criticita: [
      "Gran parte della produzione è conto terzi: la proprietà intellettuale resta all'estero",
      "Dipendenza da intermedi chimici asiatici per alcune molecole di base",
      "Prezzi regolati e payback: tensione tra spesa pubblica e attrattività degli investimenti",
    ],
    fonti: ["Farmindustria", "EFPIA", "AIFA", "Aschimfarma", "Commissione UE — Critical Medicines Act", "EMA — carenze di medicinali"],
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
    approvvigionamento: {
      intro: "Nessuna filiera al mondo ha colli di bottiglia così estremi: a quasi ogni livello esiste un quasi-monopolio — ASML per la litografia, il Giappone per i fotoresist, la Cina per il gallio, Taiwan per i nodi avanzati. L'Italia presidia punti a monte rari e sottovalutati: i wafer di MEMC a Novara e Merano (tra le poche capacità europee), l'epitassia SiC di LPE, il campus integrato ST di Catania che internalizza i substrati in carburo di silicio. Il vincolo locale più concreto è banale e fisico: acqua ultrapura ed energia per le fab.",
      materiali: [
        { materiale: "Gallio, germanio e composti III-V", impiego: "GaN per RF e potenza, LED, substrati GaAs, optoelettronica", fornitura: "Cina ~98% del gallio raffinato, sotto bandi e licenze dal 2023; recupero da riciclo marginale. Impatto diretto su RF, difesa e ricarica rapida", rischio: "critico" },
        { materiale: "Polysilicon elettronico e wafer di silicio", impiego: "Substrato di ogni chip: fette da 200 e 300 mm", fornitura: "Polysilicon grade elettronico da USA/Germania/Giappone; wafer dominati da Shin-Etsu e SUMCO (Giappone). L'Italia ospita MEMC (GlobalWafers, Taiwan) a Novara e Merano: presidio raro in UE", rischio: "alto" },
        { materiale: "Fotoresist e fotomaschere", impiego: "Litografia: il disegno dei circuiti sul silicio", fornitura: "Quasi-monopolio giapponese (JSR, TOK, Shin-Etsu, Hoya): nessuna alternativa europea qualificata su scala", rischio: "alto" },
        { materiale: "Gas speciali e chimica ultrapura", impiego: "Etching, deposizione, pulizia camere (neon, elio, NF3, acidi elettronici)", fornitura: "Il neon arrivava per metà dall'Ucraina prima del 2022; elio da USA/Qatar; chimica ultrapura da pochi player globali con logistica dedicata", rischio: "alto" },
        { materiale: "Macchine litografiche e di processo", impiego: "Litografia (ASML), deposizione, impianto ionico, metrologia", fornitura: "ASML (Paesi Bassi) monopolista DUV/EUV; Applied Materials, LAM e TEL per il processo. Presidio italiano nell'epitassia: LPE (Baranzate, gruppo ASM)", rischio: "alto" },
        { materiale: "Substrati SiC (carburo di silicio)", impiego: "Chip di potenza per auto elettrica e industria — il cuore di Catania", fornitura: "ST ha internalizzato i substrati nel campus di Catania (primo sito UE integrato a 200 mm); pressione dei produttori cinesi sui prezzi (crollati dal 2023)", rischio: "medio" },
        { materiale: "Substrati per packaging (ABF) e leadframe", impiego: "Assemblaggio dei chip, probe card, interconnessioni", fornitura: "Substrati ABF concentrati in Giappone/Taiwan (Ajinomoto de facto standard); leadframe e ceramiche tecniche in gran parte asiatiche", rischio: "medio" },
        { materiale: "Acqua ultrapura ed energia", impiego: "Una fab consuma come una piccola città: raffreddamento, lavaggi, cleanroom", fornitura: "Vincolo tutto locale: lo stress idrico siciliano tocca Catania, il costo elettrico italiano pesa su ogni wafer. Ricircolo e desalinizzazione diventano investimenti obbligati", rischio: "alto" },
      ],
      fattori: [
        { nome: "Scala degli investimenti", nota: "Una fab da 200 mm costa miliardi: senza Chips Act europeo e incentivi nazionali nessun progetto sta in piedi contro i sussidi di USA e Asia." },
        { nome: "Capitale umano microelettronico", nota: "Ingegneri di processo e progettisti analogici: i poli di Catania, Agrate e Pavia formano talenti che il mercato globale paga di più. Trattenerli è il vero investimento." },
        { nome: "EDA e proprietà intellettuale", nota: "Il software di progettazione (Cadence, Synopsys — USA) e gli IP core (ARM — UK) sono licenze sotto giurisdizione estera: un fattore produttivo invisibile ma vincolante." },
        { nome: "Ciclicità della domanda", nota: "Il power/automotive è ciclico: il rallentamento EV 2024-25 ha colpito ST. La diversificazione verso industriale, AI ed energia è la copertura naturale." },
      ],
    },
    catena: [
      {
        fase: "Materiali e wafer",
        posizione: "MONTE",
        descrizione: "Silicio, epitassia e materiali avanzati: pochi attori, altamente strategici.",
        input: ["Polysilicon elettronico", "Energia e acqua ultrapura", "Crogioli di quarzo e grafite", "Logistica in classe cleanroom"],
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
        input: ["Wafer e substrati SiC", "Gas speciali e fotoresist", "Macchine litografiche (ASML)", "EDA e IP core (licenze estere)", "Gallio per GaN"],
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
        input: ["Leghe e microcontatti di precisione", "Ceramiche tecniche e PCB speciali", "Substrati ABF e leadframe", "Metrologia sub-micrometrica"],
        aziende: [
          { nome: "Technoprobe", ruolo: "1° mondiale nelle probe card per il test dei chip (Cernusco Lombardone)" },
          { nome: "SPEA", ruolo: "Sistemi automatici di test (Volpiano)" },
        ],
      },
      {
        fase: "Sistemi embedded ed elettronica applicata",
        posizione: "VALLE",
        descrizione: "Edge computing, identificazione automatica, elettronica professionale.",
        input: ["Chip e moduli (anche import)", "PCB e componentistica passiva", "Software embedded", "Certificazioni di settore (auto, medicale)"],
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
    fonti: ["MIMIT", "Commissione UE — Chips Act", "Bilanci societari (STM, Technoprobe)", "SEMI", "EPRS / CSIS — materie prime critiche"],
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
  difesa: 1, "spazio-osservazione-terra": 5, energia: 3, meccanica: 2, automotive: 6,
  farmaceutica: 7, agroalimentare: 4, moda: 8, elettronica: 1, nautica: 2,
};

/* Reindirizzamenti da slug storici a slug correnti (retrocompatibilità URL) */
const SECTOR_ALIASES = {
  spazio: "spazio-osservazione-terra",
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
