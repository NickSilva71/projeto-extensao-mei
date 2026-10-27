'use client';
import { useState } from 'react';
import ModalEdicao from './EditingModal';

export default function CampaignCard({ campanha, onDeletar, onAtualizar }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tituloAcao, setTituloAcao] = useState(campanha.titulo_acao);
  const [descricao, setDescricao] = useState(campanha.descricao);
  const [resultadosObtidos, setResultadosObtidos] = useState(campanha.resultados_obtidos || '');
  const [dataRealizacao, setDataRealizacao] = useState(campanha.data_realizacao);

  const handleEditar = async (e) => {
    e.preventDefault();
    const campanhaAtualizada = {
      titulo_acao: tituloAcao,
      descricao: descricao,
      resultados_obtidos: resultadosObtidos || null,
      data_realizacao: dataRealizacao,
      visivel_publico: campanha.visivel_publico
    };

    try {
      const res = await fetch(`https://api-crm-b2b.onrender.com/api/campanhas/${campanha.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(campanhaAtualizada),
      });

      if (!res.ok) {
        alert('Erro ao atualizar campanha.');
        return;
      }
      setIsModalOpen(false);
      if (typeof onAtualizar === 'function') onAtualizar();
    } catch (err) {
      console.error('Erro no front-end:', err);
    }
  };

  return (
    <>
      <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-xl border border-slate-100 transition-all duration-300 relative group flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-start mb-4">
            <span className="text-[10px] font-bold tracking-widest uppercase bg-slate-100 text-slate-500 px-3 py-1.5 rounded-lg border border-slate-200">
              📅 {campanha.data_realizacao}
            </span>
            <div className="flex gap-1 opacity-80 group-hover:opacity-100 transition">
              <button onClick={() => setIsModalOpen(true)} className="p-1.5 text-slate-400 hover:text-cyan-600 hover:bg-cyan-50 rounded-lg transition" title="Editar">✏️</button>
              <button onClick={() => onDeletar(campanha.id)} className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition" title="Excluir">🗑️</button>
            </div>
          </div>

          <h3 className="text-xl font-black text-slate-800 tracking-tight mb-2 pr-8">{campanha.titulo_acao}</h3>
          <p className="text-sm text-slate-600 font-medium leading-relaxed mb-4">{campanha.descricao}</p>
        </div>

        {campanha.resultados_obtidos && (
          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-4 rounded-xl border border-blue-100/50 mt-2">
            <p className="text-[10px] font-bold text-cyan-700 uppercase tracking-wider mb-1">Resultados Obtidos</p>
            <p className="text-sm font-semibold text-slate-800">{campanha.resultados_obtidos}</p>
          </div>
        )}
      </div>

      <ModalEdicao isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} titulo="Editar Campanha">
        <form onSubmit={handleEditar} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Título da Ação</label>
            <input type="text" required value={tituloAcao} onChange={(e) => setTituloAcao(e.target.value)} className="w-full border border-slate-200 rounded-xl p-2.5 text-sm focus:ring-2 focus:ring-cyan-500 outline-none" />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Descrição</label>
            <textarea required value={descricao} onChange={(e) => setDescricao(e.target.value)} className="w-full border border-slate-200 rounded-xl p-2.5 text-sm focus:ring-2 focus:ring-cyan-500 outline-none" rows="3" />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Resultados</label>
            <textarea value={resultadosObtidos} onChange={(e) => setResultadosObtidos(e.target.value)} className="w-full border border-slate-200 rounded-xl p-2.5 text-sm focus:ring-2 focus:ring-cyan-500 outline-none" rows="2" />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Data</label>
            <input type="date" required value={dataRealizacao} onChange={(e) => setDataRealizacao(e.target.value)} className="w-full border border-slate-200 rounded-xl p-2.5 text-sm focus:ring-2 focus:ring-cyan-500 outline-none" />
          </div>
          <button type="submit" className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2.5 rounded-xl transition shadow-lg shadow-cyan-500/20 mt-2">
            Salvar Alterações
          </button>
        </form>
      </ModalEdicao>
    </>
  );
}