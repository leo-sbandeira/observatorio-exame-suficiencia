import { NextRequest, NextResponse } from "next/server";
import { fetchAba } from "@/lib/csv";
import { normalizaConteudoStats } from "@/lib/types";

export async function GET(req: NextRequest) {
  try {
    const raw = await fetchAba("conteudoStats");
    let dados = raw.map(normalizaConteudoStats).filter((d) => d.edicao);

    const { searchParams } = new URL(req.url);
    const regioes = searchParams.get("regioes")?.split(",").filter(Boolean);
    const edicoes = searchParams.get("edicoes")?.split(",").filter(Boolean);

    if (regioes?.length) dados = dados.filter((d) => regioes.includes(d.regiao));
    if (edicoes?.length) dados = dados.filter((d) => edicoes.includes(d.edicao));

    const regioesDisponiveis = Array.from(
      new Set(raw.map((r) => (r["Região"] ?? "").trim()).filter(Boolean))
    ).sort();
    const conteudosDisponiveis = Array.from(
      new Set(raw.map((r) => (r["Conteúdo"] ?? "").trim()).filter(Boolean))
    ).sort();
    const edicoesDisponiveis = Array.from(
      new Set(raw.map((r) => (r["Edição"] ?? "").trim()).filter(Boolean))
    ).sort();

    return NextResponse.json({
      total: dados.length,
      dados,
      filtrosDisponiveis: {
        regioes: regioesDisponiveis,
        conteudos: conteudosDisponiveis,
        edicoes: edicoesDisponiveis,
      },
    });
  } catch (err) {
    return NextResponse.json(
      { erro: err instanceof Error ? err.message : "Erro desconhecido" },
      { status: 500 }
    );
  }
}
