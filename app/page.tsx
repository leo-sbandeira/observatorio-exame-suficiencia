"use client";

import { useEffect, useMemo, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
  LabelList,
} from "recharts";
import MultiSelect from "@/components/MultiSelect";
import type { RegistroGeral } from "@/lib/types";

const CORES = ["#0f172a", "#dc2626", "#2563eb", "#16a34a", "#9333ea", "#ea580c"];

function formatPct(v: number | null | undefined, casas = 1) {
  if (v === null || v === undefined) return "—";
  return (
    (v * 100).toLocaleString("pt-BR", { maximumFractionDigits: casas }) + "%"
  );
}
function formatNum(v: number | null | undefined) {
  if (v === null || v === undefined) return "—";
  return v.toLocaleString("pt-BR");
}
function media(valores: (number | null)[]): number | null {
  const validos = valores.filter((v): v is number => v !== null);
  if (!validos.length) return null;
  return validos.reduce((a, b) => a + b, 0) / validos.length;
}
function variacao(atual: number | null, anterior: number | null | undefined) {
  if (atual === null || anterior === null || anterior === undefined || anterior === 0)
    return null;
  return (atual - anterior) / anterior;
}

function CelulaComVariacao({
  valor,
  delta,
}: {
  valor: number | null;
  delta: number | null;
}) {
  return (
    <td className="py-2 pr-4">
      {formatNum(valor)}{" "}
      {delta !== null && (
        <span
          className={
            delta > 0
              ? "text-xs font-medium text-green-600"
              : delta < 0
              ? "text-xs font-medium text-red-600"
              : "text-xs font-medium text-slate-400"
          }
        >
          ({delta > 0 ? "+" : ""}
          {formatPct(delta)})
        </span>
      )}
    </td>
  );
}

interface LinhaTabela {
  regiao: string;
  edicao: string;
  inscritos: number | null;
  deltaInscritos: number | null;
  presentes: number | null;
  deltaPresentes: number | null;
  aprovados: number | null;
  deltaAprovados: number | null;
  ausentes: number | null;
  deltaAusentes: number | null;
}

