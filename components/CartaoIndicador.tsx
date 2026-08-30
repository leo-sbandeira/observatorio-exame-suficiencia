export default function CartaoIndicador({
  titulo,
  valor,
  subtitulo,
}: {
  titulo: string;
  valor: string;
  subtitulo?: string;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-sm font-medium text-slate-500">{titulo}</p>
      <p className="mt-1 text-3xl font-bold text-slate-900">{valor}</p>
      {subtitulo && <p className="mt-1 text-xs text-slate-400">{subtitulo}</p>}
    </div>
  );
}
