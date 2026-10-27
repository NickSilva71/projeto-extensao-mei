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
      const res = await fetch('https://api-crm-b2b.onrender.com/api/campanhas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(novaCampanha),
      });

      if (res.ok) {
        setTituloAcao('');
        setDescricao('');
        setResultadosObtidos('');
        setDataRealizacao('');
        if (typeof onAdicionado === 'function') onAdicionado();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-sm border border-slate-200/80">
      <div className="flex items-center gap-2 mb-6 border-b border-slate-100 pb-3">
        <div className="w-2 h-6 bg-gradient-to-b from-blue-400 to-cyan-600 rounded-full" />
        <h2 className="text-lg font-bold text-slate-800">Nova Campanha</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Título da Ação *</label>
          <input type="text" required value={tituloAcao} onChange={(e) => setTituloAcao(e.target.value)}
            className="w-full border border-slate-200 rounded-xl p-2.5 text-sm bg-slate-50/50 focus:bg-white focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 outline-none transition" placeholder="Ex: Degustação Marca X" />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Descrição *</label>
          <textarea required value={descricao} onChange={(e) => setDescricao(e.target.value)}
            className="w-full border border-slate-200 rounded-xl p-2.5 text-sm bg-slate-50/50 focus:bg-white focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 outline-none transition" rows="3" placeholder="Detalhes de como ocorreu a ação..." />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Resultados Obtidos</label>
          <textarea value={resultadosObtidos} onChange={(e) => setResultadosObtidos(e.target.value)}
            className="w-full border border-slate-200 rounded-xl p-2.5 text-sm bg-slate-50/50 focus:bg-white focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 outline-none transition" rows="2" placeholder="Ex: Aumento de 20% nas vendas" />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Data de Realização *</label>
          <input type="date" required value={dataRealizacao} onChange={(e) => setDataRealizacao(e.target.value)}
            className="w-full border border-slate-200 rounded-xl p-2.5 text-sm bg-slate-50/50 focus:bg-white focus:ring-2 focus:ring-cyan-500/20 outline-none transition" />
        </div>
        <button type="submit" className="w-full mt-2 bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white font-semibold py-3 px-4 rounded-xl transition-all shadow-md shadow-cyan-500/20 active:scale-[0.98]">
          Salvar no Portfólio
        </button>
      </form>
    </div>
  );
}