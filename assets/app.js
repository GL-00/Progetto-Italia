/* ============================================================
   Progetto Italia — Applicazione (router hash + rendering)
   Flusso utente: Panoramica → Settori → Catena del valore →
   Aziende → Metodologia. Nessuna dipendenza esterna.
   ============================================================ */

const $app = () => document.getElementById("app");

function esc(s) {
  return String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
}

function slotOf(id) { return SECTOR_SLOTS[id] || 1; }
function colorOf(id) { return `var(--series-${slotOf(id)})`; }

/* ---------- Router ---------- */
const routes = [
  { re: /^$/, render: renderHome },
  { re: /^settori$/, render: renderSettori },
  { re: /^settore\/([a-z-]+)$/, render: (m) => renderSettore(m[1]) },
  { re: /^materie-critiche$/, render: renderMaterie },
  { re: /^aziende$/, render: renderAziende },
  { re: /^metodologia$/, render: renderMetodologia },
];

function navigate() {
  const hash = location.hash.replace(/^#\/?/, "");
  const route = routes.find((r) => r.re.test(hash)) || routes[0];
  const m = hash.match(route.re) || [];
  window.scrollTo(0, 0);
  $app().innerHTML = "";
  route.render(m);
  updateNav(hash);
}

function updateNav(hash) {
  const key = hash.startsWith("settore") ? "settori" : (hash || "home");
  document.querySelectorAll(".main-nav a").forEach((a) => {
    a.classList.toggle("active", a.dataset.nav === key);
  });
}

window.addEventListener("hashchange", navigate);
window.addEventListener("DOMContentLoaded", navigate);

/* ---------- Componenti ---------- */
function sectionEl(kicker, title, sub) {
  const s = document.createElement("section");
  s.className = "section";
  s.innerHTML = `<div class="section-head">${kicker ? `<div class="kicker">${esc(kicker)}</div>` : ""}<h2>${esc(title)}</h2>${sub ? `<p>${sub}</p>` : ""}</div>`;
  return s;
}

function kpiRow(kpis) {
  const row = document.createElement("div");
  row.className = "kpi-row";
  row.innerHTML = kpis.map((k) => `
    <div class="stat-tile">
      <div class="stat-label">${esc(k.label)}</div>
      <div class="stat-value">${esc(k.value)}</div>
      ${k.delta ? `<div class="stat-delta ${k.trend || ""}">${esc(k.delta)}</div>` : ""}
    </div>`).join("");
  return row;
}

function card(title, sub) {
  const c = document.createElement("div");
  c.className = "card";
  if (title) c.innerHTML = `<h3>${esc(title)}</h3>${sub ? `<p class="card-sub">${esc(sub)}</p>` : ""}`;
  return c;
}

const ARROW_SVG = `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12h13m0 0-5-5m5 5-5 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

/* ============================================================
   PANORAMICA
   ============================================================ */
function renderHome() {
  const root = $app();

  const hero = document.createElement("div");
  hero.className = "hero";
  hero.innerHTML = `
    <div class="kicker">Panoramica ${MACRO.anno} · Economia italiana</div>
    <h1>L'economia italiana in un colpo d'occhio</h1>
    <p class="lead">Terza economia dell'area euro e seconda manifattura del continente: un sistema fondato
    su medie imprese esportatrici, distretti specializzati e poche grandi filiere strategiche.
    Da qui puoi scendere in ogni settore fino alla catena del valore e alle singole aziende.</p>`;
  hero.appendChild(kpiRow(MACRO.kpi));
  root.appendChild(hero);

  /* --- Come si forma il PIL --- */
  const s1 = sectionEl("Struttura", "Come si forma il PIL",
    "Composizione del valore aggiunto per macro-settore. I servizi dominano il totale, ma è la manifattura — circa il 15% — a generare l'export e i primati competitivi del paese.");
  const g1 = document.createElement("div");
  g1.className = "grid-2";
  const c1 = card("Valore aggiunto per macro-settore", "quota % sul totale — ISTAT, conti nazionali");
  Charts.donutChart(c1, MACRO.pilComposizione, {
    centerValue: "€2.258", centerLabel: "mld di PIL", ariaLabel: "Composizione del PIL per macro-settore",
  });
  const c2 = card("Dentro i servizi", "quota % sul valore aggiunto totale");
  Charts.hBarChart(c2, MACRO.serviziDettaglio, { unit: "%", labelWidth: 280, ariaLabel: "Dettaglio del terziario" });
  const note = document.createElement("p");
  note.className = "viz-note";
  note.textContent = "Il terziario include il turismo (≈ 10% del PIL considerando l'indotto) e un immobiliare che pesa per i fitti figurativi. La PA e la sanità valgono un sesto dell'economia.";
  c2.appendChild(note);
  g1.append(c1, c2);
  s1.appendChild(g1);
  root.appendChild(s1);

  /* --- Bilancia commerciale --- */
  const s2 = sectionEl("Scambi con l'estero", "La bilancia commerciale e chi la traina",
    "L'Italia è strutturalmente in surplus sui beni: lo shock energetico del 2022 è l'eccezione che conferma la regola. " +
    "Il surplus è generato da meccanica, farmaceutica, moda e agroalimentare; il deficit da energia, chimica di base ed elettronica di consumo.");
  const g2 = document.createElement("div");
  g2.className = "grid-2";
  const c3 = card("Export e import di beni", "mld € correnti, 2019–2025");
  Charts.tradeColumns(c3, MACRO.bilancia);
  const c4 = card("Saldo commerciale", "mld €: surplus in blu, deficit in rosso");
  Charts.balanceBars(c4, MACRO.bilancia);
  const n4 = document.createElement("p");
  n4.className = "viz-note";
  n4.textContent = MACRO.bilanciaNota;
  c4.appendChild(n4);
  g2.append(c3, c4);
  s2.appendChild(g2);
  root.appendChild(s2);

  /* --- Chi traina l'export --- */
  const s3 = sectionEl("Motori dell'export", "Cosa vende l'Italia, e a chi",
    "La meccanica strumentale è da decenni la prima voce; la farmaceutica, con il +28,5% del 2025, è diventata la seconda. Germania, Stati Uniti e Francia assorbono un terzo delle vendite estere.");
  const g3 = document.createElement("div");
  g3.className = "grid-2";
  const c5 = card("Prime voci dell'export di beni", "mld €, valori indicativi 2025 — ISTAT coe");
  Charts.hBarChart(c5, MACRO.topExport, { unit: "", labelWidth: 280, ariaLabel: "Prime voci dell'export" });
  const c6 = card("Principali mercati di sbocco", "quota % dell'export di beni");
  Charts.hBarChart(c6, MACRO.partner, { unit: "%", decimals: 1, labelWidth: 160, ariaLabel: "Principali mercati" });
  const n6 = document.createElement("p");
  n6.className = "viz-note";
  n6.textContent = "Nel 2025, l'anno dei dazi, l'export verso gli USA è cresciuto del +7,2% (surplus bilaterale €34,2 mld): l'Italia è stata l'unica grande economia UE ad aumentare le vendite oltreoceano, mentre Germania e Spagna arretravano di oltre il 9%.";
  c6.appendChild(n6);
  g3.append(c5, c6);
  s3.appendChild(g3);
  root.appendChild(s3);

  /* --- Differenziazione --- */
  const s4 = sectionEl("Vantaggi competitivi", "Dove l'Italia si differenzia",
    "I primati che nessun concorrente replica facilmente: nicchie globali, distretti e filiere complete.");
  const dg = document.createElement("div");
  dg.className = "diff-grid";
  dg.innerHTML = MACRO.differenziazione.map((d) => `
    <div class="diff-card"><div class="diff-ico">${d.icona}</div><h4>${esc(d.titolo)}</h4><p>${esc(d.testo)}</p></div>`).join("");
  s4.appendChild(dg);
  root.appendChild(s4);

  /* --- CTA settori --- */
  const s5 = sectionEl("Approfondimento", "Esplora i settori strategici",
    "Dieci filiere analizzate da monte a valle, con le aziende che operano in ogni stadio della catena del valore.");
  s5.appendChild(sectorGrid());
  root.appendChild(s5);
}

/* ============================================================
   SETTORI (griglia)
   ============================================================ */
function sectorGrid() {
  const g = document.createElement("div");
  g.className = "sector-grid";
  g.innerHTML = SETTORI.map((s) => `
    <a class="sector-card" href="#/settore/${s.id}" style="--sector-color:${colorOf(s.id)}">
      <span class="sc-ico">${s.icona}</span>
      <h3>${esc(s.nome)}</h3>
      <p>${esc(s.tagline)}</p>
      <span class="sc-kpis">${s.kpi.slice(0, 2).map((k) => `<span class="sc-kpi"><strong>${esc(k.value)}</strong>${esc(k.label)}</span>`).join("")}</span>
      <span class="sc-cta">Catena del valore →</span>
    </a>`).join("");
  return g;
}

function renderSettori() {
  const root = $app();
  const hero = document.createElement("div");
  hero.className = "hero";
  hero.innerHTML = `
    <div class="kicker">Analisi settoriale</div>
    <h1>I settori strategici dell'economia italiana</h1>
    <p class="lead">Ogni scheda ricostruisce la filiera da monte a valle — ricerca e materiali, componenti,
    sistemi, servizi — e mappa le aziende che operano in ciascuno stadio, con punti di forza e vulnerabilità.</p>`;
  root.appendChild(hero);
  const wrap = document.createElement("div");
  wrap.className = "section";
  wrap.appendChild(sectorGrid());
  root.appendChild(wrap);
}

/* ============================================================
   SETTORE (dettaglio con catena del valore)
   ============================================================ */
function renderSettore(id) {
  // retrocompatibilità: reindirizza gli slug storici a quelli correnti
  if (typeof SECTOR_ALIASES !== "undefined" && SECTOR_ALIASES[id]) {
    location.replace("#/settore/" + SECTOR_ALIASES[id]);
    return;
  }
  const s = SETTORI.find((x) => x.id === id);
  if (!s) { renderSettori(); return; }
  const root = $app();
  root.style.setProperty("--sector-color", colorOf(s.id));

  const head = document.createElement("div");
  head.className = "hero";
  head.innerHTML = `
    <nav class="breadcrumb"><a href="#/">Panoramica</a> / <a href="#/settori">Settori</a> / ${esc(s.nome)}</nav>
    <div class="sector-hero" style="--sector-color:${colorOf(s.id)}">
      <span class="sh-ico">${s.icona}</span>
      <div><h1>${esc(s.nome)}</h1><p>${esc(s.tagline)}</p></div>
    </div>`;
  head.appendChild(kpiRow(s.kpi));
  root.appendChild(head);

  /* Focus tematico (opzionale, presente solo su alcuni settori) */
  if (s.focus) {
    const fs = document.createElement("div");
    fs.className = "section";
    const fc = document.createElement("div");
    fc.className = "focus-card";
    fc.style.setProperty("--sector-color", colorOf(s.id));
    fc.innerHTML = `
      <div class="focus-body">
        <div class="kicker">Focus</div>
        <h3>${esc(s.focus.titolo)}</h3>
        <p>${esc(s.focus.testo)}</p>
      </div>
      <div class="focus-metrics">
        ${s.focus.metriche.map((m) => `
          <div class="focus-metric"><div class="fm-k">${esc(m.k)}</div><div class="fm-v">${esc(m.v)}</div></div>`).join("")}
      </div>`;
    fs.appendChild(fc);
    root.appendChild(fs);
  }

  /* Approvvigionamento — materie prime e fattori produttivi (opzionale) */
  if (s.approvvigionamento) {
    const ap = s.approvvigionamento;
    const sa = sectionEl("A monte della filiera", "Approvvigionamento: materie prime e fattori produttivi", ap.intro);

    const tw = document.createElement("div");
    tw.className = "table-wrap";
    tw.innerHTML = `
      <table class="data-table supply-table">
        <thead><tr><th>Materiale / input</th><th>Impiego nella filiera</th><th>Approvvigionamento e dipendenze</th><th>Rischio</th></tr></thead>
        <tbody>
          ${ap.materiali.map((m) => `
            <tr>
              <td class="td-company">${esc(m.materiale)}</td>
              <td class="td-role">${esc(m.impiego)}</td>
              <td class="td-role">${esc(m.fornitura)}</td>
              <td><span class="rischio rischio-${esc(m.rischio)}">${m.rischio === "critico" ? "⛔" : m.rischio === "alto" ? "⚠" : "●"} ${esc(m.rischio)}</span></td>
            </tr>`).join("")}
        </tbody>
      </table>`;
    sa.appendChild(tw);

    if (ap.fattori && ap.fattori.length) {
      const fg = document.createElement("div");
      fg.className = "factor-grid";
      fg.innerHTML = ap.fattori.map((f) => `
        <div class="factor-card"><h4>${esc(f.nome)}</h4><p>${esc(f.nota)}</p></div>`).join("");
      sa.appendChild(fg);
    }
    const cross = document.createElement("p");
    cross.className = "fonti-line";
    cross.innerHTML = `Le stesse dipendenze attraversano più filiere: <a href="#/materie-critiche">vedi l'analisi orizzontale delle materie prime critiche →</a>`;
    sa.appendChild(cross);
    root.appendChild(sa);
  }

  /* Catena del valore */
  const sc = sectionEl("Catena del valore", "Da monte a valle",
    "Ogni stadio mostra gli input necessari e le principali aziende che vi operano. Scorri orizzontalmente per percorrere la filiera.");
  const scroller = document.createElement("div");
  scroller.className = "chain-scroller";
  const labels = document.createElement("div");
  labels.className = "chain-flow-labels";
  labels.innerHTML = `<span>⛰️ Monte — input e tecnologie</span><span>Valle — mercato e servizi 🌊</span>`;
  scroller.appendChild(labels);

  const chain = document.createElement("div");
  chain.className = "chain";
  chain.style.setProperty("--sector-color", colorOf(s.id));
  s.catena.forEach((st, i) => {
    if (i > 0) {
      const arrow = document.createElement("div");
      arrow.className = "chain-arrow";
      arrow.innerHTML = ARROW_SVG;
      chain.appendChild(arrow);
    }
    const stage = document.createElement("div");
    stage.className = "chain-stage";
    stage.innerHTML = `
      <span class="chain-pos pos-${st.posizione}">${st.posizione} · ${i + 1}/${s.catena.length}</span>
      <h4>${esc(st.fase)}</h4>
      <p class="cs-desc">${esc(st.descrizione)}</p>
      ${st.input && st.input.length ? `
      <div class="chain-inputs">
        <span class="ci-label">Input richiesti</span>
        ${st.input.map((x) => `<span class="input-chip">${esc(x)}</span>`).join("")}
      </div>` : ""}
      <div class="chain-companies"></div>`;
    const box = stage.querySelector(".chain-companies");
    st.aziende.forEach((a) => {
      const chip = document.createElement("div");
      chip.className = "company-chip";
      chip.textContent = a.nome;
      // tooltip col ruolo: l'informazione resta accessibile anche via title
      chip.title = a.ruolo;
      chip.addEventListener("pointermove", (e) => showChipTip(a, e));
      chip.addEventListener("pointerleave", hideChipTip);
      box.appendChild(chip);
    });
    chain.appendChild(stage);
  });
  scroller.appendChild(chain);
  sc.appendChild(scroller);
  root.appendChild(sc);

  /* Forza / criticità */
  const sw = sectionEl("Lettura strategica", "Punti di forza e vulnerabilità", "");
  const grid = document.createElement("div");
  grid.className = "swot-grid";
  const f = card("Punti di forza");
  f.classList.add("swot-card", "forza");
  f.innerHTML += `<ul>${s.forza.map((x) => `<li>${esc(x)}</li>`).join("")}</ul>`;
  const c = card("Criticità e rischi");
  c.classList.add("swot-card", "criticita");
  c.innerHTML += `<ul>${s.criticita.map((x) => `<li>${esc(x)}</li>`).join("")}</ul>`;
  grid.append(f, c);
  sw.appendChild(grid);
  const fonti = document.createElement("p");
  fonti.className = "fonti-line";
  fonti.innerHTML = `<strong>Fonti settoriali:</strong> ${s.fonti.map(esc).join(" · ")} — <a href="#/metodologia">metodologia e avvertenze</a>`;
  sw.appendChild(fonti);
  root.appendChild(sw);

  /* Navigazione precedente/successivo */
  const idx = SETTORI.indexOf(s);
  const prev = SETTORI[(idx - 1 + SETTORI.length) % SETTORI.length];
  const next = SETTORI[(idx + 1) % SETTORI.length];
  const nav = document.createElement("div");
  nav.className = "sector-nav";
  nav.innerHTML = `
    <a href="#/settore/${prev.id}">← ${prev.icona} ${esc(prev.nome)}</a>
    <a href="#/settore/${next.id}">${esc(next.nome)} ${next.icona} →</a>`;
  root.appendChild(nav);
}

