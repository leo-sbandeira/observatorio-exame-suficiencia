import { NextResponse } from "next/server";
import { buscarLinhasEstatisticas, maisFrequente } from "@/lib/estatisticas";

export async function GET() {
  const linhas = await buscarLinhasEstatisticas();
  const concluidos = linhas.filter((l) => l.pagina === "simulado" && l.evento === "fim");

  const percentuais = concluidos
    .map((l) => parseFloat(l.percentual.replace(",", ".")))
    .filter((n) => !Number.isNaN(n));
  const mediaAcertos = percentuais.length
    ? percentuais.reduce((a, b) => a + b, 0) / percentuais.length
    : null;

  const edicao = maisFrequente(concluidos.map((l) => l.edicoes));
  const banca = maisFrequente(concluidos.map((l) => l.bancas));
  const conteudo = maisFrequente(concluidos.map((l) => l.conteudos));

  return NextResponse.json({
    totalSimulados: concluidos.length,
    mediaAcertos,
    edicaoMaisFeita: edicao?.valor ?? null,
    edicaoMaisFeitaContagem: edicao?.contagem ?? 0,
    bancaMaisFeita: banca?.valor ?? null,
    bancaMaisFeitaContagem: banca?.contagem ?? 0,
    conteudoMaisFeito: conteudo?.valor ?? null,
    conteudoMaisFeitoContagem: conteudo?.contagem ?? 0,
  });
}
