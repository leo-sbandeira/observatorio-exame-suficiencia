interface Props {
  texto: string;
  /** Reduz o espaçamento vertical — usado dentro das alternativas (A)-(D). */
  compacto?: boolean;
  /** Classe de cor do texto (usada na revisão, para destacar certo/errado). */
  corClasse?: string;
}

interface BlocoTabela {
  tipo: "tabela";
  colunas: string[];
  linhas: string[][];
}
interface BlocoLista {
  tipo: "lista";
  itens: string[];
}
interface BlocoTexto {
  tipo: "texto";
  conteudo: string;
}
type Bloco = BlocoTabela | BlocoLista | BlocoTexto;

const RE_TABELA = /^\[TABELA:([^\]]+)\]\n([\s\S]*?)\n\[\/TABELA\]$/;
const RE_LISTA = /^\[LISTA\]\n([\s\S]*?)\n\[\/LISTA\]$/;

function interpretarBlocos(texto: string): Bloco[] {
  return texto
    .split(/\n\n+/)
    .map((parte) => parte.trim())
    .filter(Boolean)
    .map((parte): Bloco => {
      const tabela = RE_TABELA.exec(parte);
      if (tabela) {
        const colunas = tabela[1].split("|");
        const linhas = tabela[2]
          .split("\n")
          .filter(Boolean)
          .map((l) => l.split("|"));
        return { tipo: "tabela", colunas, linhas };
      }
      const lista = RE_LISTA.exec(parte);
      if (lista) {
        return { tipo: "lista", itens: lista[1].split("\n").filter(Boolean) };
      }
      return { tipo: "texto", conteudo: parte };
    });
}

export default function RenderizadorQuestao({ texto, compacto = false, corClasse }: Props) {
  const blocos = interpretarBlocos(texto);
  const espaco = compacto ? "space-y-2" : "space-y-3";
  const corTexto = corClasse ?? "text-slate-800";

  return (
    <div className={espaco}>
      {blocos.map((bloco, i) => {
        if (bloco.tipo === "tabela") {
          return (
            <div key={i} className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr>
                    {bloco.colunas.map((c, j) => (
                      <th
                        key={j}
                        className="border border-slate-300 bg-slate-100 px-2 py-1 text-left font-semibold text-slate-700"
                      >
                        {c}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {bloco.linhas.map((linha, li) => (
                    <tr key={li} className={li % 2 === 1 ? "bg-slate-50" : ""}>
                      {linha.map((cel, ci) => (
                        <td key={ci} className="border border-slate-200 px-2 py-1 text-slate-700">
                          {cel}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        }
        if (bloco.tipo === "lista") {
          return (
            <ul key={i} className="list-none space-y-1 pl-1">
              {bloco.itens.map((item, ii) => (
                <li key={ii} className={`text-justify leading-normal ${corTexto}`}>
                  {item}
                </li>
              ))}
            </ul>
          );
        }
        return (
          <p key={i} className={`text-justify leading-normal ${corTexto}`}>
            {bloco.conteudo}
          </p>
        );
      })}
    </div>
  );
}
