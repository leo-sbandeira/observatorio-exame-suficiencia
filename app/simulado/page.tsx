"use client";

import React, { useState } from 'react';
import { useEffect } from 'react';

interface Resultado {
  id: string;
  edicao: string;
  uf: string;
  ies: string;
}

const Simulado = () => {
  const [filtros, setFiltros] = useState({
    edicao: '',
    uf: '',
    cidade: '',
    modalidade: '',
    ies: ''
  });

  const [resultados, setResultados] = useState<Resultado[]>([]);
  const [pesquisaAtivada, setPesquisaAtivada] = useState(false);
  const [estatisticas, setEstatisticas] = useState({
    edicoesPesquisadas: [] as string[],
    ufsPesquisadas: [] as string[],
    iesPesquisadas: [] as string[]
  });

  const atualizarEstatisticas = (dados: Resultado[]) => {
    const contagemEdicao = dados.reduce((acc: Record<string, number>, curr: Resultado) => {
      acc[curr.edicao] = (acc[curr.edicao] || 0) + 1;
      return acc;
    }, {});

    const contagemUF = dados.reduce((acc: Record<string, number>, curr: Resultado) => {
      acc[curr.uf] = (acc[curr.uf] || 0) + 1;
      return acc;
    }, {});

    const contagemIES = dados.reduce((acc: Record<string, number>, curr: Resultado) => {
      acc[curr.ies] = (acc[curr.ies] || 0) + 1;
      return acc;
    }, {});

    const edicoesMaisFrequentes = Object.entries(contagemEdicao)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([edicao, quantidade]) => `${edicao} (${quantidade})`);

    const ufsMaisFrequentes = Object.entries(contagemUF)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([uf, quantidade]) => `${uf} (${quantidade})`);

    const iesMaisFrequentes = Object.entries(contagemIES)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([ies, quantidade]) => `${ies} (${quantidade})`);

    setEstatisticas({
      edicoesPesquisadas: edicoesMaisFrequentes,
      ufsPesquisadas: ufsMaisFrequentes,
      iesPesquisadas: iesMaisFrequentes
    });
  };

  // Carregar resultados iniciais ordenados por edição (recente primeiro) e IES
  useEffect(() => {
    fetch('/api/resultados')
      .then(res => res.json())
      .then((data: Resultado[]) => {
        const ordenado = data.sort((a, b) => {
          if (a.edicao !== b.edicao) {
            return b.edicao.localeCompare(a.edicao);
          } else {
            return a.ies.localeCompare(b.ies);
          }
        });
        setResultados(ordenado);
        atualizarEstatisticas(ordenado);
      });
  }, []);

  const handleFiltroChange = (campo: string, valor: string) => {
    setFiltros(prevState => ({
      ...prevState,
      [campo]: valor
    }));
    setPesquisaAtivada(true);
  };

  const handlePesquisar = () => {
    fetch(`/api/resultados?edicao=${filtros.edicao}&uf=${filtros.uf}&cidade=${filtros.cidade}&modalidade=${filtros.modalidade}&ies=${filtros.ies}`)
      .then(res => res.json())
      .then((data: Resultado[]) => {
        const resultadosFiltrados = data.sort((a, b) => {
          if (a.edicao !== b.edicao) {
            return b.edicao.localeCompare(a.edicao);
          } else {
            return a.ies.localeCompare(b.ies);
          }
        });
        setResultados(resultadosFiltrados);
        atualizarEstatisticas(resultadosFiltrados);
      });
  };

  return (
    <div>
      <h1>Simulado do Exame de Suficiência</h1>

      <div className="filtros">
        <label>
          Edição
          <select value={filtros.edicao} onChange={e => handleFiltroChange('edicao', e.target.value)}>
            <option value="">Todas</option>
            <option value="2023.1">2023.1</option>
            <option value="2022.2">2022.2</option>
            {/* Opções de edição */}
          </select>
        </label>

        {/* Demais filtros */}

        <button
          onClick={handlePesquisar}
          disabled={!pesquisaAtivada}
          style={{ opacity: pesquisaAtivada ? 1 : 0.5 }}
        >
          Pesquisar
        </button>
      </div>

      {resultados.length > 0 && (
        <>
          <h2>Resultados</h2>
          <ul>
            {resultados.map(r => (
              <li key={r.id}>
                Edição: {r.edicao} - UF: {r.uf} - IES: {r.ies}
              </li>
            ))}
          </ul>

          <div className="estatisticas">
            <h3>Pesquisas Realizadas: {resultados.length}</h3>
            <h3>Dados Exportados: PDF (n) CSV (n) XLSX (n)</h3>
            <h3>Edições mais Pesquisadas: {estatisticas.edicoesPesquisadas.join(', ')}</h3>
            <h3>UFs mais Pesquisadas: {estatisticas.ufsPesquisadas.join(', ')}</h3>
            <h3>IES Pesquisadas: {estatisticas.iesPesquisadas.join(', ')}</h3>
          </div>
        </>
      )}
    </div>
  );
};

export default Simulado;
