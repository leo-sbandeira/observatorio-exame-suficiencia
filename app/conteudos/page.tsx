"use client";

import { useEffect, useMemo, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LabelList,
} from "recharts";
import MultiSelect from "@/components/MultiSelect";
import type { RegistroConteudoStats } from "@/lib/types";

const CORES = [
  "#2563eb",
  "#16a34a",
  "#ea580c",
  "#9333ea",
  "#dc2626",
  "#0891b2",
];

function formatPct(v: number | null | undefined) {
  if (v === null || v === undefined) return "—";
  return (v * 100).toLocaleString("pt-BR", { maximumFractionDigits: 1 }) + "%";
}

interface RankingItem {
  nome: string;
  quantidade: number;
  porBanca: Record<string, number>;
  pctAcertos: number | null;
}

export default function PaginaConteudos() {
  // --- % de acertos por área de conteúdo ---
  const [statsDados, setStatsDados] = useState<RegistroConteudoStats[]>([]);
  const [regioesDisponiveis, setRegioesDisponiveis] = useState<string[]>([]);
  const [edicoesStatsDisponiveis, setEdicoesStatsDisponiveis] = useState<
    string[]
  >([]);
  const [regioesFiltro, setRegioesFiltro] = useState<string[]>(["Brasil"]);
  const [edicoesStatsFiltro, setEdicoesStatsFiltro] = useState<string[]>([]);
  const [carregandoStats, setCarregandoStats] = useState(true);

  useEffect(() => {
    const params = new URLSearchParams();
    if (regioesFiltro.length) params.set("regioes", regioesFiltro.join(","));
    if (edicoesStatsFiltro.length)
      params.set("edicoes", edicoesStatsFiltro.join(","));
    setCarregandoStats(true);
    fetch(`/api/conteudo?${params.toString()}`)
      .then((r) => r.json())
      .then((json) => {
        setStatsDados(json.dados ?? []);
        if (json.filtrosDisponiveis) {
          setRegioesDisponiveis(json.filtrosDisponiveis.regioes);
          setEdicoesStatsDisponiveis(json.filtrosDisponiveis.edicoes ?? []);
        }
      })
      .finally(() => setCarregandoStats(false));
  }, [regioesFiltro, edicoesStatsFiltro]);

  const regioesParaGrafico = regioesFiltro.length ? regioesFiltro : ["Brasil"];

  const desempenhoPorConteudo = useMemo(() => {
    // Para cada conteúdo, calcula a média do % de acertos (nas edições
    // filtradas) separadamente para cada região selecionada, e ordena do
    // maior para o menor desempenho (considerando a primeira região do
    // filtro como referência de ordenação).
    const conteudos = Array.from(new Set(statsDados.map((d) => d.conteudo)));
    const linhas = conteudos.map((conteudo) => {
      const linha: Record<string, string | number | null> = { conteudo };
      for (const regiao of regioesParaGrafico) {
        const registros = statsDados.filter(
          (d) => d.conteudo === conteudo && d.regiao === regiao && d.pctAcertos !== null
        );
        linha[regiao] = registros.length
          ? registros.reduce((s, r) => s + (r.pctAcertos ?? 0), 0) / registros.length
          : null;
      }
      return linha;
    });
    const regiaoOrdenacao = regioesParaGrafico[0];
    return linhas.sort((a, b) => {
      const va = (a[regiaoOrdenacao] as number | null) ?? -1;
      const vb = (b[regiaoOrdenacao] as number | null) ?? -1;
      return vb - va;
    });
  }, [statsDados, regioesParaGrafico]);

  // --- Conteúdos mais cobrados ---
  const [ranking, setRanking] = useState<RankingItem[]>([]);
  const [bancasDisponiveis, setBancasDisponiveis] = useState<string[]>([]);
  const [edicoesCobrancaDisponiveis, setEdicoesCobrancaDisponiveis] = useState<
    string[]
  >([]);
  const [conteudosDisponiveis, setConteudosDisponiveis] = useState<string[]>([]);
  const [bancasFiltro, setBancasFiltro] = useState<string[]>([]);
  const [edicoesCobrancaFiltro, setEdicoesCobrancaFiltro] = useState<string[]>([]);
  const [conteudoFiltro, setConteudoFiltro] = useState("");
  const [agregarPor, setAgregarPor] = useState<"conteudo" | "assunto" | "tema">(
    "conteudo"
  );
  const [bancasConsideradas, setBancasConsideradas] = useState<string[]>([]);
  const [carregandoRanking, setCarregandoRanking] = useState(true);

  useEffect(() => {
    const params = new URLSearchParams({ agregarPor });
    if (bancasFiltro.length) params.set("bancas", bancasFiltro.join(","));
    if (edicoesCobrancaFiltro.length)
      params.set("edicoes", edicoesCobrancaFiltro.join(","));
    if (conteudoFiltro) params.set("conteudo", conteudoFiltro);
    setCarregandoRanking(true);
    fetch(`/api/conteudos-cobrados?${params.toString()}`)
      .then((r) => r.json())
      .then((json) => {
        setRanking(json.ranking ?? []);
        setBancasConsideradas(json.bancasConsideradas ?? []);
        if (json.filtrosDisponiveis) {
          setBancasDisponiveis(json.filtrosDisponiveis.bancas);
          setEdicoesCobrancaDisponiveis(json.filtrosDisponiveis.edicoes ?? []);
          setConteudosDisponiveis(json.filtrosDisponiveis.conteudos ?? []);
        }
      })
      .finally(() => setCarregandoRanking(false));
  }, [bancasFiltro, edicoesCobrancaFiltro, conteudoFiltro, agregarPor]);

  const mostrarColunasPorBanca = bancasConsideradas.length > 1;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Dados dos Conteúdos</h1>
        <p className="text-sm text-slate-500">
          Desempenho médio dos candidatos e frequência com que cada área é
          cobrada nas provas.
        </p>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
          <h2 className="font-semibold">% médio de acertos por área de conteúdo</h2>
          <div className="flex flex-wrap gap-2">
            <MultiSelect
              titulo="Edição"
              opcoes={edicoesStatsDisponiveis.map((e) => ({ value: e, label: e }))}
              selecionados={edicoesStatsFiltro}
              onChange={setEdicoesStatsFiltro}
            />
            <MultiSelect
              titulo="Região"
              opcoes={(regioesDisponiveis.length
                ? regioesDisponiveis
                : ["Brasil"]
              ).map((r) => ({
                value: r,
                label: `${r} (${r === "Brasil" ? "2017.2 a 2025.2" : "2017.2 a 2023.2"})`,
              }))}
              selecionados={regioesFiltro}
              onChange={setRegioesFiltro}
            />
          </div>
        </div>
        {carregandoStats ? (
          <p className="text-slate-400">Carregando…</p>
        ) : (
          <ResponsiveContainer width="100%" height={480}>
            <BarChart
              data={desempenhoPorConteudo}
              layout="vertical"
              margin={{ left: 40, right: 50 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis
                type="number"
                tickFormatter={(v) => `${Math.round(v * 100)}%`}
                domain={[0, 1]}
                tick={{ fontSize: 13 }}
              />
              <YAxis type="category" dataKey="conteudo" width={260} tick={{ fontSize: 13 }} />
              <Tooltip formatter={(v) => `${(Number(v) * 100).toFixed(1)}%`} />
              {regioesParaGrafico.length > 1 && <Legend wrapperStyle={{ fontSize: 13 }} />}
              {regioesParaGrafico.map((regiao, i) => (
                <Bar
                  key={regiao}
                  dataKey={regiao}
                  fill={CORES[i % CORES.length]}
                  radius={[0, 4, 4, 0]}
                >
                  <LabelList
                    dataKey={regiao}
                    position="right"
                    fontSize={12}
                    fontWeight={600}
                    fill="#334155"
                    formatter={(v) =>
                      v === null || v === undefined ? "" : `${(Number(v) * 100).toFixed(0)}%`
                    }
                  />
                </Bar>
              ))}
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
          <h2 className="font-semibold">Conteúdos mais cobrados nas provas</h2>
          <div className="flex flex-wrap gap-2">
            <MultiSelect
              titulo="Edição"
              opcoes={edicoesCobrancaDisponiveis.map((e) => ({ value: e, label: e }))}
              selecionados={edicoesCobrancaFiltro}
              onChange={setEdicoesCobrancaFiltro}
            />
            <select
              value={conteudoFiltro}
              onChange={(e) => setConteudoFiltro(e.target.value)}
              className="rounded-md border border-slate-300 px-3 py-2 text-sm"
            >
              <option value="">Todos os conteúdos</option>
              {conteudosDisponiveis.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            <select
              value={agregarPor}
              onChange={(e) => setAgregarPor(e.target.value as typeof agregarPor)}
              className="rounded-md border border-slate-300 px-3 py-2 text-sm"
            >
              <option value="conteudo">Por Conteúdo</option>
              <option value="assunto">Por Assunto</option>
              <option value="tema">Por Tema</option>
            </select>
            <MultiSelect
              titulo="Banca"
              opcoes={bancasDisponiveis.map((b) => ({ value: b, label: b }))}
              selecionados={bancasFiltro}
              onChange={setBancasFiltro}
            />
          </div>
        </div>
        {conteudoFiltro && (
          <p className="mb-2 text-xs text-slate-500">
            Filtrado ao conteúdo: <strong>{conteudoFiltro}</strong>
          </p>
        )}
        {carregandoRanking ? (
          <p className="text-slate-400">Carregando…</p>
        ) : (
          <div className="max-h-[460px] overflow-y-auto">
            <table className="w-full text-sm">
              <thead className="sticky top-0 bg-white">
                <tr className="border-b border-slate-200 text-left text-slate-500">
                  <th className="py-2 pr-4">#</th>
                  <th className="py-2 pr-4">Nome</th>
                  <th className="py-2 pr-4">Total</th>
                  {mostrarColunasPorBanca &&
                    bancasConsideradas.map((b) => (
                      <th key={b} className="py-2 pr-4">
                        {b}
                      </th>
                    ))}
                  {agregarPor === "conteudo" && (
                    <th className="py-2 pr-4">% Acertos (nacional)</th>
                  )}
                </tr>
              </thead>
              <tbody>
                {ranking.slice(0, 60).map((r, i) => (
                  <tr key={r.nome} className="border-b border-slate-100">
                    <td className="py-2 pr-4 text-slate-400">{i + 1}</td>
                    <td className="py-2 pr-4">{r.nome}</td>
                    <td className="py-2 pr-4 font-semibold">{r.quantidade}</td>
                    {mostrarColunasPorBanca &&
                      bancasConsideradas.map((b) => (
                        <td key={b} className="py-2 pr-4">
                          {r.porBanca[b] ?? 0}
                        </td>
                      ))}
                    {agregarPor === "conteudo" && (
                      <td className="py-2 pr-4">{formatPct(r.pctAcertos)}</td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <p className="mt-2 text-xs text-slate-400">
          Selecione mais de uma banca para comparar a frequência de cada uma
          lado a lado. A coluna de % de acertos usa a Aba 5 (estatística
          nacional por conteúdo e edição).
        </p>
      </div>

      <div className="space-y-2 rounded-lg border border-slate-200 bg-slate-50 p-4 text-xs text-slate-600">
        <p>
          Para categorizar conteúdo, assunto e tema, foi considerado o
          edital referente ao ano de 2025.1 como parâmetro.
        </p>
        <p>
          A partir da edição de 2017.2 até a de 2025.2 o CFC divulgou o
          desempenho geral por conteúdo.
        </p>
        <p>
          O CFC também publicou o desempenho das regiões por conteúdo, mas
          somente para as edições de 2017.2 a 2023.2. Não há, assim, dados de
          desempenho das regiões por conteúdo nas demais edições.
        </p>
        <p>
          Cumpre observar que na edição de 2017.2 não há o conteúdo de
          Controladoria, que passou a ser cobrado somente na edição de
          2018.1.
        </p>
      </div>
    </div>
  );
}
