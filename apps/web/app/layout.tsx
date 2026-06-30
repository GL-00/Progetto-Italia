import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import "./globals.css";
import { SETTORI } from "@/lib/content";

export const metadata: Metadata = {
  title: "Progetto Italia",
  description: "Analisi economico-industriale dell'ecosistema italiano",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="it">
      <body className="min-h-screen bg-white text-slate-900">
        <header className="border-b border-slate-200">
          <div className="mx-auto max-w-5xl px-4 py-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <Link href="/" className="font-semibold text-lg">
              Progetto Italia
            </Link>
            <nav className="flex flex-wrap gap-x-4 gap-y-1 text-sm">
              {SETTORI.map((s) => (
                <Link key={s.slug} href={`/${s.slug}`} className="text-slate-600 hover:text-slate-900 hover:underline">
                  {s.nome}
                </Link>
              ))}
            </nav>
          </div>
        </header>
        <main className="mx-auto max-w-5xl px-4 py-10">{children}</main>
        <footer className="border-t border-slate-200 mt-16">
          <div className="mx-auto max-w-5xl px-4 py-6 text-sm text-slate-500">
            Analisi basate solo su fonti autorevoli e certificate.
          </div>
        </footer>
      </body>
    </html>
  );
}
