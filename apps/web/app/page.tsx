import Link from "next/link";
import { PROSPETTIVE, getAllArticles, getCopertura } from "@/lib/content";

export default function HomePage() {
  const copertura = getCopertura();
  const totale = copertura.reduce((acc, c) => acc + c.count, 0);
  const aree_avviate = copertura.filter((c) => c.count > 0).length;
  const recenti = getAllArticles().slice(0, 5);

  return (
    <div className="space-y-12">
      <section>
        <h1 className="text-2xl font-bold mb-1">Dashboard</h1>
        <p className="text-sm text-slate-500">
          {totale} {totale === 1 ? "analisi" : "analisi"} · {aree_avviate}/{copertura.length} aree avviate
        </p>
      </section>

      {recenti.length > 0 && (
        <section>
          <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500 mb-3">
            Scritte di recente
          </h2>
          <ul className="space-y-4">
            {recenti.map((a) => (
              <li key={`${a.settoreSlug}/${a.slug}`}>
                <Link href={`/${a.settoreSlug}/${a.slug}`} className="font-medium hover:underline">
                  {a.frontmatter.title}
                </Link>
                <p className="text-sm text-slate-500">
                  {a.frontmatter.data} · {a.frontmatter.sintesi}
                </p>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section>
        <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500 mb-3">
          Settori (dove si documenta per argomenti)
        </h2>
        <ul className="divide-y divide-slate-200 rounded-lg border border-slate-200">
          {copertura.map(({ settore, count, ultimaData }) => (
            <li key={settore.slug}>
              <Link
                href={`/${settore.slug}`}
                className="flex items-center justify-between gap-4 px-4 py-3 hover:bg-slate-50"
              >
                <span>{settore.nome}</span>
                <span className="shrink-0 text-sm text-slate-400">
                  {count > 0 ? `${count} · ${ultimaData}` : "da iniziare"}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500 mb-3">
          Prospettive di analisi (orizzontali)
        </h2>
        <p className="text-sm text-slate-500 mb-3">
          Si applicano trasversalmente ai settori sopra tramite i tag di
          un&apos;analisi — non hanno una cartella propria (vedi{" "}
          <code className="text-xs bg-slate-100 rounded px-1 py-0.5">docs/ARCHITETTURA.md</code>
          ).
        </p>
        <ul className="flex flex-wrap gap-2">
          {PROSPETTIVE.map((p) => (
            <li key={p} className="text-sm bg-slate-100 rounded px-2 py-1 text-slate-600">
              {p}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
