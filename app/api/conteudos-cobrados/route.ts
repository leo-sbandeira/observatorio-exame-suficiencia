import { NextRequest, NextResponse } from "next/server";
import { fetchAba } from "@/lib/csv";
import {
  normalizaConteudoCobrado,
  normalizaConteudoNacional,
} from "@/lib/types";

export async function GET(req: NextRequest) {
  try {
    const raw = await fetchAba("conteudosCobrados");
    let dados = raw.map(normalizaConteudoCobrado).filter((d) => d.edicao);

    const { searchParams } = new URL(req.url);
    const bancas = searchParams.get("bancas")?.split(",").filter(Boolean);
    const edicoes = searchParams.get("edicoes")?.split(",").filter(Boolean);
    const conteudo = searchParams.get("conteudo");
    const agregarPor = (searchParams.get("agregarPor") ?? "conteudo") as
      | "conteudo"
      | "assunto"
      | "tema";

    const bancasDisponiveis = Array.from(
      new Set(raw.map((r) => (r["Banca"] ?? "").trim()).filter(Boolean))
    ).sort();
    const edicoesDisponiveis = Array.from(
      new Set(raw.map((r) => (r["Edição"] ?? "").trim()).filter(Boolean))
    ).sort();
    const conteudosDisponiveis = Array.from(
      new Set(raw.map((r) => (r["Conteúdo"] ?? "").trim()).filter(Boolean))
    ).sort();

    if (edicoes?.length) dados = dados.filter((d) => edicoes.includes(d.edicao));
    if (conteudo) dados = dados.filter((d) => d.conteudo === conteudo);
    const bancasConsideradas = bancas?.length ? bancas : bancasDisponiveis;
    dados = dados.filter((d) => bancasConsideradas.includes(d.banca));

    const contagem = new Map<
      string,
      { total: number; porBanca: Record<string, number> }
    >();
    for (const d of dados) {
      const chave = d[agregarPor];
      if (!chave) continue;
      const atual = contagem.get(chave) ?? { total: 0, porBanca: {} };
      atual.total += 1;
      atual.porBanca[d.banca] = (atual.porBanca[d.banca] ?? 0) + 1;
      contagem.set(chave, atual);
    }

    // Se agregando por Conteúdo, cruza com a Aba 5 (% de acertos nacional
    // por conteúdo e edição) para enriquecer o ranking de frequência com
    // o desempenho dos candidatos naquela área.
    let pctAcertosPorConteudo: Record<string, number | null> = {};
    if (agregarPor === "conteudo") {
      try {
        const rawNacional = await fetchAba("conteudoNacional");
        let statsNacional = rawNacional
          .map(normalizaConteudoNacional)
          .filter((d) => d.edicao);
        if (edicoes?.length)
          statsNacional = statsNacional.filter((d) =>
            edicoes.includes(d.edicao)
          );
        const soma = new Map<string, { soma: number; n: number }>();
        for (const d of statsNacional) {
          if (d.pctAcertos === null) continue;
          const atual = soma.get(d.conteudo) ?? { soma: 0, n: 0 };
          atual.soma += d.pctAcertos;
          atual.n += 1;
          soma.set(d.conteudo, atual);
        }
        pctAcertosPorConteudo = Object.fromEntries(
          Array.from(soma.entries()).map(([k, { soma, n }]) => [
            k,
            soma / n,
          ])
        );
      } catch {
        // Se a Aba 5 não estiver configurada, apenas segue sem o cruzamento.
        pctAcertosPorConteudo = {};
      }
    }

    const ranking = Array.from(contagem.entries())
      .map(([nome, { total, porBanca }]) => ({
        nome,
        quantidade: total,
        porBanca,
        pctAcertos:
          agregarPor === "conteudo"
            ? pctAcertosPorConteudo[nome] ?? null
            : null,
      }))
      .sort((a, b) => b.quantidade - a.quantidade);

    return NextResponse.json({
      total: dados.length,
      ranking,
      bancasConsideradas,
      filtrosDisponiveis: {
        bancas: bancasDisponiveis,
        edicoes: edicoesDisponiveis,
        conteudos: conteudosDisponiveis,
      },
    });
  } catch (err) {
    return NextResponse.json(
      { erro: err instanceof Error ? err.message : "Erro desconhecido" },
      { status: 500 }
    );
  }
}
