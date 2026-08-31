"use client";

import { useMemo, useState } from "react";
import MultiSelect from "@/components/MultiSelect";
import {
  QuestaoSimulado,
  DISTRIBUICAO_OFICIAL,
  listarBancas,
  listarEdicoes,
  listarConteudos,
  listarAssuntos,
  gerarSimuladoPersonalizado,
  gerarSimuladoOficial,
} from "@/lib/simulado";

type Fase = "config" | "prova" | "resultado";
type Letra = "A" | "B" | "C" | "D";

function opcoes(lista: string[]) {
  return lista.map((v) => ({ value: v, label: v }));
}

export default function PaginaSimulado() {
  const [fase, setFase] = useState<Fase>("config");

  // Filtros do modo personalizado
  const [bancasFiltro, setBancasFiltro] = useState<string[]>([]);
  const [edicoesFiltro, setEdicoesFiltro] = useState<string[]>([]);
  const [conteudosFiltro, setConteudosFiltro] = useState<string[]>([]);
  const [assuntosFiltro, setAssuntosFiltro] = useState<string[]>([]);
  const [quantidade, setQuantidade] = useState(10);

  const [questoes, setQuestoes] = useState<QuestaoSimulado[]>([]);
  const [respostas, setRespostas] = useState<Record<number, Letra>>({});
  const [indiceAtual, setIndiceAtual] = useState(0);
  const [avisos, setAvisos] = useState<string[]>([]);

  const bancas = useMemo(() => listarBancas(), []);
  const edicoes = useMemo(() => listarEdicoes(), []);
  const conteudos = useMemo(() => listarConteudos(), []);
  const assuntos = useMemo(() => listarAssuntos(conteudosFiltro), [conteudosFiltro]);

  const poolDisponivel = useMemo(() => {
    return gerarSimuladoPersonalizado({
      bancas: bancasFiltro,
      edicoes: edicoesFiltro,
      conteudos: conteudosFiltro,
      assuntos: assuntosFiltro,
      quantidade: Number.MAX_SAFE_INTEGER,
    }).length;
  }, [bancasFiltro, edicoesFiltro, conteudosFiltro, assuntosFiltro]);

  function iniciarPersonalizado() {
    const geradas = gerarSimuladoPersonalizado({
      bancas: bancasFiltro,
      edicoes: edicoesFiltro,
      conteudos: conteudosFiltro,
      assuntos: assuntosFiltro,
      quantidade,
    });
    setQuestoes(geradas);
    setAvisos([]);
    setRespostas({});
    setIndiceAtual(0);
    setFase("prova");
    registrarInicio("personalizado");
  }

  function iniciarOficial() {
    const { questoes: geradas, avisos } = gerarSimuladoOficial();
    setQuestoes(geradas);
    setAvisos(avisos);
    setRespostas({});
    setIndiceAtual(0);
    setFase("prova");
    registrarInicio("oficial");
  }

  function responder(letra: Letra) {
    setRespostas((prev) => ({ ...prev, [questoes[indiceAtual].id]: letra }));
  }

  function finalizar() {
    setFase("resultado");
  }

  function refazer() {
    setFase("config");
    setQuestoes([]);
    setRespostas({});
  }

  function registrarInicio(modo: "oficial" | "personalizado") {
    // A localização (estado/cidade) é resolvida no servidor, a partir do IP
    // da requisição — nenhum dado é pedido ou coletado no navegador.
    fetch("/api/simulado/registro", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ modo }),
    }).catch(() => {});
  }

  // --- Tela de configuração ---
  if (fase === "config") {
    return (
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold">Simulado — Exame de Suficiência</h1>
          <p className="text-sm text-slate-500">
            Pratique com questões de provas anteriores da FGV (2024.1 a
            2026.1) e da Consuplan (2021.1 a 2023.2).
          </p>
        </div>

        <div className="rounded-xl border border-blue-200 bg-blue-50 p-5">
          <h2 className="font-semibold text-blue-900">Simulado oficial (50 questões)</h2>
          <p className="mt-1 text-sm text-blue-800">
            Gera um simulado completo considerando essa distribuição por área
            de conteúdo: Contabilidade Geral (17), Princípios de
            Contabilidade e NBCs (5), Contabilidade Gerencial (4), Teoria da
            Contabilidade (4), Contabilidade Aplicada ao Setor Público (3),
            Noções de Direito e Legislação Aplicada (3), Legislação e Ética
            Profissional (3), Contabilidade de Custos (2), Auditoria Contábil
            (2), Língua Portuguesa Aplicada (2), Matemática Financeira e
            Estatística (2), Perícia Contábil (2), Controladoria (1).
          </p>
          <button
            onClick={iniciarOficial}
            className="mt-4 rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
          >
            Gerar simulado oficial
          </button>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="font-semibold">Simulado personalizado</h2>
          <p className="mt-1 text-sm text-slate-500">
            Escolha os filtros e a quantidade de questões.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <MultiSelect
              titulo="Banca"
              opcoes={opcoes(bancas)}
              selecionados={bancasFiltro}
              onChange={setBancasFiltro}
            />
            <MultiSelect
              titulo="Edição"
              opcoes={opcoes(edicoes)}
              selecionados={edicoesFiltro}
              onChange={setEdicoesFiltro}
            />
            <MultiSelect
              titulo="Conteúdo"
              opcoes={opcoes(conteudos)}
              selecionados={conteudosFiltro}
              onChange={(v) => {
                setConteudosFiltro(v);
                setAssuntosFiltro([]);
              }}
            />
            <MultiSelect
              titulo="Assunto"
              opcoes={opcoes(assuntos)}
              selecionados={assuntosFiltro}
              onChange={setAssuntosFiltro}
            />
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <label className="flex items-center gap-2 text-sm text-slate-600">
              Quantidade de questões:
              <input
                type="number"
                min={1}
                max={Math.max(1, poolDisponivel)}
                value={quantidade}
                onChange={(e) => setQuantidade(Number(e.target.value))}
                className="w-20 rounded-md border border-slate-300 px-2 py-1"
              />
            </label>
            <span className="text-xs text-slate-400">
              {poolDisponivel} questões disponíveis com esses filtros
            </span>
          </div>
          <button
            onClick={iniciarPersonalizado}
            disabled={poolDisponivel === 0}
            className="mt-4 rounded-md bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800 disabled:opacity-40"
          >
            Gerar simulado personalizado
          </button>
        </div>
      </div>
    );
  }

  // --- Tela da prova ---
  if (fase === "prova") {
    const q = questoes[indiceAtual];
    const respondidas = Object.keys(respostas).length;
    return (
      <div className="space-y-6">
        {avisos.length > 0 && (
          <div className="rounded-lg border border-amber-200 bg-amber-50 p-3 text-xs text-amber-800">
            {avisos.map((a) => (
              <p key={a}>{a}</p>
            ))}
          </div>
        )}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-slate-500">
            Questão {indiceAtual + 1} de {questoes.length} — {respondidas} respondidas
          </p>
          <button
            onClick={finalizar}
            className="rounded-md bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700"
          >
            Finalizar simulado
          </button>
        </div>

        <div className="flex flex-wrap gap-1">
          {questoes.map((qq, i) => (
            <button
              key={qq.id}
              onClick={() => setIndiceAtual(i)}
              className={`h-8 w-8 rounded text-xs font-semibold ${
                i === indiceAtual
                  ? "bg-slate-900 text-white"
                  : respostas[qq.id]
                  ? "bg-blue-100 text-blue-700"
                  : "bg-slate-100 text-slate-500"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="mb-3 text-xs text-slate-400">
            {q.edicao} · {q.banca} · Questão {q.questao} · {q.conteudo}
          </p>
          <p className="whitespace-pre-line text-justify text-sm leading-normal text-slate-800">
            {q.enunciado}
          </p>
          <div className="mt-5 space-y-2">
            {(Object.entries(q.alternativas) as [Letra, string][]).map(([letra, texto]) => (
              <label
                key={letra}
                className={`flex cursor-pointer items-start gap-3 rounded-md border p-3 text-sm ${
                  respostas[q.id] === letra
                    ? "border-blue-500 bg-blue-50"
                    : "border-slate-200 hover:bg-slate-50"
                }`}
              >
                <input
                  type="radio"
                  name={`questao-${q.id}`}
                  checked={respostas[q.id] === letra}
                  onChange={() => responder(letra)}
                  className="mt-1"
                />
                <span>
                  <strong>({letra})</strong> {texto}
                </span>
              </label>
            ))}
          </div>
        </div>

        <div className="flex justify-between">
          <button
            onClick={() => setIndiceAtual((i) => Math.max(0, i - 1))}
            disabled={indiceAtual === 0}
            className="rounded-md border border-slate-300 px-4 py-2 text-sm disabled:opacity-40"
          >
            Anterior
          </button>
          <button
            onClick={() => setIndiceAtual((i) => Math.min(questoes.length - 1, i + 1))}
            disabled={indiceAtual === questoes.length - 1}
            className="rounded-md border border-slate-300 px-4 py-2 text-sm disabled:opacity-40"
          >
            Próxima
          </button>
        </div>
      </div>
    );
  }

  // --- Tela de resultado ---
  const total = questoes.length;
  const acertos = questoes.filter((q) => respostas[q.id] === q.correta).length;
  const erros = total - acertos;
  const pct = total ? (acertos / total) * 100 : 0;

  const porConteudo = new Map<string, { acertos: number; total: number }>();
  for (const q of questoes) {
    const atual = porConteudo.get(q.conteudo) ?? { acertos: 0, total: 0 };
    atual.total += 1;
    if (respostas[q.id] === q.correta) atual.acertos += 1;
    porConteudo.set(q.conteudo, atual);
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Resultado do Simulado</h1>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="rounded-xl border border-slate-200 bg-white p-5 text-center shadow-sm">
          <p className="text-sm text-slate-500">Acertos</p>
          <p className="text-3xl font-bold text-green-600">{acertos}</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-5 text-center shadow-sm">
          <p className="text-sm text-slate-500">Erros</p>
          <p className="text-3xl font-bold text-red-600">{erros}</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-5 text-center shadow-sm">
          <p className="text-sm text-slate-500">Aproveitamento</p>
          <p className="text-3xl font-bold text-slate-900">{pct.toFixed(1)}%</p>
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="mb-3 font-semibold">Desempenho por conteúdo</h2>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-200 text-left text-slate-500">
              <th className="py-2 pr-4">Conteúdo</th>
              <th className="py-2 pr-4">Acertos</th>
              <th className="py-2 pr-4">Total</th>
              <th className="py-2 pr-4">% Acerto</th>
            </tr>
          </thead>
          <tbody>
            {Array.from(porConteudo.entries())
              .sort((a, b) => b[1].total - a[1].total)
              .map(([conteudo, v]) => (
                <tr key={conteudo} className="border-b border-slate-100">
                  <td className="py-2 pr-4">{conteudo}</td>
                  <td className="py-2 pr-4">{v.acertos}</td>
                  <td className="py-2 pr-4">{v.total}</td>
                  <td className="py-2 pr-4 font-semibold">
                    {((v.acertos / v.total) * 100).toFixed(0)}%
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="mb-3 font-semibold">Revisão questão a questão</h2>
        <div className="max-h-[600px] space-y-4 overflow-y-auto">
          {questoes.map((q, i) => {
            const marcada = respostas[q.id];
            const certo = marcada === q.correta;
            return (
              <details
                key={q.id}
                className={`rounded-lg border p-3 ${
                  certo ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"
                }`}
              >
                <summary className="cursor-pointer text-sm font-medium">
                  Questão {i + 1} — {q.edicao} nº{q.questao} ({q.conteudo}) —{" "}
                  {certo ? "Certo" : marcada ? "Errado" : "Não respondida"}
                  {!certo && (
                    <span className="ml-1 text-slate-500">
                      (sua resposta: {marcada ?? "—"}, correta: {q.correta})
                    </span>
                  )}
                </summary>
                <div className="mt-3 text-sm">
                  <p className="whitespace-pre-line text-justify text-slate-700">{q.enunciado}</p>
                  <div className="mt-2 space-y-1">
                    {(Object.entries(q.alternativas) as [Letra, string][]).map(
                      ([letra, texto]) => (
                        <p
                          key={letra}
                          className={
                            letra === q.correta
                              ? "font-semibold text-green-700"
                              : letra === marcada
                              ? "font-semibold text-red-700"
                              : "text-slate-600"
                          }
                        >
                          ({letra}) {texto}
                        </p>
                      )
                    )}
                  </div>
                </div>
              </details>
            );
          })}
        </div>
      </div>

      <button
        onClick={refazer}
        className="rounded-md bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
      >
        Fazer outro simulado
      </button>
    </div>
  );
}
