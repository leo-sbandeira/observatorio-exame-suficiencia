import { NextRequest } from "next/server";

const IPS_LOCAIS = new Set(["127.0.0.1", "::1"]);

function ehIpPrivado(ip: string) {
  return (
    IPS_LOCAIS.has(ip) ||
    ip.startsWith("10.") ||
    ip.startsWith("192.168.") ||
    /^172\.(1[6-9]|2\d|3[0-1])\./.test(ip)
  );
}

export function obterIp(req: NextRequest): string | null {
  const encaminhado = req.headers.get("x-forwarded-for");
  if (encaminhado) return encaminhado.split(",")[0].trim();
  return req.headers.get("x-real-ip");
}

export async function geolocalizar(ip: string): Promise<{ estado: string; cidade: string }> {
  if (!ip || ehIpPrivado(ip)) {
    return { estado: "desconhecido (rede local)", cidade: "desconhecido (rede local)" };
  }
  try {
    const resp = await fetch(`https://ipwho.is/${ip}`, {
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
