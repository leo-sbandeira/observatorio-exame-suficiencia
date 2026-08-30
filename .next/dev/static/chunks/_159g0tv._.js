(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/app/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Home
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$LineChart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/chart/LineChart.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Line$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/Line.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$XAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/XAxis.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$YAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/YAxis.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$CartesianGrid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/CartesianGrid.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/component/Tooltip.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Legend$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/component/Legend.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/component/ResponsiveContainer.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$ReferenceLine$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/ReferenceLine.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$LabelList$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/component/LabelList.js [app-client] (ecmascript)");
(()=>{
    const e = new Error("Cannot find module '@/components/MultiSelect'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$regioes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/regioes.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
const CORES = [
    "#0f172a",
    "#dc2626",
    "#2563eb",
    "#16a34a",
    "#9333ea",
    "#ea580c"
];
function nomeRegiao(r) {
    return r === "BR" ? "Brasil" : r;
}
function formatPct(v, casas = 1) {
    if (v === null || v === undefined) return "—";
    return (v * 100).toLocaleString("pt-BR", {
        maximumFractionDigits: casas
    }) + "%";
}
function formatNum(v) {
    if (v === null || v === undefined) return "—";
    return v.toLocaleString("pt-BR");
}
function media(valores) {
    const validos = valores.filter((v)=>v !== null);
    if (!validos.length) return null;
    return validos.reduce((a, b)=>a + b, 0) / validos.length;
}
function variacao(atual, anterior) {
    if (atual === null || anterior === null || anterior === undefined || anterior === 0) return null;
    return (atual - anterior) / anterior;
}
function CelulaComVariacao({ valor, delta }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
        className: "py-2 pr-4",
        children: [
            formatNum(valor),
            " ",
            delta !== null && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: delta > 0 ? "text-xs font-medium text-green-600" : delta < 0 ? "text-xs font-medium text-red-600" : "text-xs font-medium text-slate-400",
                children: [
                    "(",
                    delta > 0 ? "+" : "",
                    formatPct(delta),
                    ")"
                ]
            }, void 0, true, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 57,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/page.tsx",
        lineNumber: 54,
        columnNumber: 5
    }, this);
}
_c = CelulaComVariacao;
function Home() {
    _s();
    const [dados, setDados] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [carregando, setCarregando] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [erro, setErro] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [regioesFiltro, setRegioesFiltro] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([
        "BR"
    ]);
    const [edicoesFiltro, setEdicoesFiltro] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Home.useEffect": ()=>{
            fetch("/api/geral").then({
                "Home.useEffect": (r)=>r.json()
            }["Home.useEffect"]).then({
                "Home.useEffect": (json)=>{
                    if (json.erro) setErro(json.erro);
                    else setDados(json.dados);
                }
            }["Home.useEffect"]).catch({
                "Home.useEffect": (e)=>setErro(String(e))
            }["Home.useEffect"]).finally({
                "Home.useEffect": ()=>setCarregando(false)
            }["Home.useEffect"]);
        }
    }["Home.useEffect"], []);
    // Agrega os estados em suas 5 grandes regiões geográficas (Norte,
    // Nordeste, Centro-Oeste, Sudeste, Sul), somando os valores absolutos e
    // recalculando os percentuais sobre a soma.
    const dadosCompletos = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Home.useMemo[dadosCompletos]": ()=>{
            const somaPorEdicaoRegiao = new Map();
            for (const d of dados){
                const grande = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$regioes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GRANDE_REGIAO_POR_UF"][d.regiao];
                if (!grande) continue;
                const chave = `${d.edicao}|${grande}`;
                const atual = somaPorEdicaoRegiao.get(chave) ?? {
                    inscritos: 0,
                    presentes: 0,
                    aprovados: 0,
                    reprovados: 0,
                    ausentes: 0
                };
                atual.inscritos += d.inscritos ?? 0;
                atual.presentes += d.presentes ?? 0;
                atual.aprovados += d.aprovados ?? 0;
                atual.reprovados += d.reprovados ?? 0;
                atual.ausentes += d.ausentes ?? 0;
                somaPorEdicaoRegiao.set(chave, atual);
            }
            const agregados = Array.from(somaPorEdicaoRegiao.entries()).map({
                "Home.useMemo[dadosCompletos].agregados": ([chave, v])=>{
                    const [edicao, regiao] = chave.split("|");
                    return {
                        edicao,
                        regiao,
                        inscritos: v.inscritos,
                        presentes: v.presentes,
                        aprovados: v.aprovados,
                        pctAprovados: v.presentes ? v.aprovados / v.presentes : null,
                        reprovados: v.reprovados,
                        pctReprovados: v.presentes ? v.reprovados / v.presentes : null,
                        ausentes: v.ausentes,
                        pctAusentes: v.inscritos ? v.ausentes / v.inscritos : null
                    };
                }
            }["Home.useMemo[dadosCompletos].agregados"]);
            return [
                ...dados,
                ...agregados
            ];
        }
    }["Home.useMemo[dadosCompletos]"], [
        dados
    ]);
    const ufsDisponiveis = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Home.useMemo[ufsDisponiveis]": ()=>Array.from(new Set(dados.filter({
                "Home.useMemo[ufsDisponiveis]": (d)=>d.regiao !== "BR"
            }["Home.useMemo[ufsDisponiveis]"]).map({
                "Home.useMemo[ufsDisponiveis]": (d)=>d.regiao
            }["Home.useMemo[ufsDisponiveis]"]))).sort()
    }["Home.useMemo[ufsDisponiveis]"], [
        dados
    ]);
    const edicoesDisponiveis = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Home.useMemo[edicoesDisponiveis]": ()=>Array.from(new Set(dados.map({
                "Home.useMemo[edicoesDisponiveis]": (d)=>d.edicao
            }["Home.useMemo[edicoesDisponiveis]"]))).sort()
    }["Home.useMemo[edicoesDisponiveis]"], [
        dados
    ]);
    const opcoesRegiao = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Home.useMemo[opcoesRegiao]": ()=>[
                {
                    value: "BR",
                    label: "Brasil"
                },
                ...__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$regioes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GRANDES_REGIOES"].map({
                    "Home.useMemo[opcoesRegiao]": (r)=>({
                            value: r,
                            label: r
                        })
                }["Home.useMemo[opcoesRegiao]"]),
                ...ufsDisponiveis.map({
                    "Home.useMemo[opcoesRegiao]": (uf)=>({
                            value: uf,
                            label: uf
                        })
                }["Home.useMemo[opcoesRegiao]"])
            ]
    }["Home.useMemo[opcoesRegiao]"], [
        ufsDisponiveis
    ]);
    const opcoesEdicao = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Home.useMemo[opcoesEdicao]": ()=>edicoesDisponiveis.map({
                "Home.useMemo[opcoesEdicao]": (ed)=>({
                        value: ed,
                        label: ed
                    })
            }["Home.useMemo[opcoesEdicao]"])
    }["Home.useMemo[opcoesEdicao]"], [
        edicoesDisponiveis
    ]);
    const seriePorRegiao = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Home.useMemo[seriePorRegiao]": ()=>{
            const mapa = new Map();
            for (const d of dadosCompletos){
                const arr = mapa.get(d.regiao) ?? [];
                arr.push(d);
                mapa.set(d.regiao, arr);
            }
            for (const arr of mapa.values())arr.sort({
                "Home.useMemo[seriePorRegiao]": (a, b)=>a.edicao.localeCompare(b.edicao)
            }["Home.useMemo[seriePorRegiao]"]);
            return mapa;
        }
    }["Home.useMemo[seriePorRegiao]"], [
        dadosCompletos
    ]);
    const regioesParaExibir = regioesFiltro.length ? regioesFiltro : [
        "BR",
        ...__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$regioes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GRANDES_REGIOES"],
        ...ufsDisponiveis
    ];
    const linhasTabela = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Home.useMemo[linhasTabela]": ()=>{
            const linhas = [];
            for (const regiao of regioesParaExibir){
                const serie = seriePorRegiao.get(regiao) ?? [];
                serie.forEach({
                    "Home.useMemo[linhasTabela]": (atual, i)=>{
                        if (edicoesFiltro.length && !edicoesFiltro.includes(atual.edicao)) return;
                        const anterior = i > 0 ? serie[i - 1] : undefined;
                        linhas.push({
                            regiao,
                            edicao: atual.edicao,
                            inscritos: atual.inscritos,
                            deltaInscritos: variacao(atual.inscritos, anterior?.inscritos),
                            presentes: atual.presentes,
                            deltaPresentes: variacao(atual.presentes, anterior?.presentes),
                            aprovados: atual.aprovados,
                            deltaAprovados: variacao(atual.aprovados, anterior?.aprovados),
                            reprovados: atual.reprovados,
                            deltaReprovados: variacao(atual.reprovados, anterior?.reprovados),
                            ausentes: atual.ausentes,
                            deltaAusentes: variacao(atual.ausentes, anterior?.ausentes)
                        });
                    }
                }["Home.useMemo[linhasTabela]"]);
            }
            return linhas;
        }
    }["Home.useMemo[linhasTabela]"], [
        regioesParaExibir,
        seriePorRegiao,
        edicoesFiltro
    ]);
    // --- Gráfico de evolução ---
    const nacional = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Home.useMemo[nacional]": ()=>dados.filter({
                "Home.useMemo[nacional]": (d)=>d.regiao === "BR"
            }["Home.useMemo[nacional]"]).sort({
                "Home.useMemo[nacional]": (a, b)=>a.edicao.localeCompare(b.edicao)
            }["Home.useMemo[nacional]"])
    }["Home.useMemo[nacional]"], [
        dados
    ]);
    const regioesNoGrafico = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Home.useMemo[regioesNoGrafico]": ()=>{
            const base = regioesFiltro.length ? regioesFiltro.slice(0, 6) : [
                "BR"
            ];
            return base.includes("BR") ? base : [
                "BR",
                ...base
            ].slice(0, 6);
        }
    }["Home.useMemo[regioesNoGrafico]"], [
        regioesFiltro
    ]);
    const dadosGrafico = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Home.useMemo[dadosGrafico]": ()=>{
            return edicoesDisponiveis.map({
                "Home.useMemo[dadosGrafico]": (ed)=>{
                    const linha = {
                        edicao: ed
                    };
                    for (const regiao of regioesNoGrafico){
                        const item = dadosCompletos.find({
                            "Home.useMemo[dadosGrafico].item": (d)=>d.edicao === ed && d.regiao === regiao
                        }["Home.useMemo[dadosGrafico].item"]);
                        linha[nomeRegiao(regiao)] = item ? item.pctAprovados ?? null : null;
                    }
                    return linha;
                }
            }["Home.useMemo[dadosGrafico]"]);
        }
    }["Home.useMemo[dadosGrafico]"], [
        edicoesDisponiveis,
        dadosCompletos,
        regioesNoGrafico
    ]);
    const mediaHistoricaBR = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Home.useMemo[mediaHistoricaBR]": ()=>media(nacional.map({
                "Home.useMemo[mediaHistoricaBR]": (d)=>d.pctAprovados
            }["Home.useMemo[mediaHistoricaBR]"]))
    }["Home.useMemo[mediaHistoricaBR]"], [
        nacional
    ]);
    const regiaoUnicaSelecionada = regioesFiltro.length === 1 && regioesFiltro[0] !== "BR" ? regioesFiltro[0] : null;
    const mediaHistoricaRegiaoUnica = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Home.useMemo[mediaHistoricaRegiaoUnica]": ()=>{
            if (!regiaoUnicaSelecionada) return null;
            const serie = dadosCompletos.filter({
                "Home.useMemo[mediaHistoricaRegiaoUnica].serie": (d)=>d.regiao === regiaoUnicaSelecionada
            }["Home.useMemo[mediaHistoricaRegiaoUnica].serie"]);
            return media(serie.map({
                "Home.useMemo[mediaHistoricaRegiaoUnica]": (d)=>d.pctAprovados
            }["Home.useMemo[mediaHistoricaRegiaoUnica]"]));
        }
    }["Home.useMemo[mediaHistoricaRegiaoUnica]"], [
        dadosCompletos,
        regiaoUnicaSelecionada
    ]);
    if (carregando) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
        className: "text-slate-500",
        children: "Carregando dados da planilha…"
    }, void 0, false, {
        fileName: "[project]/app/page.tsx",
        lineNumber: 251,
        columnNumber: 26
    }, this);
    if (erro) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700",
        children: [
            "Não foi possível carregar os dados: ",
            erro
        ]
    }, void 0, true, {
        fileName: "[project]/app/page.tsx",
        lineNumber: 254,
        columnNumber: 7
    }, this);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-8",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "text-2xl font-bold",
                        children: "Dados Gerais"
                    }, void 0, false, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 262,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm text-slate-500",
                        children: "Estatísticas por região e edição do Exame de Suficiência."
                    }, void 0, false, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 263,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 261,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-wrap gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MultiSelect, {
                        titulo: "Região",
                        opcoes: opcoesRegiao,
                        selecionados: regioesFiltro,
                        onChange: setRegioesFiltro
                    }, void 0, false, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 269,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MultiSelect, {
                        titulo: "Edição",
                        opcoes: opcoesEdicao,
                        selecionados: edicoesFiltro,
                        onChange: setEdicoesFiltro
                    }, void 0, false, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 275,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 268,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "rounded-xl border border-slate-200 bg-white p-5 shadow-sm",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "mb-3 font-semibold",
                        children: "Evolução do % de aprovados"
                    }, void 0, false, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 284,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ResponsiveContainer"], {
                        width: "100%",
                        height: 380,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$LineChart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LineChart"], {
                            data: dadosGrafico,
                            margin: {
                                top: 24
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$CartesianGrid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CartesianGrid"], {
                                    strokeDasharray: "3 3",
                                    stroke: "#e2e8f0"
                                }, void 0, false, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 287,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$XAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["XAxis"], {
                                    dataKey: "edicao",
                                    tick: {
                                        fontSize: 11
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 288,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$YAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["YAxis"], {
                                    tickFormatter: (v)=>`${Math.round(v * 100)}%`,
                                    tick: {
                                        fontSize: 12
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 289,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Tooltip"], {
                                    formatter: (v)=>`${(Number(v) * 100).toFixed(1)}%`
                                }, void 0, false, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 290,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Legend$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Legend"], {}, void 0, false, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 291,
                                    columnNumber: 13
                                }, this),
                                regioesNoGrafico.map((regiao, i)=>{
                                    const chave = nomeRegiao(regiao);
                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Line$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Line"], {
                                        type: "monotone",
                                        dataKey: chave,
                                        stroke: CORES[i % CORES.length],
                                        strokeWidth: chave === "Brasil" ? 2.5 : 2,
                                        dot: false,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$LabelList$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LabelList"], {
                                            dataKey: chave,
                                            position: "top",
                                            fontSize: 9,
                                            fill: CORES[i % CORES.length],
                                            formatter: (v)=>v === null || v === undefined ? "" : `${Math.round(Number(v) * 100)}%`
                                        }, void 0, false, {
                                            fileName: "[project]/app/page.tsx",
                                            lineNumber: 303,
                                            columnNumber: 19
                                        }, this)
                                    }, chave, false, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 295,
                                        columnNumber: 17
                                    }, this);
                                }),
                                mediaHistoricaBR !== null && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$ReferenceLine$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ReferenceLine"], {
                                    y: mediaHistoricaBR,
                                    stroke: "#0f172a",
                                    strokeDasharray: "6 4",
                                    label: {
                                        value: `Média histórica BR (${formatPct(mediaHistoricaBR)})`,
                                        position: "insideTopLeft",
                                        fill: "#0f172a",
                                        fontSize: 11
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 316,
                                    columnNumber: 15
                                }, this),
                                mediaHistoricaRegiaoUnica !== null && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$ReferenceLine$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ReferenceLine"], {
                                    y: mediaHistoricaRegiaoUnica,
                                    stroke: "#dc2626",
                                    strokeDasharray: "6 4",
                                    label: {
                                        value: `Média histórica ${regiaoUnicaSelecionada} (${formatPct(mediaHistoricaRegiaoUnica)})`,
                                        position: "insideBottomLeft",
                                        fill: "#dc2626",
                                        fontSize: 11
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 329,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 286,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 285,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-2 text-xs text-slate-400",
                        children: "O gráfico mostra até 6 séries por vez (Brasil sempre incluído). Use o filtro de Região acima para escolher quais comparar — incluindo as grandes regiões (Norte, Nordeste, Centro-Oeste, Sudeste, Sul)."
                    }, void 0, false, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 343,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 283,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "rounded-xl border border-slate-200 bg-white p-5 shadow-sm",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "mb-3 font-semibold",
                        children: "Estatísticas por edição e região"
                    }, void 0, false, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 351,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "max-h-[520px] overflow-auto",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                            className: "w-full text-sm",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                    className: "sticky top-0 bg-white",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                        className: "border-b border-slate-200 text-left text-slate-500",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "py-2 pr-4",
                                                children: "Edição"
                                            }, void 0, false, {
                                                fileName: "[project]/app/page.tsx",
                                                lineNumber: 356,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "py-2 pr-4",
                                                children: "Região"
                                            }, void 0, false, {
                                                fileName: "[project]/app/page.tsx",
                                                lineNumber: 357,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "py-2 pr-4",
                                                children: "Inscritos"
                                            }, void 0, false, {
                                                fileName: "[project]/app/page.tsx",
                                                lineNumber: 358,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "py-2 pr-4",
                                                children: "Presentes"
                                            }, void 0, false, {
                                                fileName: "[project]/app/page.tsx",
                                                lineNumber: 359,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "py-2 pr-4",
                                                children: "Aprovados"
                                            }, void 0, false, {
                                                fileName: "[project]/app/page.tsx",
                                                lineNumber: 360,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "py-2 pr-4",
                                                children: "Reprovados"
                                            }, void 0, false, {
                                                fileName: "[project]/app/page.tsx",
                                                lineNumber: 361,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "py-2 pr-4",
                                                children: "Ausentes"
                                            }, void 0, false, {
                                                fileName: "[project]/app/page.tsx",
                                                lineNumber: 362,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 355,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 354,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                    children: linhasTabela.map((l, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                            className: "border-b border-slate-100",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "py-2 pr-4 font-medium",
                                                    children: l.edicao
                                                }, void 0, false, {
                                                    fileName: "[project]/app/page.tsx",
                                                    lineNumber: 368,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "py-2 pr-4",
                                                    children: nomeRegiao(l.regiao)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/page.tsx",
                                                    lineNumber: 369,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CelulaComVariacao, {
                                                    valor: l.inscritos,
                                                    delta: l.deltaInscritos
                                                }, void 0, false, {
                                                    fileName: "[project]/app/page.tsx",
                                                    lineNumber: 370,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CelulaComVariacao, {
                                                    valor: l.presentes,
                                                    delta: l.deltaPresentes
                                                }, void 0, false, {
                                                    fileName: "[project]/app/page.tsx",
                                                    lineNumber: 371,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CelulaComVariacao, {
                                                    valor: l.aprovados,
                                                    delta: l.deltaAprovados
                                                }, void 0, false, {
                                                    fileName: "[project]/app/page.tsx",
                                                    lineNumber: 372,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CelulaComVariacao, {
                                                    valor: l.reprovados,
                                                    delta: l.deltaReprovados
                                                }, void 0, false, {
                                                    fileName: "[project]/app/page.tsx",
                                                    lineNumber: 373,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CelulaComVariacao, {
                                                    valor: l.ausentes,
                                                    delta: l.deltaAusentes
                                                }, void 0, false, {
                                                    fileName: "[project]/app/page.tsx",
                                                    lineNumber: 374,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, `${l.regiao}-${l.edicao}-${i}`, true, {
                                            fileName: "[project]/app/page.tsx",
                                            lineNumber: 367,
                                            columnNumber: 17
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 365,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 353,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 352,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-2 text-xs text-slate-400",
                        children: "O percentual entre parênteses é sempre a variação em relação à edição imediatamente anterior (mesmo que essa edição anterior não esteja marcada no filtro)."
                    }, void 0, false, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 380,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 350,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/page.tsx",
        lineNumber: 260,
        columnNumber: 5
    }, this);
}
_s(Home, "Omn1IeLKBjQRlA71qGbYxvKehgM=");
_c1 = Home;
var _c, _c1;
__turbopack_context__.k.register(_c, "CelulaComVariacao");
__turbopack_context__.k.register(_c1, "Home");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/regioes.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GRANDES_REGIOES",
    ()=>GRANDES_REGIOES,
    "GRANDE_REGIAO_POR_UF",
    ()=>GRANDE_REGIAO_POR_UF
]);
const GRANDE_REGIAO_POR_UF = {
    AC: "Norte",
    AP: "Norte",
    AM: "Norte",
    PA: "Norte",
    RO: "Norte",
    RR: "Norte",
    TO: "Norte",
    AL: "Nordeste",
    BA: "Nordeste",
    CE: "Nordeste",
    MA: "Nordeste",
    PB: "Nordeste",
    PE: "Nordeste",
    PI: "Nordeste",
    RN: "Nordeste",
    SE: "Nordeste",
    DF: "Centro-Oeste",
    GO: "Centro-Oeste",
    MT: "Centro-Oeste",
    MS: "Centro-Oeste",
    ES: "Sudeste",
    MG: "Sudeste",
    RJ: "Sudeste",
    SP: "Sudeste",
    PR: "Sul",
    RS: "Sul",
    SC: "Sul"
};
const GRANDES_REGIOES = [
    "Norte",
    "Nordeste",
    "Centro-Oeste",
    "Sudeste",
    "Sul"
];
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_159g0tv._.js.map