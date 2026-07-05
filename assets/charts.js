/* ============================================================
   Progetto Italia — Motore grafici SVG (nessuna dipendenza)
   Segue le specifiche dataviz: marche sottili, estremità dati
   arrotondate 4px ancorate alla baseline, linee 2px, gap 2px
   tra riempimenti, etichette dirette selettive, griglia recessiva,
   tooltip al passaggio, testo sempre in token d'inchiostro.
   ============================================================ */

const NS = "http://www.w3.org/2000/svg";

function el(tag, attrs = {}, parent = null) {
  const node = document.createElementNS(NS, tag);
  for (const [k, v] of Object.entries(attrs)) node.setAttribute(k, v);
  if (parent) parent.appendChild(node);
  return node;
}

function fmt(n, dec = 0) {
  return n.toLocaleString("it-IT", { minimumFractionDigits: dec, maximumFractionDigits: dec });
}

/* ---------- Tooltip singleton ---------- */
let TIP = null;
function tooltip() {
  if (!TIP) {
    TIP = document.createElement("div");
    TIP.className = "viz-tooltip";
    TIP.setAttribute("role", "status");
    document.body.appendChild(TIP);
  }
  return TIP;
}
function showTip(html, evt) {
  const t = tooltip();
  t.innerHTML = html;
  t.style.opacity = "1";
  const pad = 14;
  const w = t.offsetWidth, h = t.offsetHeight;
  let x = evt.clientX + pad, y = evt.clientY - h - pad;
  if (x + w > window.innerWidth - 8) x = evt.clientX - w - pad;
  if (y < 8) y = evt.clientY + pad;
  t.style.left = x + "px";
  t.style.top = y + "px";
}
function hideTip() { if (TIP) TIP.style.opacity = "0"; }

function bindTip(node, htmlFn) {
  node.addEventListener("pointermove", (e) => showTip(htmlFn(), e));
  node.addEventListener("pointerleave", hideTip);
}

/* Barra orizzontale con estremità dati arrotondata (4px), base squadrata */
function roundedBarPath(x, y, w, h, r, dir = "right") {
  r = Math.min(r, Math.abs(w) / 2 || r, h / 2);
  if (dir === "right") {
    return `M${x},${y} h${w - r} a${r},${r} 0 0 1 ${r},${r} v${h - 2 * r} a${r},${r} 0 0 1 ${-r},${r} h${-(w - r)} Z`;
  }
  // colonna verticale: estremità superiore arrotondata
  return `M${x},${y + r} a${r},${r} 0 0 1 ${r},${-r} h${w - 2 * r} a${r},${r} 0 0 1 ${r},${r} v${h - r} h${-w} Z`;
}

/* ============================================================
   DONUT — parte-su-tutto con etichette dirette + legenda
   data: [{label, value, detail}]
   ============================================================ */
