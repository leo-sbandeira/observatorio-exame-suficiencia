import { NextResponse } from "next/server";
import { buscarLinhasEstatisticas, tresMaisFrequentes } from "@/lib/estatisticas";

function calcularEstatisticas(
  linhas: Array<{ percentual: string; edicoes: string; conteudos: string }>
) {
  const percentuais = linhas
    .map((l) => parseFloat(l.percentual.replace(",", ".")))
    .filter((n) => !Number.isNaN(n));

  const media = percentuais.length
    ? percentuais.reduce((a, b) => a + b, 0) / percentuais.length
    : null;

  const maior = percentuais.length ? Math.max(...percentuais) : null;
  const menor = percentuais.length ? Math.min(...percentuais) : null;

  const edicoes = tresMaisFrequentes(linhas.map((l) => l.edicoes));
  const conteudos = tresMaisFrequentes(linhas.map((l) => l.conteudos));

  return {
    total: linhas.length,
    media,
    maior,
    menor,
    edicoes: edicoes.map((e) => `${e.valor} (${e.contagem})`),
    conteudos: conteudos.map((c) => `${c.valor} (${c.contagem})`),
  };
}

export async function GET() {
  const linhas = await buscarLinhasEstatisticas();
  const concluidos = linhas.filter((l) => l.pagina === "simulado" && l.evento === "fim");

  const oficiais = concluidos.filter((l) => l.modo === "oficial");
  const personalizados = concluidos.filter((l) => l.modo === "personalizado");

  const statsOficiais = calcularEstatisticas(oficiais);
  const statsPersonalizados = calcularEstatisticas(personalizados);

  return NextResponse.json({
    simuladosOficiais: {
      total: statsOficiais.total,
      media: statsOficiais.media,
      maior: statsOficiais.maior,
      menor: statsOficiais.menor,
    },
    simuladosPersonalizados: {
      total: statsPersonalizados.total,
      media: statsPersonalizados.media,
      maior: statsPersonalizados.maior,
      menor: statsPersonalizados.menor,
      edicoes: statsPersonalizados.edicoes,
      conteudos: statsPersonalizados.conteudos,
    },
  });
}
