import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export interface ColunaExport {
  chave: string;
  titulo: string;
}

function valorCelula(item: Record<string, unknown>, chave: string): string {
  const v = item[chave];
  if (v === null || v === undefined) return "";
  return String(v);
}

function baixarArquivo(conteudo: BlobPart, nomeArquivo: string, tipo: string) {
  const blob = new Blob([conteudo], { type: tipo });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = nomeArquivo;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

async function carregarLogoBase64(): Promise<string | null> {
  try {
    const resp = await fetch("/logo-icone.png");
    if (!resp.ok) return null;
    const blob = await resp.blob();
    return await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch {
    return null;
  }
}

export function exportarCSV(
  dados: Record<string, unknown>[],
  colunas: ColunaExport[],
  nomeArquivo: string,
  notasRodape: string[] = []
) {
  const linhas = [colunas.map((c) => c.titulo).join(";")];
  for (const item of dados) {
    linhas.push(
      colunas
        .map((c) => `"${valorCelula(item, c.chave).replace(/"/g, '""')}"`)
        .join(";")
    );
  }
  if (notasRodape.length) {
    linhas.push("");
    for (const nota of notasRodape) linhas.push(`"${nota.replace(/"/g, '""')}"`);
  }
  // \uFEFF (BOM) garante acentuação correta ao abrir no Excel
  baixarArquivo("\uFEFF" + linhas.join("\n"), nomeArquivo, "text/csv;charset=utf-8");
}

export function exportarExcel(
  dados: Record<string, unknown>[],
  colunas: ColunaExport[],
  nomeArquivo: string,
  notasRodape: string[] = []
) {
  const linhas = dados.map((item) => {
    const linha: Record<string, string> = {};
    for (const c of colunas) linha[c.titulo] = valorCelula(item, c.chave);
    return linha;
  });
  const planilha = XLSX.utils.json_to_sheet(linhas);
  if (notasRodape.length) {
    const inicioNotas = linhas.length + 2; // +1 cabeçalho, +1 linha em branco
    notasRodape.forEach((nota, i) => {
      XLSX.utils.sheet_add_aoa(planilha, [[nota]], {
        origin: { r: inicioNotas + i, c: 0 },
      });
    });
  }
  const livro = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(livro, planilha, "Dados");
  XLSX.writeFile(livro, nomeArquivo);
}

export async function exportarPDF(
  dados: Record<string, unknown>[],
  colunas: ColunaExport[],
  titulo: string,
  nomeArquivo: string,
  notasRodape: string[] = []
) {
  const doc = new jsPDF({ orientation: "landscape" });
  const logoBase64 = await carregarLogoBase64();
  const larguraPagina = doc.internal.pageSize.getWidth();
  const alturaPagina = doc.internal.pageSize.getHeight();
  const margemLateral = 14;

  function desenharCabecalho() {
    const inicioTexto = margemLateral + (logoBase64 ? 14 : 0);
    if (logoBase64) {
      try {
        doc.addImage(logoBase64, "PNG", margemLateral, 6, 11, 12.6);
      } catch {
        // se a imagem falhar, segue sem logo
      }
    }
    doc.setFontSize(13);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(15, 23, 42);
    doc.text("Observatório do Exame de Suficiência", inicioTexto, 12);
    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(71, 85, 105);
    doc.text(titulo, inicioTexto, 18);
    doc.setDrawColor(203, 213, 225);
    doc.line(margemLateral, 22, larguraPagina - margemLateral, 22);
  }

  function desenharNotasRodape() {
    if (!notasRodape.length) return;
    const alturaBase = alturaPagina - 10 - notasRodape.length * 3.2;
    doc.setDrawColor(203, 213, 225);
    doc.line(margemLateral, alturaBase - 3, larguraPagina - margemLateral, alturaBase - 3);
    doc.setFontSize(6.5);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(100, 116, 139);
    let y = alturaBase;
    for (const nota of notasRodape) {
      doc.text(nota, margemLateral, y, { maxWidth: larguraPagina - margemLateral * 2 });
      y += 3.2;
    }
  }

  desenharCabecalho();
  autoTable(doc, {
    startY: 26,
    head: [colunas.map((c) => c.titulo)],
    body: dados.map((item) => colunas.map((c) => valorCelula(item, c.chave))),
    styles: { fontSize: 7 },
    headStyles: { fillColor: [15, 23, 42] },
    margin: { top: 26, bottom: notasRodape.length ? 22 : 14 },
    didDrawPage: () => {
      desenharCabecalho();
      desenharNotasRodape();
    },
  });

  // "Página X de Y" só pode ser escrito com o total certo depois que todas
  // as páginas já foram geradas pelo autoTable.
  const totalPaginas = doc.getNumberOfPages();
  for (let i = 1; i <= totalPaginas; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(100, 116, 139);
    doc.text(`Página ${i} de ${totalPaginas}`, larguraPagina - margemLateral, alturaPagina - 6, {
      align: "right",
    });
  }

  doc.save(nomeArquivo);
}