function donutChart(container, data, opts = {}) {
  const size = 260, cx = size / 2, cy = size / 2;
  const rOut = 108, rIn = 68;
  const total = data.reduce((s, d) => s + d.value, 0);
  const slots = opts.slots || [1, 2, 3, 4, 5, 6, 7, 8];

  const wrap = document.createElement("div");
  wrap.className = "donut-wrap";
  const svg = el("svg", { viewBox: `0 0 ${size} ${size}`, class: "donut-svg", role: "img", "aria-label": opts.ariaLabel || "Grafico a ciambella" });

  let a0 = -Math.PI / 2;
  data.forEach((d, i) => {
    const frac = d.value / total;
    const a1 = a0 + frac * Math.PI * 2;
    // gap di 2px sulla circonferenza esterna
    const gap = 2 / rOut;
    const s0 = a0 + gap / 2, s1 = a1 - gap / 2;
    const large = s1 - s0 > Math.PI ? 1 : 0;
    const p = [
      `M${cx + rOut * Math.cos(s0)},${cy + rOut * Math.sin(s0)}`,
      `A${rOut},${rOut} 0 ${large} 1 ${cx + rOut * Math.cos(s1)},${cy + rOut * Math.sin(s1)}`,
      `L${cx + rIn * Math.cos(s1)},${cy + rIn * Math.sin(s1)}`,
      `A${rIn},${rIn} 0 ${large} 0 ${cx + rIn * Math.cos(s0)},${cy + rIn * Math.sin(s0)}`,
      "Z",
    ].join(" ");
    const path = el("path", { d: p, fill: `var(--series-${slots[i % slots.length]})` }, svg);
    path.classList.add("viz-mark");
    bindTip(path, () => `<strong>${d.label}</strong><br>${fmt(d.value)}% del valore aggiunto${d.detail ? `<br><span class="tip-detail">${d.detail}</span>` : ""}`);

    // etichetta diretta (percentuale) per fette >= 4%
    if (frac >= 0.04) {
      const mid = (a0 + a1) / 2, rl = (rOut + rIn) / 2;
      const tx = cx + rl * Math.cos(mid), ty = cy + rl * Math.sin(mid);
      const t = el("text", { x: tx, y: ty, "text-anchor": "middle", "dominant-baseline": "middle", class: "donut-label" }, svg);
      t.textContent = fmt(d.value) + "%";
    }
    a0 = a1;
  });

  // numero centrale
  const c1 = el("text", { x: cx, y: cy - 8, "text-anchor": "middle", class: "donut-center-value" }, svg);
  c1.textContent = opts.centerValue || "";
  const c2 = el("text", { x: cx, y: cy + 14, "text-anchor": "middle", class: "donut-center-label" }, svg);
  c2.textContent = opts.centerLabel || "";

  wrap.appendChild(svg);

  // legenda (identità mai affidata al solo colore)
  const leg = document.createElement("div");
  leg.className = "viz-legend viz-legend-col";
  data.forEach((d, i) => {
    const item = document.createElement("div");
    item.className = "viz-legend-item";
    item.innerHTML = `<span class="viz-swatch" style="background:var(--series-${slots[i % slots.length]})"></span><span class="viz-legend-text">${d.label} <strong>${fmt(d.value)}%</strong></span>`;
    leg.appendChild(item);
  });
  wrap.appendChild(leg);
  container.appendChild(wrap);
}

/* ============================================================
   BARRE ORIZZONTALI — magnitudine (tinta unica sequenziale)
   data: [{label, value, nota}]
   ============================================================ */
function hBarChart(container, data, opts = {}) {
  const unit = opts.unit || "";
  const max = Math.max(...data.map((d) => d.value));
  const rowH = 34, labelW = opts.labelWidth || 210, valueW = 64;
  const W = 640, H = data.length * rowH + 6;
  const plotW = W - labelW - valueW;

  const svg = el("svg", { viewBox: `0 0 ${W} ${H}`, class: "viz-svg", role: "img", "aria-label": opts.ariaLabel || "Grafico a barre" });

  data.forEach((d, i) => {
    const y = i * rowH + 5;
    const barH = 18;
    const w = Math.max(6, (d.value / max) * plotW);

    const lab = el("text", { x: labelW - 10, y: y + barH / 2, "text-anchor": "end", "dominant-baseline": "middle", class: "viz-cat-label" }, svg);
    lab.textContent = d.label.length > 34 ? d.label.slice(0, 33) + "…" : d.label;

    const bar = el("path", { d: roundedBarPath(labelW, y, w, barH, 4, "right"), fill: opts.color || "var(--seq-450)" }, svg);
    bar.classList.add("viz-mark");

    const val = el("text", { x: labelW + w + 8, y: y + barH / 2, "dominant-baseline": "middle", class: "viz-value-label" }, svg);
    val.textContent = fmt(d.value, opts.decimals || 0) + unit;

    const hit = el("rect", { x: 0, y: y - 2, width: W, height: rowH - 4, fill: "transparent" }, svg);
    bindTip(hit, () => `<strong>${d.label}</strong><br>${fmt(d.value, opts.decimals || 0)}${unit}${d.nota ? `<br><span class="tip-detail">${d.nota}</span>` : ""}`);
  });

  container.appendChild(svg);
}

/* ============================================================
   COLONNE RAGGRUPPATE — export vs import per anno (2 serie)
   data: [{anno, exp, imp}]
   ============================================================ */
