import { NextRequest, NextResponse } from "next/server";
import { fetchAba } from "@/lib/csv";
import { normalizaIES, RegistroIES } from "@/lib/types";

type OrdenavelPor = keyof Pick<
  RegistroIES,
  | "edicao"
  | "ies"
  | "uf"
  | "inscritos"
  | "presentes"
  | "aprovados"
  | "pctAprovadosPresentes"
>;

export async function GET(req: NextRequest) {
  try {
    const raw = await fetchAba("ies");
    let dados = raw
      .map(normalizaIES)
      .filter((d) => d.ies && d.ies.toLowerCase() !== "total");

    const { searchParams } = new URL(req.url);
    const edicao = searchParams.get("edicao");
    const uf = searchParams.get("uf");
    const modalidade = searchParams.get("modalidade");
    const instituicoes = searchParams.get("instituicoes")?.split(",").filter(Boolean);
    const ordenarPor = (searchParams.get("ordenarPor") ??
      "pctAprovadosPresentes") as OrdenavelPor;
    const ordem = searchParams.get("ordem") === "asc" ? "asc" : "desc";
    const pagina = Math.max(1, parseInt(searchParams.get("pagina") ?? "1", 10));
    const porPagina = Math.min(
      200,
      Math.max(1, parseInt(searchParams.get("porPagina") ?? "25", 10))
    );

    if (edicao) dados = dados.filter((d) => d.edicao === edicao);
    if (uf) dados = dados.filter((d) => d.uf === uf);
    if (modalidade) dados = dados.filter((d) => d.modalidade === modalidade);
    if (instituicoes?.length) dados = dados.filter((d) => instituicoes.includes(d.ies));

    dados.sort((a, b) => {
      const va = a[ordenarPor];
      const vb = b[ordenarPor];
      if (va === null || va === undefined) return 1;
      if (vb === null || vb === undefined) return -1;
      if (typeof va === "number" && typeof vb === "number") {
        return ordem === "asc" ? va - vb : vb - va;
      }
      return ordem === "asc"
        ? String(va).localeCompare(String(vb))
        : String(vb).localeCompare(String(va));
    });

    const total = dados.length;
    const exportarTudo = searchParams.get("exportar") === "true";
    const LIMITE_EXPORTACAO = 20000;
    const inicio = (pagina - 1) * porPagina;
    const pageData = exportarTudo
      ? dados.slice(0, LIMITE_EXPORTACAO)
      : dados.slice(inicio, inicio + porPagina);

    // Listas úteis para popular filtros no front-end
    const edicoesDisponiveis = Array.from(
      new Set(raw.map((r) => (r["Edição"] ?? "").trim()).filter(Boolean))
    ).sort();
    const ufsDisponiveis = Array.from(
      new Set(raw.map((r) => (r["UF"] ?? "").trim()).filter(Boolean))
    ).sort();
    const modalidadesDisponiveis = Array.from(
      new Set(raw.map((r) => (r["Modalidade"] ?? "").trim()).filter(Boolean))
    ).sort();
    const instituicoesMapa = new Map<string, string>();
    for (const r of raw) {
      const nome = (r["IES"] ?? "").trim();
      if (!nome || nome.toLowerCase() === "total") continue;
      if (!instituicoesMapa.has(nome)) {
        instituicoesMapa.set(nome, (r["Sigla"] ?? "").trim());
      }
    }
    const instituicoesDisponiveis = Array.from(instituicoesMapa.entries())
      .map(([nome, sigla]) => ({ nome, sigla }))
      .sort((a, b) => a.nome.localeCompare(b.nome));

    return NextResponse.json({
      total,
      pagina,
      porPagina,
      dados: pageData,
      filtrosDisponiveis: {
        edicoes: edicoesDisponiveis,
        ufs: ufsDisponiveis,
        modalidades: modalidadesDisponiveis,
        instituicoes: instituicoesDisponiveis,
      },
    });
  } catch (err) {
    return NextResponse.json(
      { erro: err instanceof Error ? err.message : "Erro desconhecido" },
      { status: 500 }
    );
  }
}
