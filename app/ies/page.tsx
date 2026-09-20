"use client";

import { useEffect, useMemo, useState } from "react";
import type { RegistroIES } from "@/lib/types";
import BuscaMultipla from "@/components/BuscaMultipla";
import { exportarCSV, exportarExcel, exportarPDF, ColunaExport } from "@/lib/exportar";

function formatPct(v: number | null | undefined) {
  if (v === null || v === undefined) return "—";
  return (v * 100).toLocaleString("pt-BR", { maximumFractionDigits: 1 }) + "%";
}
function formatNum(v: number | null | undefined) {
  if (v === null || v === undefined) return "—";
  return v.toLocaleString("pt-BR");
}

interface RespostaAPI {
  total: number;
  pagina: number;
  porPagina: number;
  dados: RegistroIES[];
  filtrosDisponiveis: {
    edicoes: string[];
    ufs: string[];
    modalidades: string[];
    instituicoes: { nome: string; sigla: string }[];
  };
  erro?: string;
}

const COLUNAS_EXPORT: ColunaExport[] = [
  { chave: "edicao", titulo: "Edição" },
  { chave: "ies", titulo: "IES" },
  { chave: "sigla", titulo: "Sigla" },
  { chave: "uf", titulo: "UF" },
  { chave: "cidade", titulo: "Cidade" },
  { chave: "modalidade", titulo: "Modalidade" },
  { chave: "inscritos", titulo: "Inscritos" },
  { chave: "presentes", titulo: "Presentes" },
  { chave: "aprovados", titulo: "Aprovados" },
  { chave: "pctAprovadosPresentes", titulo: "% Aprovados/Presentes" },
  { chave: "reprovados", titulo: "Reprovados" },
  { chave: "pctReprovadosPresentes", titulo: "% Reprovados/Presentes" },
  { chave: "ausentes", titulo: "Ausentes" },
  { chave: "pctAusentesInscritos", titulo: "% Ausentes/Inscritos" },
];

const NOTAS_RODAPE_EXPORT = [
  "Os dados aqui sistematizados foram recuperados no website do Conselho Federal de Contabilidade (CFC).",
  "A partir da primeira edição de 2017, o CFC passou a divulgar os resultados por IES e a partir de 2019 também por modalidade de ensino.",
  "A divulgação dos resultados por modalidade de ensino foi suspensa a partir da edição de 2024.1 e a identificação da UF - Cidade a partir da edição de 2024.2.",
];

