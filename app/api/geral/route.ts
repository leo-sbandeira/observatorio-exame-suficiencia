import { NextRequest, NextResponse } from "next/server";
import { fetchAba } from "@/lib/csv";
import { normalizaGeral } from "@/lib/types";

export async function GET(req: NextRequest) {
  try {
    const raw = await fetchAba("geral");
    const dados = raw.map(normalizaGeral).filter((d) => d.edicao);

    const regioesDisponiveis = Array.from(
      new Set(dados.map((d) => d.regiao))
    ).sort((a, b) => (a === "BR" ? -1 : b === "BR" ? 1 : a.localeCompare(b)));
    const edicoesDisponiveis = Array.from(
      new Set(dados.map((d) => d.edicao))
    ).sort();

    // Retorna o dataset completo (é pequeno, ~800 linhas) e deixa os
    // filtros/cálculos de variação por edição anterior no front-end,
    // que precisa da série cronológica completa por região.
    return NextResponse.json({
      total: dados.length,
      dados,
      filtrosDisponiveis: {
        regioes: regioesDisponiveis,
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
