import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import "./globals.css";
import { SETTORI } from "@/lib/content";

export const metadata: Metadata = {
  title: "Progetto Italia",
  description: "Strumento personale per analisi economico-industriali",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="it">
      <body className="min-h-screen bg-white text-slate-900 sm:flex">
        <aside className="border-b border-slate-200 p-4 sm:w-60 sm:shrink-0 sm:border-b-0 sm:border-r sm:p-6">
          <Link href="/" className="font-semibold text-lg block">
            Progetto Italia
          </Link>
          <p className="text-xs text-slate-500 mt-1 mb-4 sm:mb-6">appunti di analisi personali</p>
          <nav className="flex flex-wrap gap-x-3 gap-y-1 text-sm sm:flex-col sm:gap-0 sm:space-y-1">
            {SETTORI.map((s) => (
              <Link
                key={s.slug}
                href={`/${s.slug}`}
                className="block rounded px-0 py-0.5 text-slate-600 hover:text-slate-900 sm:px-2 sm:py-1.5 sm:hover:bg-slate-100"
              >
                {s.nome}
              </Link>
            ))}
          </nav>
        </aside>
        <main className="min-w-0 flex-1 px-6 py-10 sm:px-10">
          <div className="max-w-3xl">{children}</div>
        </main>
      </body>
    </html>
  );
}
