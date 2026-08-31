import type { MetadataRoute } from "next";

const BASE_URL = "https://observatoriosuficiencia.com.br";

export default function sitemap(): MetadataRoute.Sitemap {
  const rotas = ["", "/sobre", "/ies", "/conteudos", "/simulado"];
  return rotas.map((rota) => ({
    url: `${BASE_URL}${rota}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: rota === "" ? 1 : 0.7,
  }));
}
