import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export type Settore = {
  slug: string;
  nome: string;
};

// Settori verticali: i domini sostanziali dove si documenta per argomenti (fatti,
// attori, dati). Vedi ARCHITETTURA.md per la distinzione dalle prospettive orizzontali.
export const SETTORI: Settore[] = [
  { slug: "energia-green-economy", nome: "Energia e green economy" },
  { slug: "spazio-osservazione-terra", nome: "Spazio e osservazione della Terra" },
  { slug: "difesa-dual-use", nome: "Difesa e dual-use" },
  { slug: "intelligenza-artificiale", nome: "Intelligenza artificiale" },
];

// Prospettive di analisi orizzontali: le lenti del quadro teorico applicate
// trasversalmente ai settori sopra. Non hanno una cartella propria — un'analisi le
// segnala nei tag del frontmatter quando le applica esplicitamente (vedi
// LINEE-GUIDA-EDITORIALI.md).
export const PROSPETTIVE = [
  "M&A",
  "R&S",
  "Sicurezza economico-finanziaria",
  "Patrimonio industriale e tecnologico",
] as const;

export type ArticleFrontmatter = {
  title: string;
  settore: string;
  data: string;
  autore: string;
  sintesi: string;
  fonti: string[];
  tags?: string[];
};

export type Article = {
  slug: string;
  frontmatter: ArticleFrontmatter;
  content: string;
};

// /content vive alla radice del repo, due livelli sopra apps/web.
const CONTENT_DIR = path.join(process.cwd(), "..", "..", "content");

export function getSettore(slug: string): Settore | undefined {
  return SETTORI.find((s) => s.slug === slug);
}

// I sottotemi sono semplici sottocartelle create quando servono (vedi ARCHITETTURA.md):
// si cercano i file .mdx a qualunque profondità sotto la cartella del settore, invece
// di imporre un livello fisso.
function findMdxFiles(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];

  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const entryPath = path.join(dir, entry.name);
    if (entry.isDirectory()) return findMdxFiles(entryPath);
    return entry.name.endsWith(".mdx") ? [entryPath] : [];
  });
}

export function getArticles(settoreSlug: string): Article[] {
  const dir = path.join(CONTENT_DIR, settoreSlug);
  const articles = findMdxFiles(dir).map((filePath) => {
    const raw = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(raw);
    return {
      slug: path.basename(filePath, ".mdx"),
      frontmatter: data as ArticleFrontmatter,
      content,
    };
  });

  return articles.sort((a, b) => (a.frontmatter.data < b.frontmatter.data ? 1 : -1));
}

export function getArticle(settoreSlug: string, slug: string): Article | null {
  const dir = path.join(CONTENT_DIR, settoreSlug);
  const filePath = findMdxFiles(dir).find((p) => path.basename(p, ".mdx") === slug);
  if (!filePath) return null;

  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  return { slug, frontmatter: data as ArticleFrontmatter, content };
}

export function getAllArticles(): (Article & { settoreSlug: string })[] {
  return SETTORI.flatMap((s) => getArticles(s.slug).map((a) => ({ ...a, settoreSlug: s.slug }))).sort(
    (a, b) => (a.frontmatter.data < b.frontmatter.data ? 1 : -1)
  );
}

export type Copertura = {
  settore: Settore;
  count: number;
  ultimaData: string | null;
};

export function getCopertura(): Copertura[] {
  return SETTORI.map((settore) => {
    const articles = getArticles(settore.slug);
    return {
      settore,
      count: articles.length,
      ultimaData: articles[0]?.frontmatter.data ?? null,
    };
  });
}