/* Tooltip per i chip azienda (riusa lo stile viz-tooltip) */
let chipTipEl = null;
function showChipTip(a, e) {
  if (!chipTipEl) {
    chipTipEl = document.createElement("div");
    chipTipEl.className = "viz-tooltip";
    document.body.appendChild(chipTipEl);
  }
  chipTipEl.innerHTML = `<strong>${esc(a.nome)}</strong><br><span class="tip-detail">${esc(a.ruolo)}</span>`;
  chipTipEl.style.opacity = "1";
  const w = chipTipEl.offsetWidth, h = chipTipEl.offsetHeight;
  let x = e.clientX + 14, y = e.clientY - h - 14;
  if (x + w > window.innerWidth - 8) x = e.clientX - w - 14;
  if (y < 8) y = e.clientY + 14;
  chipTipEl.style.left = x + "px";
  chipTipEl.style.top = y + "px";
}
function hideChipTip() { if (chipTipEl) chipTipEl.style.opacity = "0"; }

/* ============================================================
   MATERIE PRIME CRITICHE (analisi orizzontale)
   ============================================================ */
function renderMaterie() {
  const root = $app();
  const critici = MATERIE_CRITICHE.filter((m) => m.rischio === "critico").length;
  const cinaDom = MATERIE_CRITICHE.filter((m) => /Cina/.test(m.dominio)).length;

  const hero = document.createElement("div");
  hero.className = "hero";
  hero.innerHTML = `
    <div class="kicker">Analisi orizzontale</div>
    <h1>Materie prime critiche e fattori comuni</h1>
    <p class="lead">La lettura trasversale delle dieci filiere: ogni famiglia di materiali con tutti i settori
    che ne dipendono, chi controlla l'offerta, e i presìdi italiani da proteggere. Le stesse dipendenze
    ricorrono ovunque — ed è proprio la ricorrenza a renderle strategiche.</p>`;
  hero.appendChild(kpiRow([
    { label: "Famiglie di materiali", value: String(MATERIE_CRITICHE.length), delta: "aggregate dalle 10 filiere", trend: "flat" },
    { label: "A rischio critico", value: String(critici), delta: "dipendenza senza alternativa a breve", trend: "warn" },
    { label: "Dominio cinese", value: `${cinaDom} famiglie`, delta: "raffinazione più che estrazione", trend: "warn" },
    { label: "Fattori comuni", value: String(FATTORI_TRASVERSALI.length), delta: "energia, persone, capitale, regole", trend: "flat" },
  ]));
  root.appendChild(hero);

  /* Matrice materiali × settori */
  const sm = sectionEl("La matrice delle dipendenze", "Chi dipende da cosa",
    "Ogni riga è una famiglia di materiali, ogni colonna un settore: il simbolo indica l'esposizione e il suo livello di rischio. Passa sopra una cella per il dettaglio dell'impiego.");
  const glyph = { critico: "⛔", alto: "⚠", medio: "●" };
  const tw = document.createElement("div");
  tw.className = "table-wrap";
  const table = document.createElement("table");
  table.className = "data-table matrix-table";
  table.innerHTML = `
    <thead><tr>
      <th>Materiale</th>
      ${SETTORI.map((s) => `<th class="mx-col"><a href="#/settore/${s.id}" title="${esc(s.nome)}">${s.icona}</a></th>`).join("")}
      <th>Rischio</th>
    </tr></thead>`;
  const tbody = document.createElement("tbody");
  MATERIE_CRITICHE.forEach((m) => {
    const tr = document.createElement("tr");
    const tdName = document.createElement("td");
    tdName.className = "td-company";
    tdName.innerHTML = `<a class="mx-name" href="#/materie-critiche" onclick="return false">${esc(m.nome)}</a>`;
    tdName.querySelector("a").addEventListener("click", () => {
      const el = document.getElementById("mat-" + m.id);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    });
    tr.appendChild(tdName);
    SETTORI.forEach((s) => {
      const td = document.createElement("td");
      td.className = "mx-cell";
      const uso = m.settori[s.id];
      if (uso) {
        const dot = document.createElement("span");
        dot.className = `mx-dot rischio-${m.rischio}`;
        dot.textContent = glyph[m.rischio];
        dot.setAttribute("role", "img");
        dot.setAttribute("aria-label", `${s.nome}: ${uso}`);
        dot.addEventListener("pointermove", (e) => showChipTip({ nome: `${s.icona} ${s.nome}`, ruolo: uso }, e));
        dot.addEventListener("pointerleave", hideChipTip);
        td.appendChild(dot);
      }
      tr.appendChild(td);
    });
    const tdR = document.createElement("td");
    tdR.innerHTML = `<span class="rischio rischio-${esc(m.rischio)}">${glyph[m.rischio]} ${esc(m.rischio)}</span>`;
    tr.appendChild(tdR);
    tbody.appendChild(tr);
  });
  table.appendChild(tbody);
  tw.appendChild(table);
  sm.appendChild(tw);
  root.appendChild(sm);

  /* Schede per famiglia */
  const sf = sectionEl("Le famiglie in dettaglio", "Dipendenze, impieghi e presìdi italiani", "");
  const list = document.createElement("div");
  list.className = "mat-list";
  MATERIE_CRITICHE.forEach((m) => {
    const c = document.createElement("div");
    c.className = "card mat-card";
    c.id = "mat-" + m.id;
    c.innerHTML = `
      <div class="mat-head">
        <h3>${esc(m.nome)}</h3>
        <span class="rischio rischio-${esc(m.rischio)}">${glyph[m.rischio]} ${esc(m.rischio)}</span>
      </div>
      <p class="mat-row"><strong>Chi controlla l'offerta.</strong> ${esc(m.dominio)}</p>
      <p class="mat-row"><strong>Presìdi e risposte.</strong> ${esc(m.presidi)}</p>
      <div class="mat-sectors">
        ${Object.entries(m.settori).map(([id, uso]) => {
          const s = SETTORI.find((x) => x.id === id);
          return s ? `<a class="badge-sector" href="#/settore/${id}" title="${esc(uso)}"><span class="badge-dot" style="background:${colorOf(id)}"></span>${s.icona} ${esc(s.nome)}</a>` : "";
        }).join("")}
      </div>`;
    list.appendChild(c);
  });
  sf.appendChild(list);
  root.appendChild(sf);

  /* Fattori trasversali */
  const st = sectionEl("Oltre i materiali", "I fattori produttivi comuni",
    "Quattro vincoli che attraversano tutte le filiere: più strutturali di qualunque materia prima.");
  const fg = document.createElement("div");
  fg.className = "factor-grid";
  FATTORI_TRASVERSALI.forEach((f) => {
    const fc = document.createElement("div");
    fc.className = "factor-card";
    fc.innerHTML = `<h4>${f.icona} ${esc(f.nome)}</h4><p>${esc(f.nota)}</p>
      <div class="factor-sectors">${f.settori.map((id) => {
        const s = SETTORI.find((x) => x.id === id);
        return s ? `<a href="#/settore/${id}" title="${esc(s.nome)}">${s.icona}</a>` : "";
      }).join("")}</div>`;
    fg.appendChild(fc);
  });
  st.appendChild(fg);
  root.appendChild(st);

  const fonti = document.createElement("p");
  fonti.className = "fonti-line";
  fonti.innerHTML = `<strong>Fonti:</strong> aggregazione delle schede settoriali (EPRS/CSIS, IEA, Commissione UE — CRMA, Chips Act, Critical Medicines Act, RESourceEU) — <a href="#/metodologia">metodologia e avvertenze</a>`;
  root.appendChild(fonti);
}

