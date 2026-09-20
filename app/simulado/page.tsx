"use client";

import { useEffect, useMemo, useState } from "react";
import { jsPDF } from "jspdf";
import MultiSelect from "@/components/MultiSelect";
import RenderizadorQuestao from "@/components/RenderizadorQuestao";
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
  const [modoSimulado, setModoSimulado] = useState<"oficial" | "personalizado" | null>(null);

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
  const [estatisticas, setEstatisticas] = useState<{
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
  } | null>(null);

  useEffect(() => {
    fetch("/api/simulado/estatisticas")
      .then((r) => r.json())
      .then(setEstatisticas)
      .catch(() => {});
  }, []);

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
    setModoSimulado("personalizado");
    setFase("prova");
    registrarInicio("personalizado", geradas);
  }

  function iniciarOficial() {
    const { questoes: geradas, avisos } = gerarSimuladoOficial();
    setQuestoes(geradas);
    setAvisos(avisos);
    setRespostas({});
    setIndiceAtual(0);
    setModoSimulado("oficial");
    setFase("prova");
    registrarInicio("oficial", geradas);
  }

  function responder(letra: Letra) {
    setRespostas((prev) => ({ ...prev, [questoes[indiceAtual].id]: letra }));
  }

  function finalizar() {
    const total = questoes.length;
    const acertos = questoes.filter((q) => respostas[q.id] === q.correta).length;
    const percentual = total ? (acertos / total) * 100 : 0;
    registrarFim(questoes, acertos, total, percentual, modoSimulado);
    setFase("resultado");
  }

  function refazer() {
    setFase("config");
    setQuestoes([]);
    setRespostas({});
  }

  // Processa tags especiais no texto das questões
  function processarTextoQuestao(texto: string): string {
    // Remove tags [LISTA] e [/LISTA], preservando o conteúdo e quebras de linha
    texto = texto.replace(/\[LISTA\]/g, "").replace(/\[\/LISTA\]/g, "");

    // Processa tags [TABELA:Item|Valor] e [/TABELA]
    texto = texto.replace(/\[TABELA:([^\]]+)\]/g, "$1");
    texto = texto.replace(/\[\/TABELA\]/g, "");

    // NÃO remove quebras de linha - elas definem a estrutura das listas
    // Apenas normaliza espaços múltiplos (exceto quebras de linha)
    texto = texto.replace(/ +/g, " ");

    return texto.trim();
  }

  function ordenarPorDistribuicao(questoes: QuestaoSimulado[]): QuestaoSimulado[] {
    const ordem = Object.keys(DISTRIBUICAO_OFICIAL) as string[];
    const ordenadas: QuestaoSimulado[] = [];

    for (const conteudo of ordem) {
      const questoesDoConteudo = questoes.filter(q => q.conteudo === conteudo);
      ordenadas.push(...questoesDoConteudo);
    }

    return ordenadas;
  }

  async function gerarSimuladoOficialPDF() {
    const { questoes: todasQuestoes } = gerarSimuladoOficial();
    const questoesOrdenadas = ordenarPorDistribuicao(todasQuestoes);
    await gerarPDFSimulado(questoesOrdenadas, "oficial");
  }

  async function gerarPDFSimulado(questoesAExportar: QuestaoSimulado[], tipo: "oficial" | "personalizado" = "personalizado") {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 12;
    const contentWidth = pageWidth - 2 * margin;

    let logoDataUrl = "";
    try {
      const response = await fetch("/logo-icone.png");
      const blob = await response.blob();
      logoDataUrl = await new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.readAsDataURL(blob);
      });
    } catch {
      // Se não conseguir carregar, continua sem logo
    }

    // Função para renderizar cabeçalho (chamada em cada página)
    const renderHeader = (pageNum: number) => {
      let y = 8;
      if (logoDataUrl) {
        doc.addImage(logoDataUrl, "PNG", margin, y, 10, 10);
      }
      doc.setFontSize(12);
      doc.setFont("helvetica", "bold");
      doc.text("Observatório do Exame de Suficiência", margin + 12, y + 6);
      y += 12;
      doc.setDrawColor(180, 180, 180);
      doc.line(margin, y, pageWidth - margin, y);
      return y + 4;
    };

    // Primeira página com informações do candidato
    let yPosition = renderHeader(1);
    yPosition += 6;

    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("Simulado do Exame de Suficiência", pageWidth / 2, yPosition, { align: "center" });
    yPosition += 10;

    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text("Nome: ", margin, yPosition);
    doc.line(margin + 16, yPosition + 0.5, pageWidth - margin, yPosition + 0.5);
    yPosition += 8;

    doc.text("Data: ", margin, yPosition);
    doc.text("_____/_____/_______", margin + 12, yPosition);
    doc.text("Número de Acertos: _____", pageWidth - margin - 50, yPosition);
    yPosition += 12;

    // Questões
    let currentPage = 1;
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");

    questoesAExportar.forEach((questao, index) => {
      const questaoNum = index + 1;
      const metadados = `${questao.edicao} · ${questao.banca} · Questão ${questao.questao} · ${questao.conteudo}`;

      // Verificar se precisa de nova página
      if (yPosition > pageHeight - margin - 15) {
        currentPage++;
        doc.addPage();
        yPosition = renderHeader(currentPage);
        yPosition += 6;
        // Rodapé
        doc.setFontSize(8);
        doc.setFont("helvetica", "normal");
        doc.text(`${currentPage - 1} de ${Math.ceil((questoesAExportar.length / 4) + 2)}`, pageWidth - margin - 10, pageHeight - 8, { align: "right" });
      }

      // Número e metadados da questão (2 linhas: identificação + conteúdo)
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(120, 120, 120);

      // Linha 1: Questão X: edicao · banca · Questão Y
      const identificacao = `Questão ${questaoNum}: ${questao.edicao} · ${questao.banca} · Questão ${questao.questao}`;
      doc.text(identificacao, margin, yPosition);
      yPosition += 5;

      // Linha 2: Conteúdo
      doc.text(questao.conteudo, margin, yPosition);
      yPosition += 5;

      // Enunciado (justificado, preservando quebras de linha para listas)
      const enunciadoLimpo = processarTextoQuestao(questao.enunciado);
      doc.setFontSize(12);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(0, 0, 0);

      // Divide por quebras de linha e processa cada parágrafo
      const paragrafos = enunciadoLimpo.split("\n");
      let linhasProcessadas = 0;
      paragrafos.forEach((paragrafo) => {
        const linhasParagrafo = doc.splitTextToSize(paragrafo.trim(), contentWidth);
        doc.text(linhasParagrafo, margin, yPosition, { align: "justify", maxWidth: contentWidth });
        yPosition += linhasParagrafo.length * 4.5 + 2;
        linhasProcessadas += linhasParagrafo.length;
      });
      yPosition += 2;

      // Alternativas
      const letras = ["A", "B", "C", "D"];
      letras.forEach((letra) => {
        if (yPosition > pageHeight - margin - 20) {
          currentPage++;
          doc.addPage();
          yPosition = renderHeader(currentPage);
          yPosition += 6;
          // Rodapé
          doc.setFontSize(12);
          doc.setFont("helvetica", "normal");
          doc.text(`${currentPage - 1} de ${Math.ceil((questoesAExportar.length / 4) + 2)}`, pageWidth - margin - 10, pageHeight - 8, { align: "right" });
        }
        const textoRaw = questao.alternativas[letra as "A" | "B" | "C" | "D"] || "";
        const textoLimpo = processarTextoQuestao(textoRaw);

        // Processa alternativa com quebras de linha
        const paragrafosAlt = textoLimpo.split("\n");
        let yAlt = yPosition;

        paragrafosAlt.forEach((paragrafo, idx) => {
          const prefixo = idx === 0 ? `(${letra}) ` : "";
          const linhasAlt = doc.splitTextToSize(prefixo + paragrafo.trim(), contentWidth);
          doc.setFontSize(12);
          doc.setFont("helvetica", "normal");
          doc.text(linhasAlt, margin, yAlt, { align: "justify", maxWidth: contentWidth });
          yAlt += linhasAlt.length * 4.5 + 2;
        });

        yPosition = yAlt + 1;
      });

      yPosition += 8;
    });

    // Gabarito em tabela 25x4
    currentPage++;
    doc.addPage();
    yPosition = renderHeader(currentPage);
    yPosition += 6;

    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("GABARITO", margin, yPosition);
    yPosition += 8;

    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");

    const cellWidth = contentWidth / 25;
    const cellHeight = 6;
    let xPos = margin;
    let startY = yPosition;

    // Função para desenhar célula com borda
    const desenharCelula = (x: number, y: number, width: number, height: number, texto: string, preenchimento: boolean) => {
      doc.setDrawColor(0, 0, 0);
      doc.rect(x, y, width, height);

      if (preenchimento) {
        doc.setFillColor(220, 220, 220);
        doc.rect(x, y, width, height, "F");
        doc.setDrawColor(0, 0, 0);
        doc.rect(x, y, width, height);
      }

      doc.setFontSize(12);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(0, 0, 0);
      doc.text(texto, x + width / 2, y + height / 2, { align: "center", baseline: "middle" });
    };

    // Linha 1: Números 1-25 (com preenchimento claro)
    let colX = xPos;
    for (let i = 0; i < 25; i++) {
      desenharCelula(colX, startY, cellWidth, cellHeight, `${i + 1}`, true);
      colX += cellWidth;
    }

    // Linha 2: Letras 1-25 (sem preenchimento)
    startY += cellHeight;
    colX = xPos;
    questoesAExportar.slice(0, 25).forEach((q) => {
      desenharCelula(colX, startY, cellWidth, cellHeight, q.correta, false);
      colX += cellWidth;
    });

    // Linha 3: Números 26-50 (com preenchimento claro)
    startY += cellHeight;
    colX = xPos;
    for (let i = 0; i < 25; i++) {
      desenharCelula(colX, startY, cellWidth, cellHeight, `${i + 26}`, true);
      colX += cellWidth;
    }

    // Linha 4: Letras 26-50 (sem preenchimento)
    startY += cellHeight;
    colX = xPos;
    questoesAExportar.slice(25, 50).forEach((q) => {
      desenharCelula(colX, startY, cellWidth, cellHeight, q.correta, false);
      colX += cellWidth;
    });

    // Rodapé última página
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text(`${currentPage} de ${currentPage}`, pageWidth - margin - 10, pageHeight - 8, { align: "right" });

    doc.save("simulado-exame-suficiencia.pdf");
  }

  function valoresUnicos(lista: QuestaoSimulado[], chave: "edicao" | "banca" | "conteudo") {
    return Array.from(new Set(lista.map((q) => q[chave]))).join(", ");
  }

  function registrarInicio(modo: "oficial" | "personalizado", lista: QuestaoSimulado[]) {
    // A localização (estado/cidade) é resolvida no servidor, a partir do IP
    // da requisição — nenhum dado é pedido ou coletado no navegador.
    fetch("/api/simulado/registro", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        evento: "inicio",
        modo,
        edicoes: valoresUnicos(lista, "edicao"),
        bancas: valoresUnicos(lista, "banca"),
        conteudos: valoresUnicos(lista, "conteudo"),
      }),
    }).catch(() => {});
  }

  function registrarFim(
    lista: QuestaoSimulado[],
    acertos: number,
    total: number,
    percentual: number,
    modo: "oficial" | "personalizado" | null
  ) {
    fetch("/api/simulado/registro", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        evento: "fim",
        modo: modo || "",
        edicoes: valoresUnicos(lista, "edicao"),
        bancas: valoresUnicos(lista, "banca"),
        conteudos: valoresUnicos(lista, "conteudo"),
        acertos,
        total,
        percentual: percentual.toFixed(1),
      }),
    }).catch(() => {});
  }

  // --- Tela de configuração ---
  if (fase === "config") {
    return (
      <div className="space-y-6 px-4 sm:px-0 sm:space-y-8">
        <div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-baseline sm:justify-between">
            <h1 className="text-xl font-bold sm:text-2xl">Simulado — Exame de Suficiência</h1>
            <a
              href="https://drive.google.com/drive/folders/1ysMmE_ld3ix9hXfvPH6FRXHDSqCaaaID?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 w-full sm:w-auto text-center sm:text-left"
            >
              Provas e Gabaritos
            </a>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-2">
            Pratique com questões de provas anteriores da FGV (2024.1 a 2026.1).
          </p>
        </div>

        {estatisticas && (
          <div className="space-y-4">
            {/* Simulados Oficiais */}
            {estatisticas.simuladosOficiais.total > 0 && (
              <div className="rounded-xl border border-blue-200 bg-blue-50 p-4">
                <h3 className="text-sm font-semibold text-blue-900 mb-3">Simulados Oficiais Realizados</h3>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                  <div>
                    <p className="text-xs text-blue-700">n</p>
                    <p className="text-lg font-bold text-blue-900">{estatisticas.simuladosOficiais.total}</p>
                  </div>
                  <div>
                    <p className="text-xs text-blue-700">Média</p>
                    <p className="text-lg font-bold text-blue-900">
                      {estatisticas.simuladosOficiais.media !== null
                        ? `${estatisticas.simuladosOficiais.media.toFixed(1)}%`
                        : "—"}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-blue-700">Maior</p>
                    <p className="text-lg font-bold text-blue-900">
                      {estatisticas.simuladosOficiais.maior !== null
                        ? `${estatisticas.simuladosOficiais.maior.toFixed(1)}%`
                        : "—"}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-blue-700">Menor</p>
                    <p className="text-lg font-bold text-blue-900">
                      {estatisticas.simuladosOficiais.menor !== null
                        ? `${estatisticas.simuladosOficiais.menor.toFixed(1)}%`
                        : "—"}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Simulados Personalizados */}
            {estatisticas.simuladosPersonalizados.total > 0 && (
              <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                <h3 className="text-sm font-semibold text-slate-900 mb-3">Simulados Personalizados Realizados</h3>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 mb-4">
                  <div>
                    <p className="text-xs text-slate-500">n</p>
                    <p className="text-lg font-bold text-slate-900">{estatisticas.simuladosPersonalizados.total}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Média</p>
                    <p className="text-lg font-bold text-slate-900">
                      {estatisticas.simuladosPersonalizados.media !== null
                        ? `${estatisticas.simuladosPersonalizados.media.toFixed(1)}%`
                        : "—"}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Maior</p>
                    <p className="text-lg font-bold text-slate-900">
                      {estatisticas.simuladosPersonalizados.maior !== null
                        ? `${estatisticas.simuladosPersonalizados.maior.toFixed(1)}%`
                        : "—"}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Menor</p>
                    <p className="text-lg font-bold text-slate-900">
                      {estatisticas.simuladosPersonalizados.menor !== null
                        ? `${estatisticas.simuladosPersonalizados.menor.toFixed(1)}%`
                        : "—"}
                    </p>
                  </div>
                </div>

                {/* Edições e Conteúdos Simulados */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-slate-200 pt-4">
                  <div>
                    <p className="text-xs font-semibold text-slate-500 mb-2">Edições Simuladas (top 3)</p>
                    {estatisticas.simuladosPersonalizados.edicoes.length > 0 ? (
                      <div className="space-y-1">
                        {estatisticas.simuladosPersonalizados.edicoes.map((ed) => (
                          <p key={ed} className="text-xs font-semibold text-slate-900">{ed}</p>
                        ))}
                      </div>
                    ) : (
                      <p className="text-xs text-slate-500">—</p>
                    )}
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-500 mb-2">Conteúdos Simulados (top 3)</p>
                    {estatisticas.simuladosPersonalizados.conteudos.length > 0 ? (
                      <div className="space-y-1">
                        {estatisticas.simuladosPersonalizados.conteudos.map((cont) => (
                          <p key={cont} className="text-xs font-semibold text-slate-900">{cont}</p>
                        ))}
                      </div>
                    ) : (
                      <p className="text-xs text-slate-500">—</p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        <div className="rounded-xl border border-blue-200 bg-blue-50 p-4 sm:p-5">
          <h2 className="text-sm sm:text-base font-semibold text-blue-900">Simulado oficial (50 questões)</h2>
          <p className="mt-2 text-xs sm:text-sm text-blue-800">
            Gera um simulado completo considerando essa distribuição por área
            de conteúdo: Contabilidade Geral (17), Princípios de
            Contabilidade e NBCs (5), Contabilidade Gerencial (4), Teoria da
            Contabilidade (4), Contabilidade Aplicada ao Setor Público (3),
            Noções de Direito e Legislação Aplicada (3), Legislação e Ética
            Profissional (3), Contabilidade de Custos (2), Auditoria Contábil
            (2), Língua Portuguesa Aplicada (2), Matemática Financeira e
            Estatística (2), Perícia Contábil (2), Controladoria (1).
          </p>
          <div className="mt-4 flex flex-col sm:flex-row gap-2">
            <button
              onClick={iniciarOficial}
              className="flex-1 rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
            >
              Gerar Simulado Online
            </button>
            <button
              onClick={gerarSimuladoOficialPDF}
              className="flex-1 rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
            >
              Gerar Simulado Impresso
            </button>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
          <h2 className="text-sm sm:text-base font-semibold">Simulado personalizado</h2>
          <p className="mt-1 text-xs sm:text-sm text-slate-500">
            Escolha os filtros e a quantidade de questões.
          </p>
          <div className="mt-4 flex flex-col sm:flex-row sm:flex-wrap gap-3">
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
          {(bancasFiltro.length > 0 || edicoesFiltro.length > 0) &&
          conteudosFiltro.length === 0 &&
          assuntosFiltro.length === 0 ? (
            <p className="mt-4 text-xs text-slate-500">
              Como você filtrou por banca e/ou edição sem filtrar conteúdo ou
              assunto, o simulado sairá completo — todas as {poolDisponivel}{" "}
              questões correspondentes, em ordem (por edição e, dentro dela,
              da questão 1 à 50), em vez de uma amostra aleatória.
            </p>
          ) : (
            <div className="mt-4 flex flex-col sm:flex-row sm:items-center gap-3">
              <label className="flex items-center gap-2 text-xs sm:text-sm text-slate-600">
                Quantidade de questões:
                <input
                  type="number"
                  min={1}
                  max={Math.max(1, poolDisponivel)}
                  value={quantidade}
                  onChange={(e) => setQuantidade(Number(e.target.value))}
                  className="w-16 sm:w-20 rounded-md border border-slate-300 px-2 py-1 text-sm"
                />
              </label>
              <span className="text-xs text-slate-400">
                {poolDisponivel} questões disponíveis
              </span>
            </div>
          )}
          <button
            onClick={iniciarPersonalizado}
            disabled={poolDisponivel === 0}
            className="mt-4 w-full sm:w-auto rounded-md bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800 disabled:opacity-40"
          >
            Gerar Simulado Personalizado
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
      <div className="space-y-4 px-4 sm:px-0 sm:space-y-6">
        {avisos.length > 0 && (
          <div className="rounded-lg border border-amber-200 bg-amber-50 p-3 text-xs text-amber-800">
            {avisos.map((a) => (
              <p key={a}>{a}</p>
            ))}
          </div>
        )}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs sm:text-sm text-slate-500">
            Questão {indiceAtual + 1} de {questoes.length} — {respondidas} respondidas
          </p>
          <button
            onClick={finalizar}
            className="w-full sm:w-auto rounded-md bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700"
          >
            Finalizar simulado
          </button>
        </div>

        <div className="overflow-x-auto -mx-4 sm:mx-0">
          <div className="flex gap-1 px-4 sm:px-0 pb-2">
            {questoes.map((qq, i) => (
              <button
                key={qq.id}
                onClick={() => setIndiceAtual(i)}
                className={`h-8 w-8 min-w-8 rounded text-xs font-semibold flex-shrink-0 ${
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
        </div>

        <div className="grid grid-cols-2 gap-2 sm:flex sm:justify-between">
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

        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
          <p className="mb-3 text-xs text-slate-400">
            {q.edicao} · {q.banca} · Questão {q.questao} · {q.conteudo}
          </p>
          <RenderizadorQuestao texto={q.enunciado} />
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
                <span className="flex-1">
                  <strong>({letra})</strong>{" "}
                  <RenderizadorQuestao texto={texto} compacto />
                </span>
              </label>
            ))}
          </div>
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
    <div className="space-y-6 px-4 sm:px-0 sm:space-y-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold">Resultado do Simulado</h1>
        </div>
        <button
          onClick={() => gerarPDFSimulado(questoes, modoSimulado ?? "personalizado")}
          className="w-full sm:w-auto rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
        >
          Exportar PDF
        </button>
      </div>

      <div className="grid grid-cols-3 gap-2 sm:gap-4">
        <div className="rounded-xl border border-slate-200 bg-white p-3 sm:p-5 text-center shadow-sm">
          <p className="text-xs sm:text-sm text-slate-500">Acertos</p>
          <p className="text-2xl sm:text-3xl font-bold text-green-600">{acertos}</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-3 sm:p-5 text-center shadow-sm">
          <p className="text-xs sm:text-sm text-slate-500">Erros</p>
          <p className="text-2xl sm:text-3xl font-bold text-red-600">{erros}</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-3 sm:p-5 text-center shadow-sm">
          <p className="text-xs sm:text-sm text-slate-500">Aproveitamento</p>
          <p className="text-2xl sm:text-3xl font-bold text-slate-900">{pct.toFixed(1)}%</p>
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
        <h2 className="mb-3 text-sm sm:text-base font-semibold">Desempenho por conteúdo</h2>
        <div className="overflow-x-auto -mx-4 sm:mx-0">
          <table className="w-full text-xs sm:text-sm min-w-full">
            <thead>
              <tr className="border-b border-slate-200 text-left text-slate-500">
                <th className="py-2 px-3 sm:px-4">Conteúdo</th>
                <th className="py-2 px-3 sm:px-4 text-center">Acertos</th>
                <th className="py-2 px-3 sm:px-4 text-center">Total</th>
                <th className="py-2 px-3 sm:px-4 text-center">% Acerto</th>
              </tr>
            </thead>
            <tbody>
              {Array.from(porConteudo.entries())
                .sort((a, b) => b[1].total - a[1].total)
                .map(([conteudo, v]) => (
                  <tr key={conteudo} className="border-b border-slate-100">
                    <td className="py-2 px-3 sm:px-4">{conteudo}</td>
                    <td className="py-2 px-3 sm:px-4 text-center">{v.acertos}</td>
                    <td className="py-2 px-3 sm:px-4 text-center">{v.total}</td>
                    <td className="py-2 px-3 sm:px-4 text-center font-semibold">
                      {((v.acertos / v.total) * 100).toFixed(0)}%
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
        <h2 className="mb-3 text-sm sm:text-base font-semibold">Revisão questão a questão</h2>
        <div className="max-h-[600px] space-y-3 sm:space-y-4 overflow-y-auto">
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
                  <RenderizadorQuestao texto={q.enunciado} corClasse="text-slate-700" />
                  <div className="mt-2 space-y-1">
                    {(Object.entries(q.alternativas) as [Letra, string][]).map(
                      ([letra, texto]) => {
                        const cor =
                          letra === q.correta
                            ? "text-green-700 font-semibold"
                            : letra === marcada
                            ? "text-red-700 font-semibold"
                            : "text-slate-600";
                        return (
                          <div key={letra} className="flex gap-1">
                            <strong className={`${cor} flex-shrink-0`}>({letra})</strong>
                            <div className="flex-1 min-w-0">
                              <RenderizadorQuestao texto={texto} compacto corClasse={cor} />
                            </div>
                          </div>
                        );
                      }
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
        className="w-full rounded-md bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
      >
        Fazer outro simulado
      </button>
    </div>
  );
}
