import banco from "./data/banco-questoes.json";

export interface QuestaoSimulado {
  id: number;
  edicao: string;
  banca: string;
  questao: number;
  enunciado: string;
  alternativas: Record<"A" | "B" | "C" | "D", string>;
  correta: "A" | "B" | "C" | "D";
  conteudo: string;
  assunto: string;
  tema: string;
}

export const BANCO_QUESTOES = banco as QuestaoSimulado[];

// Distribuição oficial do simulado de 50 questões, por área de conteúdo,
// espelhando a matriz de referência do Exame de Suficiência.
export const DISTRIBUICAO_OFICIAL: Record<string, number> = {
  "Contabilidade Geral": 17,
  "Princípios de Contabilidade e Normas Brasileiras de Contabilidade": 5,
  "Contabilidade Gerencial": 4,
  "Teoria da Contabilidade": 4,
  "Contabilidade Aplicada ao Setor Público": 3,
  "Noções de Direito e Legislação Aplicada": 3,
  "Legislação e Ética Profissional": 3,
  "Contabilidade de Custos": 2,
  "Auditoria Contábil": 2,
  "Língua Portuguesa Aplicada": 2,
  "Matemática Financeira e Estatística": 2,
  "Perícia Contábil": 2,
  "Controladoria": 1,
};

export function embaralhar<T>(arr: T[]): T[] {
  const copia = [...arr];
  for (let i = copia.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copia[i], copia[j]] = [copia[j], copia[i]];
  }
  return copia;
}

export function listarBancas(): string[] {
  return Array.from(new Set(BANCO_QUESTOES.map((q) => q.banca))).sort();
}

export function listarEdicoes(): string[] {
  return Array.from(new Set(BANCO_QUESTOES.map((q) => q.edicao))).sort();
}

export function listarConteudos(): string[] {
  return Array.from(new Set(BANCO_QUESTOES.map((q) => q.conteudo))).sort();
}

export function listarAssuntos(conteudos: string[]): string[] {
  const pool = conteudos.length
    ? BANCO_QUESTOES.filter((q) => conteudos.includes(q.conteudo))
    : BANCO_QUESTOES;
  return Array.from(new Set(pool.map((q) => q.assunto))).sort();
}

/** Gera um simulado personalizado a partir dos filtros escolhidos. */
export function gerarSimuladoPersonalizado(opts: {
  bancas: string[];
  edicoes: string[];
  conteudos: string[];
  assuntos: string[];
  quantidade: number;
}): QuestaoSimulado[] {
  let pool = BANCO_QUESTOES;
  if (opts.bancas.length) pool = pool.filter((q) => opts.bancas.includes(q.banca));
  if (opts.edicoes.length) pool = pool.filter((q) => opts.edicoes.includes(q.edicao));
  if (opts.conteudos.length) pool = pool.filter((q) => opts.conteudos.includes(q.conteudo));
  if (opts.assuntos.length) pool = pool.filter((q) => opts.assuntos.includes(q.assunto));
  return embaralhar(pool).slice(0, Math.min(opts.quantidade, pool.length));
}

/** Gera o simulado oficial de 50 questões, respeitando a distribuição por conteúdo. */
export function gerarSimuladoOficial(): {
  questoes: QuestaoSimulado[];
  avisos: string[];
} {
  const avisos: string[] = [];
  const questoes: QuestaoSimulado[] = [];
  for (const [conteudo, quantidade] of Object.entries(DISTRIBUICAO_OFICIAL)) {
    const pool = BANCO_QUESTOES.filter((q) => q.conteudo === conteudo);
    if (pool.length < quantidade) {
      avisos.push(
        `Apenas ${pool.length} questões disponíveis para "${conteudo}" (necessário ${quantidade}).`
      );
    }
    questoes.push(...embaralhar(pool).slice(0, quantidade));
  }
  return { questoes: embaralhar(questoes), avisos };
}
