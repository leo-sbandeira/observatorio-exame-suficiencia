import Papa from "papaparse";
import { SHEET_ID, GIDS, AbaKey, REVALIDATE_SECONDS } from "./config";

/**
 * Converte um número no formato brasileiro ("30,86%", "1.234", "17,93")
 * para um float em JS. Retorna null se não for possível converter.
 */
export function parseNumeroBR(valor: unknown): number | null {
  if (valor === null || valor === undefined) return null;
  let s = String(valor).trim();
  if (s === "") return null;
  const isPercent = s.includes("%");
  s = s.replace("%", "").trim();
  // remove separador de milhar (ponto) e troca vírgula decimal por ponto
  s = s.replace(/\.(?=\d{3}(\D|$))/g, "").replace(",", ".");
  const n = parseFloat(s);
  if (Number.isNaN(n)) return null;
  return isPercent ? n / 100 : n;
}

async function fetchCsvRaw(gid: string): Promise<string> {
  if (!SHEET_ID || !gid) {
    throw new Error(
      "SHEET_ID ou GID não configurados. Confira o arquivo .env.local (veja README.md)."
    );
  }
  const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv&gid=${gid}`;
  const res = await fetch(url, { next: { revalidate: REVALIDATE_SECONDS } });
  if (!res.ok) {
    throw new Error(
      `Não foi possível ler a planilha (status ${res.status}). Verifique se o compartilhamento está como "Qualquer pessoa com o link - Leitor".`
    );
  }
  return res.text();
}

export async function fetchAba<T = Record<string, string>>(
  aba: AbaKey
): Promise<T[]> {
  const gid = GIDS[aba];
  const csvText = await fetchCsvRaw(gid);
  const parsed = Papa.parse<T>(csvText, {
    header: true,
    skipEmptyLines: true,
  });
  return parsed.data.filter(Boolean);
}
