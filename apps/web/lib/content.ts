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
  { slug: "lingue-aree", nome: "Lingue e aree" },
  { slug: "cartografia-infografica", nome: "Cartografia e infografica" },
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

export function getArticles(settoreSlug: string): Article[] {
  const dir = path.join(CONTENT_DIR, settoreSlug);
  if (!fs.existsSync(dir)) return [];

  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".mdx"));
  const articles = files.map((file) => {
    const raw = fs.readFileSync(path.join(dir, file), "utf8");
    const { data, content } = matter(raw);
    return {
      slug: file.replace(/\.mdx$/, ""),
      frontmatter: data as ArticleFrontmatter,
      content,
    };
  });

  return articles.sort((a, b) => (a.frontmatter.data < b.frontmatter.data ? 1 : -1));
}

export function getArticle(settoreSlug: string, slug: string): Article | null {
  const filePath = path.join(CONTENT_DIR, settoreSlug, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  return { slug, frontmatter: data as ArticleFrontmatter, content };
}

export function getAllArticles(): (Article & { settoreSlug: string })[] {
  return SETTORI.flatMap((s) => getArticles(s.slug).map((a) => ({ ...a, settoreSlug: s.slug }))).sort(
    (a, b) => (a.frontmatter.data < b.frontmatter.data ? 1 : -1)
  );
}
