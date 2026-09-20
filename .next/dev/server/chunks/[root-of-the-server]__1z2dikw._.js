module.exports = [
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/action-async-storage.external.js [external] (next/dist/server/app-render/action-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/action-async-storage.external.js", () => require("next/dist/server/app-render/action-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/runtime-reacts.external.js [external] (next/dist/server/runtime-reacts.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/runtime-reacts.external.js", () => require("next/dist/server/runtime-reacts.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/node:stream [external] (node:stream, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("node:stream", () => require("node:stream"));

module.exports = mod;
}),
"[externals]/stream [external] (stream, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("stream", () => require("stream"));

module.exports = mod;
}),
"[project]/app/api/simulado/estatisticas/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$estatisticas$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/estatisticas.ts [app-route] (ecmascript)");
;
;
function calcularEstatisticas(linhas) {
    const percentuais = linhas.map((l)=>parseFloat(l.percentual.replace(",", "."))).filter((n)=>!Number.isNaN(n));
    const media = percentuais.length ? percentuais.reduce((a, b)=>a + b, 0) / percentuais.length : null;
    const maior = percentuais.length ? Math.max(...percentuais) : null;
    const menor = percentuais.length ? Math.min(...percentuais) : null;
    const edicoes = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$estatisticas$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["tresMaisFrequentes"])(linhas.map((l)=>l.edicoes));
    const conteudos = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$estatisticas$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["tresMaisFrequentes"])(linhas.map((l)=>l.conteudos));
    return {
        total: linhas.length,
        media,
        maior,
        menor,
        edicoes: edicoes.map((e)=>`${e.valor} (${e.contagem})`),
        conteudos: conteudos.map((c)=>`${c.valor} (${c.contagem})`)
    };
}
async function GET() {
    const linhas = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$estatisticas$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["buscarLinhasEstatisticas"])();
    const concluidos = linhas.filter((l)=>l.pagina === "simulado" && l.evento === "fim");
    const oficiais = concluidos.filter((l)=>l.modo === "oficial");
    const personalizados = concluidos.filter((l)=>l.modo === "personalizado");
    const statsOficiais = calcularEstatisticas(oficiais);
    const statsPersonalizados = calcularEstatisticas(personalizados);
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
        simuladosOficiais: {
            total: statsOficiais.total,
            media: statsOficiais.media,
            maior: statsOficiais.maior,
            menor: statsOficiais.menor
        },
        simuladosPersonalizados: {
            total: statsPersonalizados.total,
            media: statsPersonalizados.media,
            maior: statsPersonalizados.maior,
            menor: statsPersonalizados.menor,
            edicoes: statsPersonalizados.edicoes,
            conteudos: statsPersonalizados.conteudos
        }
    });
}
}),
"[project]/lib/estatisticas.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "buscarLinhasEstatisticas",
    ()=>buscarLinhasEstatisticas,
    "maisFrequente",
    ()=>maisFrequente,
    "tresMaisFrequentes",
    ()=>tresMaisFrequentes
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$papaparse$2f$papaparse$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/papaparse/papaparse.js [app-route] (ecmascript)");
;
const REVALIDATE_SEGUNDOS = 300; // 5 minutos
async function buscarLinhasEstatisticas() {
    const sheetId = process.env.SIMULADO_STATS_SHEET_ID;
    const gid = process.env.SIMULADO_STATS_GID ?? "0";
    if (!sheetId) return [];
    try {
        const url = `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=csv&gid=${gid}`;
        const res = await fetch(url, {
            next: {
                revalidate: REVALIDATE_SEGUNDOS
            }
        });
        if (!res.ok) return [];
        const texto = await res.text();
        const parsed = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$papaparse$2f$papaparse$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].parse(texto, {
            header: true,
            skipEmptyLines: true
        });
        return parsed.data.map((r)=>({
                pagina: (r["Pagina"] ?? r["Página"] ?? "").trim(),
                evento: (r["Evento"] ?? "").trim(),
                modo: (r["Modo"] ?? "").trim(),
                edicoes: (r["Edicoes"] ?? r["Edições"] ?? "").trim(),
                bancas: (r["Bancas"] ?? "").trim(),
                conteudos: (r["Conteudos"] ?? r["Conteúdos"] ?? "").trim(),
                ies: (r["IES"] ?? "").trim(),
                uf: (r["UF"] ?? "").trim(),
                formato: (r["Formato"] ?? "").trim(),
                percentual: (r["Percentual"] ?? "").trim()
            }));
    } catch  {
        return [];
    }
}
function maisFrequente(linhas) {
    const contagem = new Map();
    for (const linha of linhas){
        for (const v of linha.split(",").map((x)=>x.trim()).filter(Boolean)){
            contagem.set(v, (contagem.get(v) ?? 0) + 1);
        }
    }
    let melhorValor = null;
    let melhorContagem = 0;
    for (const [valor, c] of contagem.entries()){
        if (c > melhorContagem) {
            melhorValor = valor;
            melhorContagem = c;
        }
    }
    return melhorValor ? {
        valor: melhorValor,
        contagem: melhorContagem
    } : null;
}
function tresMaisFrequentes(linhas) {
    const contagem = new Map();
    for (const linha of linhas){
        for (const v of linha.split(",").map((x)=>x.trim()).filter(Boolean)){
            contagem.set(v, (contagem.get(v) ?? 0) + 1);
        }
    }
    const ordenado = Array.from(contagem.entries()).map(([valor, cnt])=>({
            valor,
            contagem: cnt
        })).sort((a, b)=>b.contagem - a.contagem).slice(0, 3);
    return ordenado;
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__1z2dikw._.js.map