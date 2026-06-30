import { notFound } from "next/navigation";
import Link from "next/link";
import { SETTORI, getArticles, getSettore } from "@/lib/content";

export function generateStaticParams() {
  return SETTORI.map((s) => ({ settore: s.slug }));
}

export default async function SettorePage({
  params,
}: {
  params: Promise<{ settore: string }>;
}) {
  const { settore: settoreSlug } = await params;
  const settore = getSettore(settoreSlug);
  if (!settore) notFound();

  const articles = getArticles(settoreSlug);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">{settore.nome}</h1>
      {articles.length === 0 ? (
        <p className="text-slate-500">
          Nessuna analisi qui ancora. Aggiungi un file in{" "}
          <code className="text-sm bg-slate-100 rounded px-1.5 py-0.5">content/{settoreSlug}/</code>{" "}
          seguendo il template nelle linee guida editoriali.
        </p>
      ) : (
        <ul className="space-y-6">
          {articles.map((a) => (
            <li key={a.slug}>
              <Link href={`/${settoreSlug}/${a.slug}`} className="text-lg font-medium hover:underline">
                {a.frontmatter.title}
              </Link>
              <p className="text-sm text-slate-500">{a.frontmatter.data}</p>
              <p className="text-slate-700">{a.frontmatter.sintesi}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