export default function PaginaIES() {
  const [resposta, setResposta] = useState<RespostaAPI | null>(null);
  const [carregando, setCarregando] = useState(false);
  const [exportando, setExportando] = useState<string | null>(null);
  const [instituicoesFiltro, setInstituicoesFiltro] = useState<string[]>([]);
  const [edicao, setEdicao] = useState("");
  const [uf, setUf] = useState("");
  const [cidadeFiltro, setCidadeFiltro] = useState("");
  const [modalidade, setModalidade] = useState("");
  const [ordenarPor, setOrdenarPor] = useState("edicao");
  const [ordem, setOrdem] = useState<"asc" | "desc">("desc");
  const [pagina, setPagina] = useState(1);
  const [temFiltroAplicado, setTemFiltroAplicado] = useState(false);

  function montarParams(extra: Record<string, string> = {}) {
    return new URLSearchParams({
      instituicoes: instituicoesFiltro.join(","),
      edicao,
      uf,
      cidade: cidadeFiltro,
      modalidade,
      ordenarPor,
      ordem,
      ...extra,
    });
  }

  // Carregar dados quando o usuário clica em Pesquisar
  function executarPesquisa() {
    const temFiltro = instituicoesFiltro.length > 0 || edicao || uf || cidadeFiltro || modalidade;
    if (!temFiltro) return;

    setTemFiltroAplicado(true);
    setPagina(1);
    const params = montarParams({ pagina: "1", porPagina: "25" });
    setCarregando(true);
    fetch(`/api/ies?${params.toString()}`)
      .then((r) => r.json())
      .then(setResposta)
      .finally(() => setCarregando(false));

    // Registrar busca
    fetch("/api/ies/registro", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        evento: "busca",
        edicao,
        uf,
        cidade: cidadeFiltro,
        ies: instituicoesFiltro.join(", "),
      }),
    }).catch(() => {});
  }

  // Carregar mais resultados quando a página muda
  useEffect(() => {
    if (!temFiltroAplicado) return;
    const params = montarParams({ pagina: String(pagina), porPagina: "25" });
    setCarregando(true);
    fetch(`/api/ies?${params.toString()}`)
      .then((r) => r.json())
      .then(setResposta)
      .finally(() => setCarregando(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagina, ordenarPor, ordem, temFiltroAplicado]);

  const [estatisticas, setEstatisticas] = useState<{
    totalAcessos: number;
    totalExportacoes: number;
    edicoesMaisBuscadas: string[];
    iesMaisBuscadas: string[];
    ufsMaisBuscadas: string[];
  } | null>(null);

  // Carregar resultados iniciais ao abrir a página
  useEffect(() => {
    const params = new URLSearchParams({
      instituicoes: "",
      edicao: "",
      uf: "",
      cidade: "",
      modalidade: "",
      ordenarPor: "edicao",
      ordem: "desc",
      pagina: "1",
      porPagina: "25",
    });
    setCarregando(true);
    fetch(`/api/ies?${params.toString()}`)
      .then((r) => r.json())
      .then(setResposta)
      .finally(() => setCarregando(false));
  }, []);

  useEffect(() => {
    fetch("/api/ies/estatisticas")
      .then((r) => r.json())
      .then(setEstatisticas)
      .catch(() => {});
  }, []);

  const totalPaginas = useMemo(
    () => (resposta ? Math.max(1, Math.ceil(resposta.total / resposta.porPagina)) : 1),
    [resposta]
  );

  const opcoesInstituicoes = useMemo(
    () =>
      (resposta?.filtrosDisponiveis.instituicoes ?? []).map((i) => ({
        value: i.nome,
        label: i.sigla ? `${i.nome} (${i.sigla})` : i.nome,
      })),
    [resposta]
  );

  function colunaOrdenavel(chave: string, label: string) {
    const ativo = ordenarPor === chave;
    return (
      <th
        className="cursor-pointer select-none py-2 pr-4 hover:text-slate-800"
        onClick={() => {
          if (ativo) setOrdem(ordem === "asc" ? "desc" : "asc");
          else {
            setOrdenarPor(chave);
            setOrdem("desc");
          }
        }}
      >
        {label} {ativo ? (ordem === "asc" ? "▲" : "▼") : ""}
      </th>
    );
  }

  async function exportarDados(formato: "csv" | "excel" | "pdf") {
    setExportando(formato);
    fetch("/api/ies/registro", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ evento: "exportacao", formato }),
    }).catch(() => {});
    try {
      const params = montarParams({ exportar: "true" });
      const r = await fetch(`/api/ies?${params.toString()}`);
      const json: RespostaAPI = await r.json();
      const dados = json.dados as unknown as Record<string, unknown>[];
      const nomeBase = "dados-por-instituicao";
      if (formato === "csv") exportarCSV(dados, COLUNAS_EXPORT, `${nomeBase}.csv`, NOTAS_RODAPE_EXPORT);
      else if (formato === "excel")
        exportarExcel(dados, COLUNAS_EXPORT, `${nomeBase}.xlsx`, NOTAS_RODAPE_EXPORT);
      else
        await exportarPDF(
          dados,
          COLUNAS_EXPORT,
          "Dados por Instituição",
          `${nomeBase}.pdf`,
          NOTAS_RODAPE_EXPORT
        );
    } finally {
      setExportando(null);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold">Dados por Instituição</h1>
          <p className="text-sm text-slate-500">
            Busque, filtre e ordene os resultados por instituição de ensino.
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => exportarDados("csv")}
            disabled={exportando !== null}
            className="rounded-md border border-slate-300 px-3 py-2 text-xs font-medium text-slate-600 hover:bg-slate-50 disabled:opacity-40"
          >
            {exportando === "csv" ? "Exportando…" : "Exportar CSV"}
          </button>
          <button
            onClick={() => exportarDados("excel")}
            disabled={exportando !== null}
            className="rounded-md border border-slate-300 px-3 py-2 text-xs font-medium text-slate-600 hover:bg-slate-50 disabled:opacity-40"
          >
            {exportando === "excel" ? "Exportando…" : "Exportar Excel"}
          </button>
          <button
            onClick={() => exportarDados("pdf")}
            disabled={exportando !== null}
            className="rounded-md border border-slate-300 px-3 py-2 text-xs font-medium text-slate-600 hover:bg-slate-50 disabled:opacity-40"
          >
            {exportando === "pdf" ? "Exportando…" : "Exportar PDF"}
          </button>
        </div>
      </div>

      {estatisticas && (estatisticas.totalAcessos > 0 || estatisticas.totalExportacoes > 0) && (
        <div className="grid grid-cols-2 gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:grid-cols-6">
          <div>
            <p className="text-xs text-slate-400">Pesquisas Realizadas</p>
            <p className="text-lg font-bold text-slate-900">{estatisticas.totalAcessos}</p>
          </div>
          <div>
            <p className="text-xs text-slate-400">Dados Exportados</p>
            <p className="text-sm font-semibold text-slate-900">
              {estatisticas.totalExportacoes > 0 ? `(${estatisticas.totalExportacoes})` : "—"}
            </p>
          </div>
          <div>
            <p className="text-xs text-slate-400">Edições Pesquisadas</p>
            <p className="text-xs font-semibold text-slate-900">
              {estatisticas.edicoesMaisBuscadas.length > 0
                ? estatisticas.edicoesMaisBuscadas.join(", ")
                : "—"}
            </p>
          </div>
          <div>
            <p className="text-xs text-slate-400">UFs Pesquisadas</p>
            <p className="text-xs font-semibold text-slate-900">
              {estatisticas.ufsMaisBuscadas.length > 0
                ? estatisticas.ufsMaisBuscadas.join(", ")
                : "—"}
            </p>
          </div>
          <div>
            <p className="text-xs text-slate-400">IES Pesquisadas</p>
            <p className="text-xs font-semibold text-slate-900">
              {estatisticas.iesMaisBuscadas.length > 0
                ? estatisticas.iesMaisBuscadas.join(", ")
                : "—"}
            </p>
          </div>
        </div>
      )}
      <div className="flex flex-wrap items-start gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <BuscaMultipla
          titulo="Instituição"
          opcoes={opcoesInstituicoes}
          selecionados={instituicoesFiltro}
          onChange={setInstituicoesFiltro}
          placeholder="Digite o nome ou sigla (ex: UNITINS)…"
        />
        <label className="flex flex-col text-xs font-medium text-slate-400">
          Edição
          <select
            value={edicao}
            onChange={(e) => setEdicao(e.target.value)}
            className="mt-1 rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-900"
          >
            <option value="">Todas as edições</option>
            {resposta?.filtrosDisponiveis.edicoes.map((ed) => (
              <option key={ed} value={ed}>
                {ed}
              </option>
            ))}
          </select>
        </label>
        <label className="flex flex-col text-xs font-medium text-slate-400">
          UF
          <select
            value={uf}
            onChange={(e) => setUf(e.target.value)}
            className="mt-1 rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-900"
          >
            <option value="">Todas as UFs</option>
            {resposta?.filtrosDisponiveis.ufs.map((u) => (
              <option key={u} value={u}>
                {u}
              </option>
            ))}
          </select>
        </label>
        <label className="flex flex-col text-xs font-medium text-slate-400">
          Cidade
          <input
            type="text"
            value={cidadeFiltro}
            onChange={(e) => setCidadeFiltro(e.target.value)}
            placeholder="Ex: Palmas"
            className="mt-1 rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-900"
          />
        </label>
        <label className="flex flex-col text-xs font-medium text-slate-400">
          Modalidade
          <select
            value={modalidade}
            onChange={(e) => setModalidade(e.target.value)}
            className="mt-1 rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-900"
          >
            <option value="">Todas as modalidades</option>
            {resposta?.filtrosDisponiveis.modalidades.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </label>
        <button
          type="button"
          onClick={executarPesquisa}
          disabled={instituicoesFiltro.length === 0 && !edicao && !uf && !cidadeFiltro && !modalidade}
          className="self-end rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed"
        >
          Pesquisar
        </button>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-left text-slate-500">
                {colunaOrdenavel("edicao", "Edição")}
                {colunaOrdenavel("ies", "IES")}
                <th className="py-2 pr-4">UF</th>
                <th className="py-2 pr-4">Cidade</th>
                <th className="py-2 pr-4">Modalidade</th>
                {colunaOrdenavel("inscritos", "Inscritos")}
                <th className="py-2 pr-4">Presentes</th>
                {colunaOrdenavel("aprovados", "Aprovados")}
                {colunaOrdenavel("pctAprovadosPresentes", "% Aprov.")}
              </tr>
            </thead>
            <tbody>
              {carregando && (
                <tr>
                  <td colSpan={9} className="py-6 text-center text-slate-400">
                    Carregando…
                  </td>
                </tr>
              )}
              {!carregando && resposta?.erro && (
                <tr>
                  <td colSpan={9} className="py-6 text-center text-red-600">
                    {resposta.erro}
                  </td>
                </tr>
              )}
              {!carregando &&
                resposta?.dados.map((d, i) => (
                  <tr
                    key={`${d.edicao}-${d.sigla}-${i}`}
                    className="border-b border-slate-100 hover:bg-slate-50"
                  >
                    <td className="py-2 pr-4 text-slate-500">{d.edicao}</td>
                    <td className="py-2 pr-4 font-medium">
                      {d.ies}{" "}
                      {d.sigla && (
                        <span className="text-slate-400">({d.sigla})</span>
                      )}
                    </td>
                    <td className="py-2 pr-4">{d.uf}</td>
                    <td className="py-2 pr-4">{d.cidade}</td>
                    <td className="py-2 pr-4">{d.modalidade}</td>
                    <td className="py-2 pr-4">{formatNum(d.inscritos)}</td>
                    <td className="py-2 pr-4">{formatNum(d.presentes)}</td>
                    <td className="py-2 pr-4">{formatNum(d.aprovados)}</td>
                    <td className="py-2 pr-4 font-semibold">
                      {formatPct(d.pctAprovadosPresentes)}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between border-t border-slate-100 px-4 py-3 text-sm text-slate-500">
          <span>
            {resposta ? resposta.total.toLocaleString("pt-BR") : 0} resultados
          </span>
          <div className="flex items-center gap-2">
            <button
              disabled={pagina <= 1}
              onClick={() => setPagina((p) => p - 1)}
              className="rounded-md border border-slate-300 px-3 py-1 disabled:opacity-40"
            >
              Anterior
            </button>
            <span>
              Página {pagina} de {totalPaginas}
            </span>
            <button
              disabled={pagina >= totalPaginas}
              onClick={() => setPagina((p) => p + 1)}
              className="rounded-md border border-slate-300 px-3 py-1 disabled:opacity-40"
            >
              Próxima
            </button>
          </div>
        </div>
      </div>
      <div className="space-y-2 rounded-lg border border-slate-200 bg-slate-50 p-4 text-xs text-slate-600">
        <p>
          A partir da primeira edição de 2017, o CFC passou a divulgar os
          resultados por IES e a partir de 2019 também por modalidade de
          ensino.
        </p>
        <p>
          A divulgação dos resultados por modalidade de ensino foi suspensa a
          partir da edição de 2024.1 e a identificação da UF - Cidade a
          partir da edição de 2024.2.
        </p>
        <p>
          Os botões de exportação (CSV, Excel e PDF) exportam todos os
          resultados que correspondem aos filtros aplicados no momento, não
          apenas a página exibida na tela.
        </p>
      </div>
    </div>
  );
}
