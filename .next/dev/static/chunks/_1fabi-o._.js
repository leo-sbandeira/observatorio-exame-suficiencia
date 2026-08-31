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
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$MultiSelect$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/MultiSelect.tsx [app-client] (ecmascript)");
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
function RotuloPonto(cor) {
    return (props)=>{
        const { x, y, value } = props;
        if (value === null || value === undefined || x === undefined || y === undefined) return null;
        const texto = `${Math.round(Number(value) * 100)}%`;
        const largura = texto.length * 8 + 10;
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                    x: x - largura / 2,
                    y: y - 30,
                    width: largura,
                    height: 18,
                    rx: 4,
                    fill: "white",
                    fillOpacity: 0.92
                }, void 0, false, {
                    fileName: "[project]/app/page.tsx",
                    lineNumber: 31,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("text", {
                    x: x,
                    y: y - 17,
                    textAnchor: "middle",
                    fontSize: 12,
                    fontWeight: 700,
                    fill: cor,
                    children: texto
                }, void 0, false, {
                    fileName: "[project]/app/page.tsx",
                    lineNumber: 40,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/page.tsx",
            lineNumber: 30,
            columnNumber: 7
        }, this);
    };
}
_c = RotuloPonto;
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
                lineNumber: 90,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/page.tsx",
        lineNumber: 87,
        columnNumber: 5
    }, this);
}
_c1 = CelulaComVariacao;
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
        lineNumber: 284,
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
        lineNumber: 287,
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
                        lineNumber: 295,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm text-slate-500",
                        children: "Estatísticas por região e edição do Exame de Suficiência."
                    }, void 0, false, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 296,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 294,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-wrap gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$MultiSelect$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        titulo: "Região",
                        opcoes: opcoesRegiao,
                        selecionados: regioesFiltro,
                        onChange: setRegioesFiltro
                    }, void 0, false, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 302,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$MultiSelect$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        titulo: "Edição",
                        opcoes: opcoesEdicao,
                        selecionados: edicoesFiltro,
                        onChange: setEdicoesFiltro
                    }, void 0, false, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 308,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 301,
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
                        lineNumber: 317,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ResponsiveContainer"], {
                        width: "100%",
                        height: 460,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$LineChart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LineChart"], {
                            data: dadosGrafico,
                            margin: {
                                top: 40,
                                right: 170,
                                bottom: 10
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$CartesianGrid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CartesianGrid"], {
                                    strokeDasharray: "3 3",
                                    stroke: "#e2e8f0"
                                }, void 0, false, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 320,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$XAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["XAxis"], {
                                    dataKey: "edicao",
                                    interval: 0,
                                    angle: -60,
                                    textAnchor: "end",
                                    height: 70,
                                    tick: {
                                        fontSize: 11
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 321,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$YAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["YAxis"], {
                                    tickFormatter: (v)=>`${Math.round(v * 100)}%`,
                                    tick: {
                                        fontSize: 13
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 329,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Tooltip"], {
                                    formatter: (v)=>`${(Number(v) * 100).toFixed(1)}%`
                                }, void 0, false, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 330,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Legend$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Legend"], {
                                    wrapperStyle: {
                                        fontSize: 13
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 331,
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
                                            content: RotuloPonto(CORES[i % CORES.length])
                                        }, void 0, false, {
                                            fileName: "[project]/app/page.tsx",
                                            lineNumber: 343,
                                            columnNumber: 19
                                        }, this)
                                    }, chave, false, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 335,
                                        columnNumber: 17
                                    }, this);
                                }),
                                mediaHistoricaBR !== null && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$ReferenceLine$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ReferenceLine"], {
                                    y: mediaHistoricaBR,
                                    stroke: "#dc2626",
                                    strokeWidth: 3,
                                    strokeDasharray: "6 4",
                                    label: {
                                        value: `Média BR: ${formatPct(mediaHistoricaBR)}`,
                                        position: "right",
                                        fill: "#dc2626",
                                        fontSize: 12,
                                        fontWeight: 700
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 348,
                                    columnNumber: 15
                                }, this),
                                mediaHistoricaRegiaoUnica !== null && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$ReferenceLine$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ReferenceLine"], {
                                    y: mediaHistoricaRegiaoUnica,
                                    stroke: "#7f1d1d",
                                    strokeWidth: 3,
                                    strokeDasharray: "2 3",
                                    label: {
                                        value: `Média ${regiaoUnicaSelecionada}: ${formatPct(mediaHistoricaRegiaoUnica)}`,
                                        position: "right",
                                        fill: "#7f1d1d",
                                        fontSize: 12,
                                        fontWeight: 700
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 363,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 319,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 318,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-2 text-xs text-slate-400",
                        children: "O gráfico mostra até 6 séries por vez (Brasil sempre incluído). Use o filtro de Região acima para escolher quais comparar — incluindo as grandes regiões (Norte, Nordeste, Centro-Oeste, Sudeste, Sul)."
                    }, void 0, false, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 379,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 316,
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
                        lineNumber: 387,
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
                                                lineNumber: 392,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "py-2 pr-4",
                                                children: "Região"
                                            }, void 0, false, {
                                                fileName: "[project]/app/page.tsx",
                                                lineNumber: 393,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "py-2 pr-4",
                                                children: "Inscritos"
                                            }, void 0, false, {
                                                fileName: "[project]/app/page.tsx",
                                                lineNumber: 394,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "py-2 pr-4",
                                                children: "Presentes"
                                            }, void 0, false, {
                                                fileName: "[project]/app/page.tsx",
                                                lineNumber: 395,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "py-2 pr-4",
                                                children: "Aprovados"
                                            }, void 0, false, {
                                                fileName: "[project]/app/page.tsx",
                                                lineNumber: 396,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "py-2 pr-4",
                                                children: "Reprovados"
                                            }, void 0, false, {
                                                fileName: "[project]/app/page.tsx",
                                                lineNumber: 397,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "py-2 pr-4",
                                                children: "Ausentes"
                                            }, void 0, false, {
                                                fileName: "[project]/app/page.tsx",
                                                lineNumber: 398,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 391,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 390,
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
                                                    lineNumber: 404,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "py-2 pr-4",
                                                    children: nomeRegiao(l.regiao)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/page.tsx",
                                                    lineNumber: 405,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CelulaComVariacao, {
                                                    valor: l.inscritos,
                                                    delta: l.deltaInscritos
                                                }, void 0, false, {
                                                    fileName: "[project]/app/page.tsx",
                                                    lineNumber: 406,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CelulaComVariacao, {
                                                    valor: l.presentes,
                                                    delta: l.deltaPresentes
                                                }, void 0, false, {
                                                    fileName: "[project]/app/page.tsx",
                                                    lineNumber: 407,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CelulaComVariacao, {
                                                    valor: l.aprovados,
                                                    delta: l.deltaAprovados
                                                }, void 0, false, {
                                                    fileName: "[project]/app/page.tsx",
                                                    lineNumber: 408,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CelulaComVariacao, {
                                                    valor: l.reprovados,
                                                    delta: l.deltaReprovados
                                                }, void 0, false, {
                                                    fileName: "[project]/app/page.tsx",
                                                    lineNumber: 409,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CelulaComVariacao, {
                                                    valor: l.ausentes,
                                                    delta: l.deltaAusentes
                                                }, void 0, false, {
                                                    fileName: "[project]/app/page.tsx",
                                                    lineNumber: 410,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, `${l.regiao}-${l.edicao}-${i}`, true, {
                                            fileName: "[project]/app/page.tsx",
                                            lineNumber: 403,
                                            columnNumber: 17
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 401,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 389,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 388,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-2 text-xs text-slate-400",
                        children: "O percentual entre parênteses é sempre a variação em relação à edição imediatamente anterior (mesmo que essa edição anterior não esteja marcada no filtro)."
                    }, void 0, false, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 416,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-4 space-y-2 rounded-lg border border-slate-200 bg-slate-50 p-4 text-xs text-slate-600",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                children: "Das edições de 2011.1 a 2025.2 tem-se os resultados estatísticos gerais e por UF (Unidade da Federação), que foram integrados na base. Esses dados referem-se ao número e percentuais de inscritos, presentes, ausentes, aprovados e reprovados."
                            }, void 0, false, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 422,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                children: "O relatório de 2020.2 não possui informações para o estado do Amazonas (AM). A prova da segunda edição do exame não foi aplicada no estado, dado o cenário pandêmico vivido à época."
                            }, void 0, false, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 428,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 421,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 386,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/page.tsx",
        lineNumber: 293,
        columnNumber: 5
    }, this);
}
_s(Home, "Omn1IeLKBjQRlA71qGbYxvKehgM=");
_c2 = Home;
var _c, _c1, _c2;
__turbopack_context__.k.register(_c, "RotuloPonto");
__turbopack_context__.k.register(_c1, "CelulaComVariacao");
__turbopack_context__.k.register(_c2, "Home");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/MultiSelect.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>MultiSelect
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
"use client";
;
function MultiSelect({ titulo, opcoes, selecionados, onChange }) {
    function alternar(valor) {
        onChange(selecionados.includes(valor) ? selecionados.filter((v)=>v !== valor) : [
            ...selecionados,
            valor
        ]);
    }
    const textoBotao = selecionados.length === 0 ? "Todas" : selecionados.length === 1 ? opcoes.find((o)=>o.value === selecionados[0])?.label ?? selecionados[0] : `${selecionados.length} selecionadas`;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("details", {
        className: "group relative",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("summary", {
                className: "flex cursor-pointer list-none items-center gap-1 rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-xs font-medium text-slate-400",
                        children: [
                            titulo,
                            ":"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/MultiSelect.tsx",
                        lineNumber: 38,
                        columnNumber: 9
                    }, this),
                    textoBotao
                ]
            }, void 0, true, {
                fileName: "[project]/components/MultiSelect.tsx",
                lineNumber: 37,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute z-20 mt-1 max-h-72 w-64 overflow-y-auto rounded-md border border-slate-200 bg-white p-2 shadow-lg",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mb-1 flex justify-between border-b border-slate-100 pb-1 text-xs",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "text-blue-600 hover:underline",
                                onClick: ()=>onChange([]),
                                children: "Todas"
                            }, void 0, false, {
                                fileName: "[project]/components/MultiSelect.tsx",
                                lineNumber: 43,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "text-blue-600 hover:underline",
                                onClick: ()=>onChange(opcoes.map((o)=>o.value)),
                                children: "Selecionar todas"
                            }, void 0, false, {
                                fileName: "[project]/components/MultiSelect.tsx",
                                lineNumber: 50,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/MultiSelect.tsx",
                        lineNumber: 42,
                        columnNumber: 9
                    }, this),
                    opcoes.map((o)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                            className: "flex cursor-pointer items-center gap-2 rounded px-1 py-1 text-sm hover:bg-slate-50",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "checkbox",
                                    checked: selecionados.includes(o.value),
                                    onChange: ()=>alternar(o.value)
                                }, void 0, false, {
                                    fileName: "[project]/components/MultiSelect.tsx",
                                    lineNumber: 63,
                                    columnNumber: 13
                                }, this),
                                o.label
                            ]
                        }, o.value, true, {
                            fileName: "[project]/components/MultiSelect.tsx",
                            lineNumber: 59,
                            columnNumber: 11
                        }, this))
                ]
            }, void 0, true, {
                fileName: "[project]/components/MultiSelect.tsx",
                lineNumber: 41,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/MultiSelect.tsx",
        lineNumber: 36,
        columnNumber: 5
    }, this);
}
_c = MultiSelect;
var _c;
__turbopack_context__.k.register(_c, "MultiSelect");
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

//# sourceMappingURL=_1fabi-o._.js.map