'use client';
import { useState } from 'react';

export default function CampaignForm({ onAdicionado }) {
  const [tituloAcao, setTituloAcao] = useState('');
  const [descricao, setDescricao] = useState('');
  const [resultadosObtidos, setResultadosObtidos] = useState('');
  const [dataRealizacao, setDataRealizacao] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const novaCampanha = {
      titulo_acao: tituloAcao,
      descricao: descricao,
      resultados_obtidos: resultadosObtidos || null,
      data_realizacao: dataRealizacao,
      visivel_publico: true
    };

    try {
      const res = await fetch('http://127.0.0.1:8000/api/campanhas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(novaCampanha),
      });

      if (res.ok) {
        setTituloAcao('');
        setDescricao('');
        setResultadosObtidos('');
        setDataRealizacao('');
        onAdicionado(); // Atualiza a lista na tela principal
        alert('Campanha adicionada ao portfólio!');
      } else {
        alert('Erro ao cadastrar a campanha.');
      }
    } catch (err) {
      alert('Erro de conexão com o back-end.');
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border h-fit">
      <h2 className="text-xl font-semibold mb-4 text-blue-700">Nova Campanha</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Título da Ação *</label>
          <input type="text" required value={tituloAcao} onChange={(e) => setTituloAcao(e.target.value)}
            className="w-full border rounded p-2" placeholder="Ex: Degustação Marca X" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Descrição *</label>
          <textarea required value={descricao} onChange={(e) => setDescricao(e.target.value)}
            className="w-full border rounded p-2" rows="3" placeholder="Detalhes de como ocorreu a ação..." />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Resultados Obtidos</label>
          <textarea value={resultadosObtidos} onChange={(e) => setResultadosObtidos(e.target.value)}
            className="w-full border rounded p-2" rows="2" placeholder="Ex: Aumento de 20% nas vendas" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Data da Realização *</label>
          <input type="date" required value={dataRealizacao} onChange={(e) => setDataRealizacao(e.target.value)}
            className="w-full border rounded p-2" />
        </div>
        <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition">
          Salvar no Portfólio
        </button>
      </form>
    </div>
  );
}