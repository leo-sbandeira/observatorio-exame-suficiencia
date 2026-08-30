"use client";

import { useEffect, useMemo, useState } from "react";
import type { RegistroIES } from "@/lib/types";

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
  };
  erro?: string;
}

export default function PaginaIES() {
  const [resposta, setResposta] = useState<RespostaAPI | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [busca, setBusca] = useState("");
  const [edicao, setEdicao] = useState("");
  const [uf, setUf] = useState("");
  const [modalidade, setModalidade] = useState("");
  const [ordenarPor, setOrdenarPor] = useState("pctAprovadosPresentes");
  const [ordem, setOrdem] = useState<"asc" | "desc">("desc");
  const [pagina, setPagina] = useState(1);

  useEffect(() => {
    const params = new URLSearchParams({
      busca,
      edicao,
      uf,
      modalidade,
      ordenarPor,
      ordem,
      pagina: String(pagina),
      porPagina: "25",
    });
    setCarregando(true);
    fetch(`/api/ies?${params.toString()}`)
      .then((r) => r.json())
      .then(setResposta)
      .finally(() => setCarregando(false));
  }, [busca, edicao, uf, modalidade, ordenarPor, ordem, pagina]);

  // volta para página 1 quando um filtro muda
  useEffect(() => {
    setPagina(1);
  }, [busca, edicao, uf, modalidade]);

  const totalPaginas = useMemo(
    () => (resposta ? Math.max(1, Math.ceil(resposta.total / resposta.porPagina)) : 1),
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

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Dados por Instituição</h1>
        <p className="text-sm text-slate-500">
          Busque, filtre e ordene os resultados por instituição de ensino.
        </p>
      </div>

      <div className="flex flex-wrap gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <input
          type="text"
          placeholder="Buscar por IES, sigla ou cidade…"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          className="min-w-[220px] flex-1 rounded-md border border-slate-300 px-3 py-2 text-sm"
        />
        <select
          value={edicao}
          onChange={(e) => setEdicao(e.target.value)}
          className="rounded-md border border-slate-300 px-3 py-2 text-sm"
        >
          <option value="">Todas as edições</option>
          {resposta?.filtrosDisponiveis.edicoes.map((ed) => (
            <option key={ed} value={ed}>
              {ed}
            </option>
          ))}
        </select>
        <select
          value={uf}
          onChange={(e) => setUf(e.target.value)}
          className="rounded-md border border-slate-300 px-3 py-2 text-sm"
        >
          <option value="">Todas as UFs</option>
          {resposta?.filtrosDisponiveis.ufs.map((u) => (
            <option key={u} value={u}>
              {u}
            </option>
          ))}
        </select>
        <select
          value={modalidade}
          onChange={(e) => setModalidade(e.target.value)}
          className="rounded-md border border-slate-300 px-3 py-2 text-sm"
        >
          <option value="">Todas as modalidades</option>
          {resposta?.filtrosDisponiveis.modalidades.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>
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
                {colunaOrdenavel("aprovados", "Aprovados")}
                {colunaOrdenavel("pctAprovadosPresentes", "% Aprov.")}
              </tr>
            </thead>
            <tbody>
              {carregando && (
                <tr>
                  <td colSpan={8} className="py-6 text-center text-slate-400">
                    Carregando…
                  </td>
                </tr>
              )}
              {!carregando && resposta?.erro && (
                <tr>
                  <td colSpan={8} className="py-6 text-center text-red-600">
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
    </div>
  );
}
