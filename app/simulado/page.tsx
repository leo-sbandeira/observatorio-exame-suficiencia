"use client";

import React, { useState, useEffect } from 'react';

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

  useEffect(() => {
    buscarDadosIniciais();
  }, []);

  const buscarDadosIniciais = () => {
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
      });
  };

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
        </>
      )}
    </div>
  );
};

export default Simulado;
