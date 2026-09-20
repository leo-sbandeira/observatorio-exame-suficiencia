import { NextResponse } from "next/server";
import { buscarLinhasEstatisticas, maisFrequente } from "@/lib/estatisticas";

export async function GET() {
  const linhas = await buscarLinhasEstatisticas();
  const doIes = linhas.filter((l) => l.pagina === "ies");
  const buscas = doIes.filter((l) => l.evento === "busca");
  const exportacoes = doIes.filter((l) => l.evento === "exportacao");

  return NextResponse.json({
    totalAcessos: buscas.length,
    totalExportacoes: exportacoes.length,
    edicaoMaisBuscada: maisFrequente(buscas.map((l) => l.edicoes))?.valor ?? null,
    iesMaisBuscada: maisFrequente(buscas.map((l) => l.ies))?.valor ?? null,
    ufMaisBuscada: maisFrequente(buscas.map((l) => l.uf))?.valor ?? null,
  });
}
