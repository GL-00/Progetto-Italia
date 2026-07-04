import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export type Settore = {
  slug: string;
  nome: string;
};

export const SETTORI: Settore[] = [
  { slug: "sicurezza-economico-finanziaria", nome: "Sicurezza economico-finanziaria" },
  { slug: "patrimonio-industriale-tecnologico", nome: "Patrimonio industriale e tecnologico" },
  { slug: "energia-green-economy", nome: "Energia e green economy" },
  { slug: "corporate-ma-rs", nome: "Corporate, M&A e R&S" },
  { slug: "difesa-dual-use", nome: "Difesa e dual-use" },
  { slug: "spazio-osservazione-terra", nome: "Spazio e osservazione della Terra" },
];

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