/* ============================================================
   AZIENDE (indice ricercabile)
   ============================================================ */
function buildCompanyIndex() {
  const rows = [];
  SETTORI.forEach((s) => {
    s.catena.forEach((st) => {
      st.aziende.forEach((a) => {
        rows.push({ nome: a.nome, ruolo: a.ruolo, settore: s.nome, settoreId: s.id, fase: st.fase, posizione: st.posizione, icona: s.icona });
      });
    });
  });
  return rows;
}

function renderAziende() {
  const root = $app();
  const rows = buildCompanyIndex();
  let query = "", activeSector = "";

  const hero = document.createElement("div");
  hero.className = "hero";
  hero.innerHTML = `
    <div class="kicker">Indice trasversale</div>
    <h1>Le aziende delle filiere</h1>
    <p class="lead">${rows.length} presenze aziendali mappate nelle catene del valore dei dieci settori.
    Cerca per nome o ruolo, filtra per settore: la stessa azienda può comparire in più stadi o filiere.</p>`;
  root.appendChild(hero);

  const wrap = document.createElement("div");
  wrap.className = "section";

  const bar = document.createElement("div");
  bar.className = "filter-bar";
  const input = document.createElement("input");
  input.className = "search-input";
  input.type = "search";
  input.placeholder = "Cerca azienda, ruolo o tecnologia… (es. Leonardo, cavi, packaging)";
  input.setAttribute("aria-label", "Cerca azienda");
  bar.appendChild(input);
  wrap.appendChild(bar);

  const chips = document.createElement("div");
  chips.className = "filter-bar";
  const allChip = document.createElement("button");
  allChip.className = "filter-chip active";
  allChip.textContent = "Tutti i settori";
  chips.appendChild(allChip);
  SETTORI.forEach((s) => {
    const ch = document.createElement("button");
    ch.className = "filter-chip";
    ch.textContent = `${s.icona} ${s.nome}`;
    ch.dataset.id = s.id;
    chips.appendChild(ch);
  });
  wrap.appendChild(chips);

  const count = document.createElement("p");
  count.className = "results-count";
  wrap.appendChild(count);

  const tableWrap = document.createElement("div");
  tableWrap.className = "table-wrap";
  wrap.appendChild(tableWrap);
  root.appendChild(wrap);

  function draw() {
    const q = query.trim().toLowerCase();
    const filtered = rows.filter((r) =>
      (!activeSector || r.settoreId === activeSector) &&
      (!q || (r.nome + " " + r.ruolo + " " + r.fase).toLowerCase().includes(q))
    );
    count.textContent = `${filtered.length} risultat${filtered.length === 1 ? "o" : "i"}`;
    tableWrap.innerHTML = `
      <table class="data-table">
        <thead><tr><th>Azienda</th><th>Ruolo nella filiera</th><th>Settore</th><th>Stadio</th></tr></thead>
        <tbody>
          ${filtered.map((r) => `
            <tr>
              <td class="td-company">${esc(r.nome)}</td>
              <td class="td-role">${esc(r.ruolo)}</td>
              <td><a class="badge-sector" href="#/settore/${r.settoreId}"><span class="badge-dot" style="background:${colorOf(r.settoreId)}"></span>${r.icona} ${esc(r.settore)}</a></td>
              <td class="badge-stage">${esc(r.posizione)} · ${esc(r.fase)}</td>
            </tr>`).join("")}
        </tbody>
      </table>`;
    if (!filtered.length) {
      tableWrap.innerHTML = `<p style="padding:22px;color:var(--text-muted)">Nessun risultato per «${esc(query)}».</p>`;
    }
  }

  input.addEventListener("input", () => { query = input.value; draw(); });
  chips.addEventListener("click", (e) => {
    const btn = e.target.closest(".filter-chip");
    if (!btn) return;
    chips.querySelectorAll(".filter-chip").forEach((c) => c.classList.remove("active"));
    btn.classList.add("active");
    activeSector = btn.dataset.id || "";
    draw();
  });

  draw();
}