export default function Home() {
  const [dados, setDados] = useState<RegistroGeral[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);
  const [regioesFiltro, setRegioesFiltro] = useState<string[]>(["BR"]);
  const [edicoesFiltro, setEdicoesFiltro] = useState<string[]>([]);

  useEffect(() => {
    fetch("/api/geral")
      .then((r) => r.json())
      .then((json) => {
        if (json.erro) setErro(json.erro);
        else setDados(json.dados);
      })
      .catch((e) => setErro(String(e)))
      .finally(() => setCarregando(false));
  }, []);

  const ufsDisponiveis = useMemo(
    () =>
      Array.from(
        new Set(dados.filter((d) => d.regiao !== "BR").map((d) => d.regiao))
      ).sort(),
    [dados]
  );

  const edicoesDisponiveis = useMemo(
    () => Array.from(new Set(dados.map((d) => d.edicao))).sort(),
    [dados]
  );

  const opcoesRegiao = useMemo(
    () => [
      { value: "BR", label: "Brasil" },
      ...ufsDisponiveis.map((uf) => ({ value: uf, label: uf })),
    ],
    [ufsDisponiveis]
  );
  const opcoesEdicao = useMemo(
    () => edicoesDisponiveis.map((ed) => ({ value: ed, label: ed })),
    [edicoesDisponiveis]
  );

  // Série cronológica completa por região (necessária para calcular a
  // variação em relação à edição imediatamente anterior mesmo quando o
  // filtro de edições não inclui essa edição anterior).
  const seriePorRegiao = useMemo(() => {
    const mapa = new Map<string, RegistroGeral[]>();
    for (const d of dados) {
      const arr = mapa.get(d.regiao) ?? [];
      arr.push(d);
      mapa.set(d.regiao, arr);
    }
    for (const arr of mapa.values()) arr.sort((a, b) => a.edicao.localeCompare(b.edicao));
    return mapa;
  }, [dados]);

  const regioesParaExibir = regioesFiltro.length
    ? regioesFiltro
    : ["BR", ...ufsDisponiveis];

  const linhasTabela: LinhaTabela[] = useMemo(() => {
    const linhas: LinhaTabela[] = [];
    for (const regiao of regioesParaExibir) {
      const serie = seriePorRegiao.get(regiao) ?? [];
      serie.forEach((atual, i) => {
        if (edicoesFiltro.length && !edicoesFiltro.includes(atual.edicao)) return;
        const anterior = i > 0 ? serie[i - 1] : undefined;
        linhas.push({
          regiao,
          edicao: atual.edicao,
          inscritos: atual.inscritos,
          deltaInscritos: variacao(atual.inscritos, anterior?.inscritos),
          presentes: atual.presentes,
          deltaPresentes: variacao(atual.presentes, anterior?.presentes),
          aprovados: atual.aprovados,
          deltaAprovados: variacao(atual.aprovados, anterior?.aprovados),
          ausentes: atual.ausentes,
          deltaAusentes: variacao(atual.ausentes, anterior?.ausentes),
        });
      });
    }
    return linhas;
  }, [regioesParaExibir, seriePorRegiao, edicoesFiltro]);

  const mostrarColunaRegiao = regioesParaExibir.length > 1;

  // --- Gráfico de evolução ---
  const nacional = useMemo(
    () =>
      dados.filter((d) => d.regiao === "BR").sort((a, b) => a.edicao.localeCompare(b.edicao)),
    [dados]
  );
  const regioesNoGrafico = useMemo(() => {
    const base = regioesFiltro.length ? regioesFiltro.slice(0, 6) : ["BR"];
    return base.includes("BR") ? base : ["BR", ...base].slice(0, 6);
  }, [regioesFiltro]);

  const dadosGrafico = useMemo(() => {
    return edicoesDisponiveis.map((ed) => {
      const linha: Record<string, string | number | null> = { edicao: ed };
      for (const regiao of regioesNoGrafico) {
        const item = dados.find((d) => d.edicao === ed && d.regiao === regiao);
        linha[regiao === "BR" ? "Brasil" : regiao] = item
          ? item.pctAprovados ?? null
          : null;
      }
      return linha;
    });
  }, [edicoesDisponiveis, dados, regioesNoGrafico]);

  const mediaHistoricaBR = useMemo(() => media(nacional.map((d) => d.pctAprovados)), [nacional]);
  const unicoEstadoSelecionado =
    regioesFiltro.length === 1 && regioesFiltro[0] !== "BR" ? regioesFiltro[0] : null;
  const mediaHistoricaEstado = useMemo(() => {
    if (!unicoEstadoSelecionado) return null;
    const serie = dados.filter((d) => d.regiao === unicoEstadoSelecionado);
    return media(serie.map((d) => d.pctAprovados));
  }, [dados, unicoEstadoSelecionado]);

  if (carregando) return <p className="text-slate-500">Carregando dados da planilha…</p>;
  if (erro)
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
        Não foi possível carregar os dados: {erro}
      </div>
    );

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Visão Geral</h1>
        <p className="text-sm text-slate-500">
          Estatísticas por região e edição do Exame de Suficiência.
        </p>
      </div>

      <div className="flex flex-wrap gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <MultiSelect
          titulo="Região"
          opcoes={opcoesRegiao}
          selecionados={regioesFiltro}
          onChange={setRegioesFiltro}
        />
        <MultiSelect
          titulo="Edição"
          opcoes={opcoesEdicao}
          selecionados={edicoesFiltro}
          onChange={setEdicoesFiltro}
        />
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="mb-3 font-semibold">Evolução do % de aprovados</h2>
        <ResponsiveContainer width="100%" height={380}>
          <LineChart data={dadosGrafico} margin={{ top: 24 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="edicao" tick={{ fontSize: 11 }} />
            <YAxis tickFormatter={(v) => `${Math.round(v * 100)}%`} tick={{ fontSize: 12 }} />
            <Tooltip formatter={(v) => `${(Number(v) * 100).toFixed(1)}%`} />
            <Legend />
            {regioesNoGrafico.map((regiao, i) => {
              const chave = regiao === "BR" ? "Brasil" : regiao;
              return (
                <Line
                  key={chave}
                  type="monotone"
                  dataKey={chave}
                  stroke={CORES[i % CORES.length]}
                  strokeWidth={chave === "Brasil" ? 2.5 : 2}
                  dot={false}
                >
                  <LabelList
                    dataKey={chave}
                    position="top"
                    fontSize={9}
                    fill={CORES[i % CORES.length]}
                    formatter={(v) =>
                      v === null || v === undefined ? "" : `${Math.round(Number(v) * 100)}%`
                    }
                  />
                </Line>
              );
            })}
            {mediaHistoricaBR !== null && (
              <ReferenceLine
                y={mediaHistoricaBR}
                stroke="#0f172a"
                strokeDasharray="6 4"
                label={{
                  value: `Média histórica BR (${formatPct(mediaHistoricaBR)})`,
                  position: "insideTopLeft",
                  fill: "#0f172a",
                  fontSize: 11,
                }}
              />
            )}
            {mediaHistoricaEstado !== null && (
              <ReferenceLine
                y={mediaHistoricaEstado}
                stroke="#dc2626"
                strokeDasharray="6 4"
                label={{
                  value: `Média histórica ${unicoEstadoSelecionado} (${formatPct(mediaHistoricaEstado)})`,
                  position: "insideBottomLeft",
                  fill: "#dc2626",
                  fontSize: 11,
                }}
              />
            )}
          </LineChart>
        </ResponsiveContainer>
        <p className="mt-2 text-xs text-slate-400">
          O gráfico mostra até 6 séries por vez (Brasil sempre incluído). Use o
          filtro de Região acima para escolher quais comparar.
        </p>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="mb-3 font-semibold">
          Estatísticas por edição {mostrarColunaRegiao ? "e região" : ""}
        </h2>
        <div className="max-h-[520px] overflow-auto">
          <table className="w-full text-sm">
            <thead className="sticky top-0 bg-white">
              <tr className="border-b border-slate-200 text-left text-slate-500">
                <th className="py-2 pr-4">Edição</th>
                {mostrarColunaRegiao && <th className="py-2 pr-4">Região</th>}
                <th className="py-2 pr-4">Inscritos</th>
                <th className="py-2 pr-4">Presentes</th>
                <th className="py-2 pr-4">Aprovados</th>
                <th className="py-2 pr-4">Ausentes</th>
              </tr>
            </thead>
            <tbody>
              {linhasTabela.map((l, i) => (
                <tr key={`${l.regiao}-${l.edicao}-${i}`} className="border-b border-slate-100">
                  <td className="py-2 pr-4 font-medium">{l.edicao}</td>
                  {mostrarColunaRegiao && (
                    <td className="py-2 pr-4">{l.regiao === "BR" ? "Brasil" : l.regiao}</td>
                  )}
                  <CelulaComVariacao valor={l.inscritos} delta={l.deltaInscritos} />
                  <CelulaComVariacao valor={l.presentes} delta={l.deltaPresentes} />
                  <CelulaComVariacao valor={l.aprovados} delta={l.deltaAprovados} />
                  <CelulaComVariacao valor={l.ausentes} delta={l.deltaAusentes} />
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-2 text-xs text-slate-400">
          O percentual entre parênteses é sempre a variação em relação à
          edição imediatamente anterior (mesmo que essa edição anterior não
          esteja marcada no filtro).
        </p>
      </div>
    </div>
  );
}
