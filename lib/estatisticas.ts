import Papa from "papaparse";

const REVALIDATE_SEGUNDOS = 300; // 5 minutos

export interface LinhaEstatistica {
  pagina: string;
  evento: string;
  modo: string;
  edicoes: string;
  bancas: string;
  conteudos: string;
  ies: string;
  uf: string;
  formato: string;
  percentual: string;
}

export async function buscarLinhasEstatisticas(): Promise<LinhaEstatistica[]> {
  const sheetId = process.env.SIMULADO_STATS_SHEET_ID;
  const gid = process.env.SIMULADO_STATS_GID ?? "0";
  if (!sheetId) return [];

  try {
    const url = `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=csv&gid=${gid}`;
    const res = await fetch(url, { next: { revalidate: REVALIDATE_SEGUNDOS } });
    if (!res.ok) return [];
    const texto = await res.text();
    const parsed = Papa.parse<Record<string, string>>(texto, {
      header: true,
      skipEmptyLines: true,
    });
    return parsed.data.map((r) => ({
      pagina: (r["Pagina"] ?? r["Página"] ?? "").trim(),
      evento: (r["Evento"] ?? "").trim(),
      modo: (r["Modo"] ?? "").trim(),
      edicoes: (r["Edicoes"] ?? r["Edições"] ?? "").trim(),
      bancas: (r["Bancas"] ?? "").trim(),
      conteudos: (r["Conteudos"] ?? r["Conteúdos"] ?? "").trim(),
      ies: (r["IES"] ?? "").trim(),
      uf: (r["UF"] ?? "").trim(),
      formato: (r["Formato"] ?? "").trim(),
      percentual: (r["Percentual"] ?? "").trim(),
    }));
  } catch {
    return [];
  }
}

export interface MaisFrequenteResultado {
  valor: string;
  contagem: number;
}

/** Dado um array de strings (cada uma podendo conter vários valores
 * separados por vírgula), retorna o valor individual mais frequente, com
 * quantas vezes ele apareceu. */
export function maisFrequente(linhas: string[]): MaisFrequenteResultado | null {
  const contagem = new Map<string, number>();
  for (const linha of linhas) {
    for (const v of linha.split(",").map((x) => x.trim()).filter(Boolean)) {
      contagem.set(v, (contagem.get(v) ?? 0) + 1);
    }
  }
  let melhorValor: string | null = null;
  let melhorContagem = 0;
  for (const [valor, c] of contagem.entries()) {
    if (c > melhorContagem) {
      melhorValor = valor;
      melhorContagem = c;
    }
  }
  return melhorValor ? { valor: melhorValor, contagem: melhorContagem } : null;
}
