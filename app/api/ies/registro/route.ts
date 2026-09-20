import { NextRequest, NextResponse } from "next/server";
import { obterIp, geolocalizar } from "@/lib/geolocalizar";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const url = process.env.SIMULADO_WEBHOOK_URL;

    if (!url) {
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
        pagina: "ies",
        evento: String(body.evento ?? "busca").slice(0, 20),
        modo: "",
        edicoes: String(body.edicao ?? "").slice(0, 40),
        bancas: "",
        conteudos: "",
        ies: String(body.ies ?? "").slice(0, 400),
        uf: String(body.uf ?? "").slice(0, 10),
        formato: String(body.formato ?? "").slice(0, 20),
        acertos: "",
        total: "",
        percentual: "",
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
