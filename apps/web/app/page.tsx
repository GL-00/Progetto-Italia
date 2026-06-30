import Link from "next/link";
import { SETTORI, getAllArticles } from "@/lib/content";

export default function HomePage() {
  const ultimeAnalisi = getAllArticles().slice(0, 5);

  return (
    <div className="space-y-14">
      <section>
        <h1 className="text-3xl font-bold mb-3">Progetto Italia</h1>
        <p className="text-slate-600 max-w-2xl leading-relaxed">
          Analisi economico-industriale dell&apos;ecosistema italiano, basata solo su
          fonti autorevoli e certificate e su pubblicazioni scientifiche.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">Aree tematiche</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {SETTORI.map((s) => (
            <Link
              key={s.slug}
              href={`/${s.slug}`}
              className="block rounded-lg border border-slate-200 p-4 hover:border-slate-400 transition-colors"
            >
              {s.nome}
            </Link>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">Ultime analisi</h2>
        {ultimeAnalisi.length === 0 ? (
          <p className="text-slate-500">Nessuna analisi pubblicata ancora.</p>
        ) : (
          <ul className="space-y-5">
            {ultimeAnalisi.map((a) => (
              <li key={`${a.settoreSlug}/${a.slug}`}>
                <Link href={`/${a.settoreSlug}/${a.slug}`} className="font-medium hover:underline">
                  {a.frontmatter.title}
                </Link>
                <p className="text-sm text-slate-500">{a.frontmatter.sintesi}</p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
