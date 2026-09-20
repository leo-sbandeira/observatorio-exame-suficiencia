"use client";

import React, { useState, useEffect } from "react";

interface EstatisticasSimulado {
  simuladosOficiais: {
    total: number;
    media: number | null;
    maior: number | null;
    menor: number | null;
  };
  simuladosPersonalizados: {
    total: number;
    media: number | null;
    maior: number | null;
    menor: number | null;
    edicoes: string[];
    conteudos: string[];
  };
}

const Simulado = () => {
  const [estatisticas, setEstatisticas] = useState<EstatisticasSimulado | null>(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    fetch("/api/simulado/estatisticas")
      .then((res) => res.json())
      .then(setEstatisticas)
      .catch(() => {})
      .finally(() => setCarregando(false));
  }, []);

  function formatarPercentual(v: number | null): string {
    if (v === null) return "—";
    return v.toFixed(1) + "%";
  }

  if (carregando) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-slate-500">Carregando estatísticas...</p>
      </div>
    );
  }

  if (!estatisticas) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Simulado — Exame de Suficiência</h1>
        <p className="text-slate-500">Não foi possível carregar as estatísticas.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Simulado — Exame de Suficiência</h1>
        <p className="text-sm text-slate-500">
          Estatísticas de simulados realizados pelos usuários
        </p>
      </div>

      {/* Simulados Oficiais */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold text-slate-900">Simulados Oficiais Realizados</h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div>
            <p className="text-xs text-slate-400">Total</p>
            <p className="text-2xl font-bold text-slate-900">{estatisticas.simuladosOficiais.total}</p>
          </div>
          <div>
            <p className="text-xs text-slate-400">Média de Acertos</p>
            <p className="text-2xl font-bold text-slate-900">
              {formatarPercentual(estatisticas.simuladosOficiais.media)}
            </p>
          </div>
          <div>
            <p className="text-xs text-slate-400">Maior Acerto</p>
            <p className="text-2xl font-bold text-green-600">
              {formatarPercentual(estatisticas.simuladosOficiais.maior)}
            </p>
          </div>
          <div>
            <p className="text-xs text-slate-400">Menor Acerto</p>
            <p className="text-2xl font-bold text-red-600">
              {formatarPercentual(estatisticas.simuladosOficiais.menor)}
            </p>
          </div>
        </div>
      </div>

      {/* Simulados Personalizados */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold text-slate-900">Simulados Personalizados Realizados</h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div>
            <p className="text-xs text-slate-400">Total</p>
            <p className="text-2xl font-bold text-slate-900">{estatisticas.simuladosPersonalizados.total}</p>
          </div>
          <div>
            <p className="text-xs text-slate-400">Média de Acertos</p>
            <p className="text-2xl font-bold text-slate-900">
              {formatarPercentual(estatisticas.simuladosPersonalizados.media)}
            </p>
          </div>
          <div>
            <p className="text-xs text-slate-400">Maior Acerto</p>
            <p className="text-2xl font-bold text-green-600">
              {formatarPercentual(estatisticas.simuladosPersonalizados.maior)}
            </p>
          </div>
          <div>
            <p className="text-xs text-slate-400">Menor Acerto</p>
            <p className="text-2xl font-bold text-red-600">
              {formatarPercentual(estatisticas.simuladosPersonalizados.menor)}
            </p>
          </div>
        </div>

        {/* Edições Simuladas */}
        <div className="mt-6 border-t border-slate-200 pt-6">
          <h3 className="mb-3 text-sm font-semibold text-slate-900">Edições Simuladas</h3>
          {estatisticas.simuladosPersonalizados.edicoes.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {estatisticas.simuladosPersonalizados.edicoes.map((edicao) => (
                <span
                  key={edicao}
                  className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700"
                >
                  {edicao}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-xs text-slate-500">Nenhum dado disponível</p>
          )}
        </div>

        {/* Conteúdos Simulados */}
        <div className="mt-6 border-t border-slate-200 pt-6">
          <h3 className="mb-3 text-sm font-semibold text-slate-900">Conteúdos Simulados</h3>
          {estatisticas.simuladosPersonalizados.conteudos.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {estatisticas.simuladosPersonalizados.conteudos.map((conteudo) => (
                <span
                  key={conteudo}
                  className="rounded-full bg-purple-100 px-3 py-1 text-xs font-medium text-purple-700"
                >
                  {conteudo}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-xs text-slate-500">Nenhum dado disponível</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Simulado;
