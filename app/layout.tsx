import type { Metadata } from "next";
import Image from "next/image";
import "./globals.css";
import Nav from "@/components/Nav";

export const metadata: Metadata = {
  title: "Observatório do Exame de Suficiência",
  description:
    "Painel público com estatísticas do Exame de Suficiência do CFC: desempenho nacional, por UF, por IES e por área de conteúdo.",
};

const FINANCIAMENTO = [
  { src: "/logos/unitins.png", alt: "UNITINS", w: 490, h: 194 },
  { src: "/logos/pibiex.png", alt: "Pibiex 2023", w: 409, h: 194 },
  { src: "/logos/tocantins-governo.png", alt: "Governo do Estado do Tocantins", w: 469, h: 194 },
];

const APOIO = [
  { src: "/logos/crcto.png", alt: "CRC-TO", w: 551, h: 184 },
  { src: "/logos/atoccon.png", alt: "Atoccon", w: 440, h: 207 },
];

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900">
        <Nav />
        <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8">
          {children}
        </main>
        <footer className="border-t border-slate-200 bg-white py-5">
          <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-4">
            <div className="flex flex-wrap items-start justify-center gap-x-10 gap-y-4">
              <div className="flex flex-col items-start gap-2">
                <span className="text-xs font-medium text-slate-400">Financiamento:</span>
                <div className="flex flex-wrap items-center gap-4">
                  {FINANCIAMENTO.map((logo) => (
                    <Image
                      key={logo.src}
                      src={logo.src}
                      alt={logo.alt}
                      width={logo.w}
                      height={logo.h}
                      className="h-9 w-auto"
                    />
                  ))}
                </div>
              </div>
              <div className="flex flex-col items-start gap-2">
                <span className="text-xs font-medium text-slate-400">Apoio:</span>
                <div className="flex flex-wrap items-center gap-4">
                  {APOIO.map((logo) => (
                    <Image
                      key={logo.src}
                      src={logo.src}
                      alt={logo.alt}
                      width={logo.w}
                      height={logo.h}
                      className="h-9 w-auto"
                    />
                  ))}
                </div>
              </div>
              <div className="flex flex-col items-start gap-2">
                <span className="text-xs font-medium text-slate-400">
                  Objetivos de Desenvolvimento Sustentável (ODS):
                </span>
                <Image
                  src="/logos/ods.png"
                  alt="ODS 4 - Educação de Qualidade, ODS 8 - Trabalho Decente e Crescimento Econômico, ODS 10 - Redução das Desigualdades"
                  width={717}
                  height={218}
                  className="h-10 w-auto"
                />
              </div>
            </div>
            <p className="text-center text-xs text-slate-400">
              Criação e atualização: Leonardo dos Santos Bandeira
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
