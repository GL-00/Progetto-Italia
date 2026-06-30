import type { ComponentPropsWithoutRef } from "react";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { SETTORI, getArticle, getArticles, getSettore } from "@/lib/content";

export function generateStaticParams() {
  return SETTORI.flatMap((s) => getArticles(s.slug).map((a) => ({ settore: s.slug, slug: a.slug })));
}

const mdxComponents = {
  h2: (props: ComponentPropsWithoutRef<"h2">) => (
    <h2 className="text-xl font-semibold mt-8 mb-3" {...props} />
  ),
  h3: (props: ComponentPropsWithoutRef<"h3">) => (
    <h3 className="text-lg font-semibold mt-6 mb-2" {...props} />
  ),
  p: (props: ComponentPropsWithoutRef<"p">) => (
    <p className="text-slate-700 leading-relaxed mb-4" {...props} />
  ),
  ul: (props: ComponentPropsWithoutRef<"ul">) => (
    <ul className="list-disc pl-5 mb-4 space-y-1 text-slate-700" {...props} />
  ),
  ol: (props: ComponentPropsWithoutRef<"ol">) => (
    <ol className="list-decimal pl-5 mb-4 space-y-1 text-slate-700" {...props} />
  ),
  a: (props: ComponentPropsWithoutRef<"a">) => (
    <a className="text-blue-700 hover:underline" {...props} />
  ),
};

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ settore: string; slug: string }>;
}) {
  const { settore: settoreSlug, slug } = await params;
  const settore = getSettore(settoreSlug);
  const article = settore ? getArticle(settoreSlug, slug) : null;
  if (!settore || !article) notFound();

  const { frontmatter, content } = article;

  return (
    <article>
      <header className="mb-8 border-b border-slate-200 pb-6">
        <p className="text-sm text-slate-500">{settore.nome}</p>
        <h1 className="text-3xl font-bold mt-1">{frontmatter.title}</h1>
        <p className="text-sm text-slate-500 mt-2">{frontmatter.data}</p>
        {frontmatter.tags && frontmatter.tags.length > 0 && (
          <div className="flex gap-2 mt-3">
            {frontmatter.tags.map((tag) => (
              <span key={tag} className="text-xs bg-slate-100 rounded px-2 py-1 text-slate-600">
                {tag}
              </span>
            ))}
          </div>
        )}
      </header>

      <div>
        <MDXRemote source={content} components={mdxComponents} />
      </div>

      {frontmatter.fonti && frontmatter.fonti.length > 0 && (
        <footer className="mt-12 border-t border-slate-200 pt-6">
          <h2 className="text-lg font-semibold mb-3">Fonti</h2>
          <ul className="list-disc pl-5 text-sm text-slate-600 space-y-1">
            {frontmatter.fonti.map((fonte) => (
              <li key={fonte}>{fonte}</li>
            ))}
          </ul>
        </footer>
      )}
    </article>
  );
}