/* ============================================================
   METODOLOGIA E FONTI
   ============================================================ */
function renderMetodologia() {
  const root = $app();
  const hero = document.createElement("div");
  hero.className = "hero";
  hero.innerHTML = `
    <div class="kicker">Trasparenza</div>
    <h1>Metodologia e fonti</h1>
    <p class="lead">La piattaforma si avvale esclusivamente di fonti autorevoli e certificate: istituti di
    statistica, banche centrali, agenzie pubbliche, bilanci societari e associazioni di categoria.</p>`;
  root.appendChild(hero);

  const s = sectionEl("Fonti primarie", "Da dove vengono i dati", "");
  const c = card();
  const ul = document.createElement("ul");
  ul.className = "method-list";
  ul.innerHTML = FONTI_GENERALI.map((f) => `
    <li><span class="m-name">${esc(f.nome)}</span>${f.url ? ` — <a href="${esc(f.url)}" target="_blank" rel="noopener">${esc(f.url)}</a>` : ""}<br><span class="m-scope">${esc(f.ambito)}</span></li>`).join("");
  c.appendChild(ul);
  s.appendChild(c);

  const s2 = sectionEl("Note metodologiche", "Come leggere le schede", "");
  const c2 = card();
  c2.innerHTML += `
    <ul class="method-list">
      <li><span class="m-name">Anno di riferimento.</span> <span class="m-scope">Salvo diversa indicazione i valori sono riferiti al ${MACRO.anno} (consuntivi ISTAT o stime delle associazioni di categoria); i simboli ≈ segnalano ordini di grandezza.</span></li>
      <li><span class="m-name">Catene del valore.</span> <span class="m-scope">Gli stadi seguono la logica monte → valle (input, componenti, sistemi, mercato). Le aziende citate sono una selezione rappresentativa dei principali operatori, non un censimento esaustivo; la stessa azienda può operare su più stadi.</span></li>
      <li><span class="m-name">Perimetri settoriali.</span> <span class="m-scope">I confini tra filiere sono porosi (es. macchine per packaging: meccanica ma anche farmaceutica e alimentare); i rimandi incrociati sono segnalati nelle schede.</span></li>
      <li><span class="m-name">Visualizzazioni.</span> <span class="m-scope">Palette daltonismo-compatibile validata; identità mai affidata al solo colore (legende ed etichette dirette sempre presenti); i dati tabellari sono disponibili nell'indice aziende.</span></li>
    </ul>`;
  s2.appendChild(c2);

  const disc = document.createElement("div");
  disc.className = "disclaimer";
  disc.innerHTML = `<strong>Avvertenza.</strong> Piattaforma a scopo analitico e divulgativo: non costituisce consulenza
  finanziaria né valutazione ufficiale. I dati aziendali provengono da fonti pubbliche (bilanci, comunicati, stampa
  specializzata) e vanno verificati sulle fonti originali prima di ogni uso professionale.`;

  root.appendChild(s);
  root.appendChild(s2);
  root.appendChild(disc);
}
