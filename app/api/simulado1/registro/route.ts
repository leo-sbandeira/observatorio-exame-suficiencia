import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const url = process.env.SIMULADO_WEBHOOK_URL;

    if (!url) {
      // Sem webhook configurado: não bloqueia o simulado, apenas não registra.
      return NextResponse.json({ ok: false, aviso: "Webhook não configurado" });
    }

    const resposta = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        dataHora: new Date().toISOString(),
        estado: String(body.estado ?? "").slice(0, 5),
        cidade: String(body.cidade ?? "").slice(0, 120),
        instituicao: String(body.instituicao ?? "").slice(0, 200),
        modo: String(body.modo ?? "").slice(0, 40),
      }),
    });

    if (!resposta.ok) {
      throw new Error(`Webhook respondeu ${resposta.status}`);
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    // Falha ao registrar não deve impedir o aluno de fazer o simulado.
    return NextResponse.json(
      { ok: false, erro: err instanceof Error ? err.message : "erro desconhecido" },
      { status: 200 }
    );
  }
}
