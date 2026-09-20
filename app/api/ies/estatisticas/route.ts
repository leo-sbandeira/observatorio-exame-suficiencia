import { NextResponse } from "next/server";
import { buscarLinhasEstatisticas, tresMaisFrequentes } from "@/lib/estatisticas";

export async function GET() {
  const linhas = await buscarLinhasEstatisticas();
  const doIes = linhas.filter((l) => l.pagina === "ies");
  const buscas = doIes.filter((l) => l.evento === "busca");
  const exportacoes = doIes.filter((l) => l.evento === "exportacao");

  const edicoes = tresMaisFrequentes(buscas.map((l) => l.edicoes));
  const ies = tresMaisFrequentes(buscas.map((l) => l.ies));
  const ufs = tresMaisFrequentes(buscas.map((l) => l.uf));

  return NextResponse.json({
    totalAcessos: buscas.length,
    totalExportacoes: exportacoes.length,
    edicoesMaisBuscadas: edicoes.map((e) => `${e.valor} (${e.contagem})`),
    iesMaisBuscadas: ies.map((i) => `${i.valor} (${i.contagem})`),
    ufsMaisBuscadas: ufs.map((u) => `${u.valor} (${u.contagem})`),
  });
}
