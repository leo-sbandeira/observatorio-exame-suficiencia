"use client";

interface Opcao {
  value: string;
  label: string;
}

export default function MultiSelect({
  titulo,
  opcoes,
  selecionados,
  onChange,
}: {
  titulo: string;
  opcoes: Opcao[];
  selecionados: string[];
  onChange: (valores: string[]) => void;
}) {
  function alternar(valor: string) {
    onChange(
      selecionados.includes(valor)
        ? selecionados.filter((v) => v !== valor)
        : [...selecionados, valor]
    );
  }

  const textoBotao =
    selecionados.length === 0
      ? "Todas"
      : selecionados.length === 1
      ? opcoes.find((o) => o.value === selecionados[0])?.label ??
        selecionados[0]
      : `${selecionados.length} selecionadas`;

  return (
    <details className="group relative">
      <summary className="flex cursor-pointer list-none items-center gap-1 rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700">
        <span className="text-xs font-medium text-slate-400">{titulo}:</span>
        {textoBotao}
      </summary>
      <div className="absolute z-20 mt-1 max-h-72 w-64 overflow-y-auto rounded-md border border-slate-200 bg-white p-2 shadow-lg">
        <div className="mb-1 flex justify-between border-b border-slate-100 pb-1 text-xs">
          <button
            type="button"
            className="text-blue-600 hover:underline"
            onClick={() => onChange([])}
          >
            Todas
          </button>
          <button
            type="button"
            className="text-blue-600 hover:underline"
            onClick={() => onChange(opcoes.map((o) => o.value))}
          >
            Selecionar todas
          </button>
        </div>
        {opcoes.map((o) => (
          <label
            key={o.value}
            className="flex cursor-pointer items-center gap-2 rounded px-1 py-1 text-sm hover:bg-slate-50"
          >
            <input
              type="checkbox"
              checked={selecionados.includes(o.value)}
              onChange={() => alternar(o.value)}
            />
            {o.label}
          </label>
        ))}
      </div>
    </details>
  );
}
