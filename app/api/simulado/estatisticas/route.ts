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

  return NextResponse.json({
    totalSimulados: concluidos.length,
    mediaAcertos,
    edicaoMaisFeita: maisFrequente(concluidos.map((l) => l.edicoes)),
    bancaMaisFeita: maisFrequente(concluidos.map((l) => l.bancas)),
    conteudoMaisFeito: maisFrequente(concluidos.map((l) => l.conteudos)),
  });
}
