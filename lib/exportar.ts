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

export function exportarCSV(
  dados: Record<string, unknown>[],
  colunas: ColunaExport[],
  nomeArquivo: string
) {
  const linhas = [colunas.map((c) => c.titulo).join(";")];
  for (const item of dados) {
    linhas.push(
      colunas
        .map((c) => `"${valorCelula(item, c.chave).replace(/"/g, '""')}"`)
        .join(";")
    );
  }
  // \uFEFF (BOM) garante acentuação correta ao abrir no Excel
  baixarArquivo("\uFEFF" + linhas.join("\n"), nomeArquivo, "text/csv;charset=utf-8");
}

export function exportarExcel(
  dados: Record<string, unknown>[],
  colunas: ColunaExport[],
  nomeArquivo: string
) {
  const linhas = dados.map((item) => {
    const linha: Record<string, string> = {};
    for (const c of colunas) linha[c.titulo] = valorCelula(item, c.chave);
    return linha;
  });
  const planilha = XLSX.utils.json_to_sheet(linhas);
  const livro = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(livro, planilha, "Dados");
  XLSX.writeFile(livro, nomeArquivo);
}

export function exportarPDF(
  dados: Record<string, unknown>[],
  colunas: ColunaExport[],
  titulo: string,
  nomeArquivo: string
) {
  const doc = new jsPDF({ orientation: "landscape" });
  doc.setFontSize(12);
  doc.text(titulo, 14, 12);
  autoTable(doc, {
    startY: 18,
    head: [colunas.map((c) => c.titulo)],
    body: dados.map((item) => colunas.map((c) => valorCelula(item, c.chave))),
    styles: { fontSize: 7 },
    headStyles: { fillColor: [15, 23, 42] },
  });
  doc.save(nomeArquivo);
}
