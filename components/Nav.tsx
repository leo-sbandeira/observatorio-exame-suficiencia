import Link from "next/link";
import Image from "next/image";

const links = [
  { href: "/sobre", label: "Sobre" },
  { href: "/", label: "Dados Gerais" },
  { href: "/ies", label: "Dados por Instituição" },
  { href: "/conteudos", label: "Conteúdos" },
  { href: "/simulado", label: "Simulado" },
];

export default function Nav() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-4">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/logo-icone.png"
            alt="Observatório do Exame de Suficiência"
            width={633}
            height={723}
            className="h-10 w-auto md:h-12"
            priority
          />
          <span className="text-xl font-bold tracking-tight text-slate-900 md:text-2xl">
            Observatório do Exame de Suficiência
          </span>
        </Link>
        <nav className="flex flex-wrap gap-1">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="rounded-md px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900"
            >
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
