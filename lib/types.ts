import { parseNumeroBR } from "./csv";

export interface RegistroGeral {
  edicao: string;
  regiao: string; // "BR" ou sigla da UF
  inscritos: number | null;
  presentes: number | null;
  aprovados: number | null;
  pctAprovados: number | null;
  reprovados: number | null;
  pctReprovados: number | null;
  ausentes: number | null;
  pctAusentes: number | null;
}

export function normalizaGeral(raw: Record<string, string>): RegistroGeral {
  return {
    edicao: (raw["Edição"] ?? "").trim(),
    regiao: (raw["Região"] ?? "").trim(),
    inscritos: parseNumeroBR(raw["Inscritos"]),
    presentes: parseNumeroBR(raw["Presentes"]),
    aprovados: parseNumeroBR(raw["Aprovados"]),
    pctAprovados: parseNumeroBR(raw["(%) Aprovados"]),
    reprovados: parseNumeroBR(raw["Reprovados"]),
    pctReprovados: parseNumeroBR(raw["(%) Reprovados"]),
    ausentes: parseNumeroBR(raw["Ausentes"]),
    pctAusentes: parseNumeroBR(raw["(%) Ausentes"]),
  };
}

export interface RegistroIES {
  edicao: string;
  ies: string;
  sigla: string;
  uf: string;
  cidade: string;
  modalidade: string;
  inscritos: number | null;
  presentes: number | null;
  aprovados: number | null;
  pctAprovadosPresentes: number | null;
  reprovados: number | null;
  pctReprovadosPresentes: number | null;
  ausentes: number | null;
  pctAusentesInscritos: number | null;
}

export function normalizaIES(raw: Record<string, string>): RegistroIES {
  return {
    edicao: (raw["Edição"] ?? "").trim(),
    ies: (raw["IES"] ?? "").trim(),
    sigla: (raw["Sigla"] ?? "").trim(),
    uf: (raw["UF"] ?? "").trim(),
    cidade: (raw["Cidade"] ?? "").trim(),
    modalidade: (raw["Modalidade"] ?? "").trim(),
    inscritos: parseNumeroBR(raw["Inscritos"]),
    presentes: parseNumeroBR(raw["Presentes"]),
    aprovados: parseNumeroBR(raw["Aprovados"]),
    pctAprovadosPresentes: parseNumeroBR(raw["% Aprovados/Presentes"]),
    reprovados: parseNumeroBR(raw["Reprovados"]),
    pctReprovadosPresentes: parseNumeroBR(raw["% Reprovados/Presentes"]),
    ausentes: parseNumeroBR(raw["Ausentes"]),
    pctAusentesInscritos: parseNumeroBR(raw["% Ausentes/Inscritos"]),
  };
}

export interface RegistroConteudoStats {
  edicao: string;
  regiao: string; // "Brasil", "Norte", "Nordeste", "Centro-oeste", "Sudeste", "Sul"
  conteudo: string;
  totalQuestoes: number | null;
  totalRespostas: number | null;
  totalAcertos: number | null;
  pctAcertos: number | null;
  totalErros: number | null;
  pctErros: number | null;
}

export function normalizaConteudoStats(
  raw: Record<string, string>
): RegistroConteudoStats {
  return {
    edicao: (raw["Edição"] ?? "").trim(),
    regiao: (raw["Região"] ?? "").trim(),
    conteudo: (raw["Conteúdo"] ?? "").trim(),
    totalQuestoes: parseNumeroBR(raw["Total de Questões"]),
    totalRespostas: parseNumeroBR(raw["Total de Respostas"]),
    totalAcertos: parseNumeroBR(raw["Total de Acertos"]),
    pctAcertos: parseNumeroBR(raw["(%) Acertos"]),
    totalErros: parseNumeroBR(raw["Total de Erros"]),
    pctErros: parseNumeroBR(raw["(%) Erros"]),
  };
}

export interface RegistroConteudoCobrado {
  edicao: string;
  banca: string;
  questao: string;
  conteudo: string;
  assunto: string;
  tema: string;
}

export function normalizaConteudoCobrado(
  raw: Record<string, string>
): RegistroConteudoCobrado {
  return {
    edicao: (raw["Edição"] ?? "").trim(),
    banca: (raw["Banca"] ?? "").trim(),
    questao: (raw["Questão"] ?? "").trim(),
    conteudo: (raw["Conteúdo"] ?? "").trim(),
    assunto: (raw["Assunto"] ?? "").trim(),
    tema: (raw["Tema"] ?? "").trim(),
  };
}

export interface RegistroConteudoNacional {
  edicao: string;
  conteudo: string;
  totalQuestoes: number | null;
  totalRespostas: number | null;
  totalAcertos: number | null;
  pctAcertos: number | null;
  totalErros: number | null;
  pctErros: number | null;
}

export function normalizaConteudoNacional(
  raw: Record<string, string>
): RegistroConteudoNacional {
  return {
    edicao: (raw["Edição"] ?? "").trim(),
    conteudo: (raw["Conteúdo"] ?? "").trim(),
    totalQuestoes: parseNumeroBR(raw["Total de Questões"]),
    totalRespostas: parseNumeroBR(raw["Total de Respostas"]),
    totalAcertos: parseNumeroBR(raw["Total de Acertos"]),
    pctAcertos: parseNumeroBR(raw["(%) Acertos"]),
    totalErros: parseNumeroBR(raw["Total de Erros"]),
    pctErros: parseNumeroBR(raw["(%) Erros"]),
  };
}