function tradeColumns(container, data, opts = {}) {
  const W = 640, H = 300, padL = 48, padB = 30, padT = 16;
  const plotW = W - padL - 12, plotH = H - padT - padB;
  const max = Math.max(...data.flatMap((d) => [d.exp, d.imp]));
  const nice = Math.ceil(max / 100) * 100;
  const y = (v) => padT + plotH - (v / nice) * plotH;

  const svg = el("svg", { viewBox: `0 0 ${W} ${H}`, class: "viz-svg", role: "img", "aria-label": "Export e import di beni per anno" });

  // griglia recessiva + assi
  for (let g = 0; g <= 4; g++) {
    const gv = (nice / 4) * g, gy = y(gv);
    el("line", { x1: padL, x2: W - 12, y1: gy, y2: gy, class: g === 0 ? "viz-baseline" : "viz-grid" }, svg);
    const t = el("text", { x: padL - 8, y: gy, "text-anchor": "end", "dominant-baseline": "middle", class: "viz-axis-label" }, svg);
    t.textContent = fmt(gv);
  }

  const groupW = plotW / data.length;
  const barW = Math.min(26, groupW * 0.28);
  data.forEach((d, i) => {
    const cx = padL + groupW * i + groupW / 2;
    const bars = [
      { key: "Export", v: d.exp, x: cx - barW - 1, slot: 1 },
      { key: "Import", v: d.imp, x: cx + 1, slot: 6 },
    ];
    bars.forEach((b) => {
      const by = y(b.v), bh = padT + plotH - by;
      const bar = el("path", { d: roundedBarPath(b.x, by, barW, bh, 4, "up"), fill: `var(--series-${b.slot})` }, svg);
      bar.classList.add("viz-mark");
      bindTip(bar, () => `<strong>${d.anno} — ${b.key}</strong><br>€${fmt(b.v)} mld<br><span class="tip-detail">Saldo ${d.exp - d.imp >= 0 ? "+" : "−"}€${fmt(Math.abs(d.exp - d.imp))} mld</span>`);
    });
    const t = el("text", { x: cx, y: H - 8, "text-anchor": "middle", class: "viz-axis-label" }, svg);
    t.textContent = d.anno;
  });

  container.appendChild(svg);

  const leg = document.createElement("div");
  leg.className = "viz-legend";
  leg.innerHTML =
    `<span class="viz-legend-item"><span class="viz-swatch" style="background:var(--series-1)"></span><span class="viz-legend-text">Export</span></span>` +
    `<span class="viz-legend-item"><span class="viz-swatch" style="background:var(--series-6)"></span><span class="viz-legend-text">Import</span></span>` +
    `<span class="viz-legend-note">mld € — beni, fonte ISTAT</span>`;
  container.appendChild(leg);
}

/* ============================================================
   BARRE DIVERGENTI — saldo commerciale sopra/sotto lo zero
   data: [{anno, exp, imp}] → saldo = exp - imp
   ============================================================ */
function balanceBars(container, data) {
  const W = 640, H = 210, padL = 48, padB = 28, padT = 14;
  const plotW = W - padL - 12, plotH = H - padT - padB;
  const saldi = data.map((d) => d.exp - d.imp);
  const maxAbs = Math.ceil(Math.max(...saldi.map(Math.abs)) / 20) * 20;
  const zeroY = padT + plotH / 2;
  const scale = (plotH / 2 - 6) / maxAbs;

  const svg = el("svg", { viewBox: `0 0 ${W} ${H}`, class: "viz-svg", role: "img", "aria-label": "Saldo commerciale per anno" });

  [-maxAbs, 0, maxAbs].forEach((gv) => {
    const gy = zeroY - gv * scale;
    el("line", { x1: padL, x2: W - 12, y1: gy, y2: gy, class: gv === 0 ? "viz-baseline" : "viz-grid" }, svg);
    const t = el("text", { x: padL - 8, y: gy, "text-anchor": "end", "dominant-baseline": "middle", class: "viz-axis-label" }, svg);
    t.textContent = (gv > 0 ? "+" : "") + fmt(gv);
  });

  const groupW = plotW / data.length;
  const barW = Math.min(34, groupW * 0.4);
  data.forEach((d, i) => {
    const saldo = d.exp - d.imp;
    const cx = padL + groupW * i + groupW / 2;
    const h = Math.max(4, Math.abs(saldo) * scale);
    const isPos = saldo >= 0;
    const by = isPos ? zeroY - h : zeroY;
    // divergente: blu positivo / rosso negativo (coppia blu↔rosso, midpoint neutro = baseline)
    const bar = el("path", {
      d: isPos ? roundedBarPath(cx - barW / 2, by, barW, h, 4, "up")
               : `M${cx - barW / 2},${zeroY} h${barW} v${h - 4} a4,4 0 0 1 -4,4 h${-(barW - 8)} a4,4 0 0 1 -4,-4 Z`,
      fill: isPos ? "var(--div-pos)" : "var(--div-neg)",
    }, svg);
    bar.classList.add("viz-mark");
    bindTip(bar, () => `<strong>${d.anno}</strong><br>Saldo ${isPos ? "+" : "−"}€${fmt(Math.abs(saldo))} mld<br><span class="tip-detail">Export €${fmt(d.exp)} — Import €${fmt(d.imp)}</span>`);

    // etichetta diretta sul valore (obbligatoria: rileva il WARN contrasto)
    const vt = el("text", { x: cx, y: isPos ? by - 6 : by + h + 14, "text-anchor": "middle", class: "viz-value-label" }, svg);
    vt.textContent = (isPos ? "+" : "−") + fmt(Math.abs(saldo));

    const at = el("text", { x: cx, y: H - 6, "text-anchor": "middle", class: "viz-axis-label" }, svg);
    at.textContent = d.anno;
  });

  container.appendChild(svg);
}

