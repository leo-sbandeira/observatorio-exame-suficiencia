"use client";

import { useState } from "react";

interface Opcao {
  value: string;
  label: string;
}

export default function BuscaMultipla({
  titulo,
  opcoes,
  selecionados,
  onChange,
  placeholder = "Digite para buscar...",
}: {
  titulo: string;
  opcoes: Opcao[];
  selecionados: string[];
  onChange: (valores: string[]) => void;
  placeholder?: string;
}) {
  const [termo, setTermo] = useState("");
  const [aberto, setAberto] = useState(false);

  const sugestoes = termo.trim()
    ? opcoes
        .filter(
          (o) =>
            o.label.toLowerCase().includes(termo.toLowerCase()) &&
            !selecionados.includes(o.value)
        )
        .slice(0, 20)
    : [];

  function adicionar(valor: string) {
    onChange([...selecionados, valor]);
    setTermo("");
  }

  function remover(valor: string) {
    onChange(selecionados.filter((v) => v !== valor));
  }

  return (
    <div className="min-w-[260px] flex-1">
      <label className="mb-1 block text-xs font-medium text-slate-400">{titulo}</label>
      {selecionados.length > 0 && (
        <div className="mb-1 flex flex-wrap gap-1">
          {selecionados.map((v) => {
            const opt = opcoes.find((o) => o.value === v);
            return (
              <span
                key={v}
                className="flex items-center gap-1 rounded-full bg-blue-50 px-2 py-0.5 text-xs text-blue-700"
              >
                {opt?.label ?? v}
                <button
                  type="button"
                  onClick={() => remover(v)}
                  className="text-blue-400 hover:text-blue-700"
                  aria-label={`Remover ${opt?.label ?? v}`}
                >
                  ×
                </button>
              </span>
            );
          })}
        </div>
      )}
      <div className="relative">
        <input
          type="text"
          value={termo}
          onChange={(e) => setTermo(e.target.value)}
          onFocus={() => setAberto(true)}
          onBlur={() => setTimeout(() => setAberto(false), 150)}
          placeholder={placeholder}
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
        />
        {aberto && sugestoes.length > 0 && (
          <div className="absolute z-20 mt-1 max-h-64 w-full overflow-y-auto rounded-md border border-slate-200 bg-white shadow-lg">
            {sugestoes.map((o) => (
              <button
                key={o.value}
                type="button"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => adicionar(o.value)}
                className="block w-full px-3 py-2 text-left text-sm hover:bg-slate-50"
              >
                {o.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
