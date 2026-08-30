import type { Metadata } from "next";
import Image from "next/image";
import "./globals.css";
import Nav from "@/components/Nav";

export const metadata: Metadata = {
  title: "Observatório do Exame de Suficiência",
  description:
    "Painel público com estatísticas do Exame de Suficiência do CFC: desempenho nacional, por UF, por IES e por área de conteúdo.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900">
        <Nav />
        <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8">
          {children}
        </main>
        <footer className="border-t border-slate-200 bg-white py-8">
          <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-4">
            <Image
              src="/parceiros-institucionais.jpg"
              alt="UNITINS, Pibiex, Governo do Tocantins, CRC-TO, Atoccon e Objetivos de Desenvolvimento Sustentável 4, 8 e 10"
              width={1366}
              height={780}
              className="h-auto w-full max-w-3xl"
            />
            <p className="text-center text-xs text-slate-400">
              Dados públicos do Exame de Suficiência (CFC). Atualizado
              automaticamente a partir da planilha de origem.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
