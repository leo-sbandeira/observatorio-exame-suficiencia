import Link from "next/link";

const links = [
  { href: "/sobre", label: "Sobre" },
  { href: "/", label: "Visão Geral" },
  { href: "/ies", label: "Por IES" },
  { href: "/conteudos", label: "Conteúdos" },
];

export default function Nav() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" className="text-lg font-bold text-slate-900">
          Observatório do Exame de Suficiência
        </Link>
        <nav className="flex gap-1">
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
