// Configuração da fonte de dados (Google Sheets publicado como CSV).
// Preencha o SHEET_ID e os GIDs de cada aba no arquivo .env.local
// (veja README.md para o passo a passo de como obter cada valor).

export const SHEET_ID = process.env.SHEET_ID ?? "";

export const GIDS = {
  geral: process.env.GID_GERAL ?? "",
  ies: process.env.GID_IES ?? "",
  conteudoStats: process.env.GID_CONTEUDO_STATS ?? "",
  conteudosCobrados: process.env.GID_CONTEUDOS_COBRADOS ?? "",
  conteudoNacional: process.env.GID_CONTEUDO_NACIONAL ?? "",
} as const;

export type AbaKey = keyof typeof GIDS;

// Tempo (em segundos) que cada aba fica em cache antes de buscar de novo na planilha.
export const REVALIDATE_SECONDS = 60 * 60; // 1 hora
