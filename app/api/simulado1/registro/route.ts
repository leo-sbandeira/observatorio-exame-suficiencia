import { NextRequest, NextResponse } from "next/server";

const IPS_LOCAIS = new Set(["127.0.0.1", "::1"]);

function ehIpPrivado(ip: string) {
  return (
    IPS_LOCAIS.has(ip) ||
    ip.startsWith("10.") ||
    ip.startsWith("192.168.") ||
    /^172\.(1[6-9]|2\d|3[0-1])\./.test(ip)
  );
}

function obterIp(req: NextRequest): string | null {
  const encaminhado = req.headers.get("x-forwarded-for");
  if (encaminhado) return encaminhado.split(",")[0].trim();
  return req.headers.get("x-real-ip");
}

async function geolocalizar(ip: string): Promise<{ estado: string; cidade: string }> {
  if (!ip || ehIpPrivado(ip)) {
    return { estado: "desconhecido (rede local)", cidade: "desconhecido (rede local)" };
  }
  try {
    const resp = await fetch(`https://ipwho.is/${ip}`, {
      // evita que uma geolocalização lenta atrase demais o registro
      signal: AbortSignal.timeout(4000),
    });
    const dados = await resp.json();
    if (!dados.success) return { estado: "desconhecido", cidade: "desconhecido" };
    return {
      estado: dados.region || "desconhecido",
      cidade: dados.city || "desconhecido",
    };
  } catch {
    return { estado: "desconhecido", cidade: "desconhecido" };
  }
}

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
