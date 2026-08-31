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
"[project]/app/api/conteudo/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$csv$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/csv.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$types$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/types.ts [app-route] (ecmascript)");
;
;
;
async function GET(req) {
    try {
        const raw = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$csv$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["fetchAba"])("conteudoStats");
        let dados = raw.map(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$types$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["normalizaConteudoStats"]).filter((d)=>d.edicao);
        const { searchParams } = new URL(req.url);
        const regioes = searchParams.get("regioes")?.split(",").filter(Boolean);
        const edicoes = searchParams.get("edicoes")?.split(",").filter(Boolean);
        if (regioes?.length) dados = dados.filter((d)=>regioes.includes(d.regiao));
        if (edicoes?.length) dados = dados.filter((d)=>edicoes.includes(d.edicao));
        const regioesDisponiveis = Array.from(new Set(raw.map((r)=>(r["Região"] ?? "").trim()).filter(Boolean))).sort();
        const conteudosDisponiveis = Array.from(new Set(raw.map((r)=>(r["Conteúdo"] ?? "").trim()).filter(Boolean))).sort();
        const edicoesDisponiveis = Array.from(new Set(raw.map((r)=>(r["Edição"] ?? "").trim()).filter(Boolean))).sort();
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            total: dados.length,
            dados,
            filtrosDisponiveis: {
                regioes: regioesDisponiveis,
                conteudos: conteudosDisponiveis,
                edicoes: edicoesDisponiveis
            }
        });
    } catch (err) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            erro: err instanceof Error ? err.message : "Erro desconhecido"
        }, {
            status: 500
        });
    }
}
}),
"[project]/lib/config.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Configuração da fonte de dados (Google Sheets publicado como CSV).
// Preencha o SHEET_ID e os GIDs de cada aba no arquivo .env.local
// (veja README.md para o passo a passo de como obter cada valor).
__turbopack_context__.s([
    "GIDS",
    ()=>GIDS,
    "REVALIDATE_SECONDS",
    ()=>REVALIDATE_SECONDS,
    "SHEET_ID",
    ()=>SHEET_ID
]);
const SHEET_ID = process.env.SHEET_ID ?? "";
const GIDS = {
    geral: process.env.GID_GERAL ?? "",
    ies: process.env.GID_IES ?? "",
    conteudoStats: process.env.GID_CONTEUDO_STATS ?? "",
    conteudosCobrados: process.env.GID_CONTEUDOS_COBRADOS ?? "",
    conteudoNacional: process.env.GID_CONTEUDO_NACIONAL ?? ""
};
const REVALIDATE_SECONDS = 60 * 60; // 1 hora
}),
"[project]/lib/csv.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "fetchAba",
    ()=>fetchAba,
    "parseNumeroBR",
    ()=>parseNumeroBR
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$papaparse$2f$papaparse$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/papaparse/papaparse.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$config$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/config.ts [app-route] (ecmascript)");
;
;
function parseNumeroBR(valor) {
    if (valor === null || valor === undefined) return null;
    let s = String(valor).trim();
    if (s === "") return null;
    const isPercent = s.includes("%");
    s = s.replace("%", "").trim();
    // remove separador de milhar (ponto) e troca vírgula decimal por ponto
    s = s.replace(/\.(?=\d{3}(\D|$))/g, "").replace(",", ".");
    const n = parseFloat(s);
    if (Number.isNaN(n)) return null;
    return isPercent ? n / 100 : n;
}
async function fetchCsvRaw(gid) {
    if (!__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$config$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SHEET_ID"] || !gid) {
        throw new Error("SHEET_ID ou GID não configurados. Confira o arquivo .env.local (veja README.md).");
    }
    const url = `https://docs.google.com/spreadsheets/d/${__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$config$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SHEET_ID"]}/export?format=csv&gid=${gid}`;
    const res = await fetch(url, {
        next: {
            revalidate: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$config$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["REVALIDATE_SECONDS"]
        }
    });
    if (!res.ok) {
        throw new Error(`Não foi possível ler a planilha (status ${res.status}). Verifique se o compartilhamento está como "Qualquer pessoa com o link - Leitor".`);
    }
    return res.text();
}
async function fetchAba(aba) {
    const gid = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$config$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["GIDS"][aba];
    const csvText = await fetchCsvRaw(gid);
    const parsed = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$papaparse$2f$papaparse$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].parse(csvText, {
        header: true,
        skipEmptyLines: true
    });
    return parsed.data.filter(Boolean);
}
}),
"[project]/lib/types.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "normalizaConteudoCobrado",
    ()=>normalizaConteudoCobrado,
    "normalizaConteudoNacional",
    ()=>normalizaConteudoNacional,
    "normalizaConteudoStats",
    ()=>normalizaConteudoStats,
    "normalizaGeral",
    ()=>normalizaGeral,
    "normalizaIES",
    ()=>normalizaIES
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$csv$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/csv.ts [app-route] (ecmascript)");
;
function normalizaGeral(raw) {
    return {
        edicao: (raw["Edição"] ?? "").trim(),
        regiao: (raw["Região"] ?? "").trim(),
        inscritos: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$csv$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseNumeroBR"])(raw["Inscritos"]),
        presentes: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$csv$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseNumeroBR"])(raw["Presentes"]),
        aprovados: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$csv$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseNumeroBR"])(raw["Aprovados"]),
        pctAprovados: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$csv$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseNumeroBR"])(raw["(%) Aprovados"]),
        reprovados: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$csv$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseNumeroBR"])(raw["Reprovados"]),
        pctReprovados: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$csv$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseNumeroBR"])(raw["(%) Reprovados"]),
        ausentes: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$csv$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseNumeroBR"])(raw["Ausentes"]),
        pctAusentes: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$csv$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseNumeroBR"])(raw["(%) Ausentes"])
    };
}
function normalizaIES(raw) {
    return {
        edicao: (raw["Edição"] ?? "").trim(),
        ies: (raw["IES"] ?? "").trim(),
        sigla: (raw["Sigla"] ?? "").trim(),
        uf: (raw["UF"] ?? "").trim(),
        cidade: (raw["Cidade"] ?? "").trim(),
        modalidade: (raw["Modalidade"] ?? "").trim(),
        inscritos: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$csv$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseNumeroBR"])(raw["Inscritos"]),
        presentes: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$csv$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseNumeroBR"])(raw["Presentes"]),
        aprovados: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$csv$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseNumeroBR"])(raw["Aprovados"]),
        pctAprovadosPresentes: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$csv$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseNumeroBR"])(raw["% Aprovados/Presentes"]),
        reprovados: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$csv$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseNumeroBR"])(raw["Reprovados"]),
        pctReprovadosPresentes: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$csv$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseNumeroBR"])(raw["% Reprovados/Presentes"]),
        ausentes: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$csv$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseNumeroBR"])(raw["Ausentes"]),
        pctAusentesInscritos: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$csv$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseNumeroBR"])(raw["% Ausentes/Inscritos"])
    };
}
function normalizaConteudoStats(raw) {
    return {
        edicao: (raw["Edição"] ?? "").trim(),
        regiao: (raw["Região"] ?? "").trim(),
        conteudo: (raw["Conteúdo"] ?? "").trim(),
        totalQuestoes: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$csv$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseNumeroBR"])(raw["Total de Questões"]),
        totalRespostas: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$csv$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseNumeroBR"])(raw["Total de Respostas"]),
        totalAcertos: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$csv$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseNumeroBR"])(raw["Total de Acertos"]),
        pctAcertos: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$csv$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseNumeroBR"])(raw["(%) Acertos"]),
        totalErros: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$csv$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseNumeroBR"])(raw["Total de Erros"]),
        pctErros: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$csv$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseNumeroBR"])(raw["(%) Erros"])
    };
}
function normalizaConteudoCobrado(raw) {
    return {
        edicao: (raw["Edição"] ?? "").trim(),
        banca: (raw["Banca"] ?? "").trim(),
        questao: (raw["Questão"] ?? "").trim(),
        conteudo: (raw["Conteúdo"] ?? "").trim(),
        assunto: (raw["Assunto"] ?? "").trim(),
        tema: (raw["Tema"] ?? "").trim()
    };
}
function normalizaConteudoNacional(raw) {
    return {
        edicao: (raw["Edição"] ?? "").trim(),
        conteudo: (raw["Conteúdo"] ?? "").trim(),
        totalQuestoes: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$csv$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseNumeroBR"])(raw["Total de Questões"]),
        totalRespostas: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$csv$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseNumeroBR"])(raw["Total de Respostas"]),
        totalAcertos: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$csv$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseNumeroBR"])(raw["Total de Acertos"]),
        pctAcertos: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$csv$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseNumeroBR"])(raw["(%) Acertos"]),
        totalErros: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$csv$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseNumeroBR"])(raw["Total de Erros"]),
        pctErros: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$csv$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseNumeroBR"])(raw["(%) Erros"])
    };
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__1cjkxo-._.js.map