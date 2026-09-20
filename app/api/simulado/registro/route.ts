import { NextRequest, NextResponse } from "next/server";
import { obterIp, geolocalizar } from "@/lib/geolocalizar";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const url = process.env.SIMULADO_WEBHOOK_URL;

    if (!url) {
      // Sem webhook configurado: não bloqueia o simulado, apenas não registra.
      return NextResponse.json({ ok: false, aviso: "Webhook não configurado" });
    }

    const ip = obterIp(req);
    const { estado, cidade } = await geolocalizar(ip ?? "");

    const resposta = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        dataHora: new Date().toISOString(),
        estado,
        cidade,
        pagina: "simulado",
        evento: String(body.evento ?? "inicio").slice(0, 20),
        modo: String(body.modo ?? "").slice(0, 40),
        edicoes: String(body.edicoes ?? "").slice(0, 200),
        bancas: String(body.bancas ?? "").slice(0, 100),
        conteudos: String(body.conteudos ?? "").slice(0, 400),
        ies: "",
        uf: "",
        formato: "",
        acertos: body.acertos ?? "",
        total: body.total ?? "",
        percentual: body.percentual ?? "",
      }),
    });

    if (!resposta.ok) {
      throw new Error(`Webhook respondeu ${resposta.status}`);
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json(
      { ok: false, erro: err instanceof Error ? err.message : "erro desconhecido" },
      { status: 200 }
    );
  }
}
