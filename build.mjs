#!/usr/bin/env node
/* ============================================================
   Progetto Italia — Build del file autonomo per Safari/offline
   Trasforma index.html + assets/* in un unico file HTML
   self-contained (Progetto-Italia.html), apribile con doppio
   clic senza server. Nessuna dipendenza: solo Node.
   Uso:  node build.mjs
   ============================================================ */

import { readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(fileURLToPath(import.meta.url));
const read = (p) => readFileSync(resolve(root, p), "utf8");

let html = read("index.html");

// 1) inlina il foglio di stile
html = html.replace(
  /<link\s+rel="stylesheet"\s+href="(assets\/[^"]+\.css)">/g,
  (_, href) => `<style>\n${read(href)}\n</style>`
);

// 2) inlina gli script (mantiene l'ordine di caricamento)
html = html.replace(
  /<script\s+src="(assets\/[^"]+\.js)"><\/script>/g,
  (_, src) => `<script>\n${read(src)}\n</script>`
);

// 3) marcatore di build per chiarezza (commento HTML, non visibile)
html = html.replace(
  /<head>/,
  `<head>\n  <!-- File autonomo generato da build.mjs — non modificare a mano: modifica i sorgenti in assets/ e ri-esegui \`node build.mjs\` -->`
);

const out = resolve(root, "Progetto-Italia.html");
writeFileSync(out, html);
console.log(`✓ Generato ${out} (${(html.length / 1024).toFixed(0)} KB)`);