/* ============================================================
   MODELLO SHUTDOWN — curve di costo interattive
   MC = 3q² − 24q + 60 + k ; AVC = q² − 12q + 60 + k ; ATC = AVC + F/q
   k = sovrapprezzo energia (costo variabile per unità).
   Zone di prezzo: P>ATCmin profitto · AVCmin≤P<ATCmin perdita ma produce ·
   P<AVCmin shutdown. Mostra dal vivo lo shock energetico → shutdown.
   ============================================================ */
function shutdownModel(container) {
  const F = 200;
  let P = 45, k = 0;

  const W = 640, H = 340, padL = 46, padR = 74, padT = 16, padB = 40;
  const plotW = W - padL - padR, plotH = H - padT - padB;
  const qMin = 0.7, qMax = 12, cMax = 130;
  const X = (q) => padL + ((q - qMin) / (qMax - qMin)) * plotW;
  const Y = (c) => padT + plotH - (Math.min(Math.max(c, 0), cMax) / cMax) * plotH;

  const MC = (q) => 3 * q * q - 24 * q + 60 + k;
  const AVC = (q) => q * q - 12 * q + 60 + k;
  const ATC = (q) => AVC(q) + F / q;
  const avcMin = () => 24 + k;            // minimo AVC (in q=6)
  const atcMin = () => {                   // minimo ATC campionato
    let m = Infinity;
    for (let q = 2; q <= qMax; q += 0.05) m = Math.min(m, ATC(q));
    return m;
  };
  const qStar = () => {
    const disc = 576 - 12 * (60 + k - P);
    if (disc < 0) return null;
    return (24 + Math.sqrt(disc)) / 6;     // ramo crescente di MC
  };

  const wrap = document.createElement("div");
  wrap.className = "sm-wrap";

  // controlli
  const ctr = document.createElement("div");
  ctr.className = "sm-controls";
  ctr.innerHTML = `
    <label class="sm-slider"><span>Prezzo di mercato <strong id="sm-pval"></strong></span>
      <input id="sm-p" type="range" min="10" max="90" step="1" value="${P}"></label>
    <label class="sm-slider"><span>Sovrapprezzo energia <strong id="sm-kval"></strong></span>
      <input id="sm-k" type="range" min="0" max="55" step="1" value="${k}"></label>`;
  wrap.appendChild(ctr);
  const pval = ctr.querySelector("#sm-pval"), kval = ctr.querySelector("#sm-kval");

  const svg = el("svg", { viewBox: `0 0 ${W} ${H}`, class: "viz-svg", role: "img", "aria-label": "Curve di costo e soglia di shutdown" });
  wrap.appendChild(svg);

  const readout = document.createElement("div");
  readout.className = "sm-readout";
  wrap.appendChild(readout);

  container.appendChild(wrap);

  function curve(fn, cls) {
    let d = "";
    for (let q = qMin; q <= qMax + 1e-9; q += 0.15) {
      const c = fn(q);
      if (c > cMax + 40) continue;
      d += (d ? "L" : "M") + X(q).toFixed(1) + "," + Y(c).toFixed(1) + " ";
    }
    return el("path", { d, class: cls, fill: "none" }, svg);
  }

  function update() {
    svg.innerHTML = "";
    const aMin = avcMin(), tMin = atcMin();

    // bande di zona (in prezzo): profitto / perdita / shutdown
    const band = (c1, c2, fill) => el("rect", { x: padL, y: Y(c2), width: plotW, height: Math.max(0, Y(c1) - Y(c2)), fill, opacity: 0.10 }, svg);
    band(tMin, cMax, "var(--div-pos)");     // sopra ATCmin → profitto
    band(aMin, tMin, "var(--series-3)");    // tra AVCmin e ATCmin → perdita
    band(0, aMin, "var(--div-neg)");        // sotto AVCmin → shutdown

    // assi
    el("line", { x1: padL, y1: Y(0), x2: padL + plotW, y2: Y(0), class: "viz-baseline" }, svg);
    el("line", { x1: padL, y1: padT, x2: padL, y2: Y(0), class: "viz-baseline" }, svg);
    for (let c = 0; c <= cMax; c += 30) {
      el("line", { x1: padL, x2: padL + plotW, y1: Y(c), y2: Y(c), class: "viz-grid" }, svg);
      const t = el("text", { x: padL - 8, y: Y(c), "text-anchor": "end", "dominant-baseline": "middle", class: "viz-axis-label" }, svg);
      t.textContent = c;
    }
    const xl = el("text", { x: padL + plotW / 2, y: H - 8, "text-anchor": "middle", class: "viz-axis-label" }, svg);
    xl.textContent = "Quantità prodotta →";
    const yl = el("text", { x: 14, y: padT + plotH / 2, "text-anchor": "middle", class: "viz-axis-label", transform: `rotate(-90 14 ${padT + plotH / 2})` }, svg);
    yl.textContent = "€ per unità";

    // curve di costo
    curve(ATC, "sm-atc");
    curve(AVC, "sm-avc");
    curve(MC, "sm-mc");
    const labelAt = (fn, txt, cls) => {
      // ancora l'etichetta all'ultimo q con curva dentro il riquadro
      let q = qMax;
      while (q > qMin && fn(q) > cMax) q -= 0.1;
      const inside = fn(qMax) <= cMax;
      const t = el("text", {
        x: inside ? padL + plotW + 6 : X(q) - 4,
        y: Y(fn(q)) + (inside ? 0 : -6),
        "dominant-baseline": "middle", "text-anchor": inside ? "start" : "end", class: cls,
      }, svg);
      t.textContent = txt;
    };
    labelAt(ATC, "ATC", "sm-lab sm-lab-atc");
    labelAt(AVC, "AVC", "sm-lab sm-lab-avc");
    labelAt(MC, "MC", "sm-lab sm-lab-mc");

    // linea del prezzo
    el("line", { x1: padL, x2: padL + plotW, y1: Y(P), y2: Y(P), class: "sm-price" }, svg);
    const pt = el("text", { x: padL + plotW + 6, y: Y(P), "dominant-baseline": "middle", class: "sm-lab sm-lab-p" }, svg);
    pt.textContent = "P";

    // punto ottimo e stato
    const shutdown = P < aMin;
    let q = qStar(), profit = -F, stato, cls;
    if (shutdown || q === null) {
      stato = "Shutdown — l'impianto si ferma"; cls = "sm-zone-critico";
      profit = -F;
    } else {
      const atcq = ATC(q);
      profit = (P - atcq) * q;
      if (P >= tMin) { stato = "Profitto positivo"; cls = "sm-zone-buono"; }
      else { stato = "In perdita, ma conviene produrre"; cls = "sm-zone-medio"; }
      // marcatore P = MC
      const mk = el("circle", { cx: X(q), cy: Y(P), r: 5, class: "sm-dot" }, svg);
      el("line", { x1: X(q), y1: Y(P), x2: X(q), y2: Y(0), class: "sm-drop" }, svg);
      const qt = el("text", { x: X(q), y: Y(0) + 16, "text-anchor": "middle", class: "viz-value-label" }, svg);
      qt.textContent = "q* " + q.toFixed(1);
    }

    pval.textContent = "€" + P;
    kval.textContent = "+€" + k;
    readout.innerHTML = `
      <span class="sm-zone ${cls}">${escHtml(stato)}</span>
      <span class="sm-metric">Soglia shutdown (AVC min) <strong>€${aMin.toFixed(0)}</strong></span>
      <span class="sm-metric">Pareggio (ATC min) <strong>€${tMin.toFixed(0)}</strong></span>
      <span class="sm-metric">Risultato <strong class="${profit >= 0 ? "sm-pos" : "sm-neg"}">${profit >= 0 ? "+" : "−"}€${Math.abs(profit).toFixed(0)}</strong></span>`;
  }

  ctr.querySelector("#sm-p").addEventListener("input", (e) => { P = +e.target.value; update(); });
  ctr.querySelector("#sm-k").addEventListener("input", (e) => { k = +e.target.value; update(); });
  update();
}

/* esc locale (nome distinto per non collidere con app.js nel bundle) */
function escHtml(s) { return String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c])); }

window.Charts = { donutChart, hBarChart, tradeColumns, balanceBars, shutdownModel };
