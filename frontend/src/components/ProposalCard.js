'use client';
import { useState } from 'react';
import ModalEdicao from './EditingModal';

export default function ProposalCard({ proposta, nomeCliente, clientes, onDeletar, onAtualizar }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [clienteId, setClienteId] = useState(proposta.cliente_id);
  const [descricaoServico, setDescricaoServico] = useState(proposta.descricao_servico);
  const [valorProposta, setValorProposta] = useState(proposta.valor_proposta);
  const [dataValidade, setDataValidade] = useState(proposta.data_validade || '');
  const [status, setStatus] = useState(proposta.status || 'Pendente');

  const handleEditar = async (e) => {
    e.preventDefault();
    const propostaAtualizada = {
      cliente_id: parseInt(clienteId),
      descricao_servico: descricaoServico,
      valor_proposta: parseFloat(valorProposta),
      data_validade: dataValidade || null,
      status: status
    };

    try {
      const res = await fetch(`http://127.0.0.1:8000/api/propostas/${proposta.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(propostaAtualizada),
      });

      if (!res.ok) {
        alert('Erro ao atualizar proposta.');
        return;
      }
      setIsModalOpen(false);
      if (typeof onAtualizar === 'function') onAtualizar();
    } catch (err) {
      console.error('Erro no front-end:', err);
    }
  };

  const getStatusStyle = (s) => {
    if (s === 'Aprovada') return 'bg-emerald-100 text-emerald-700 border-emerald-200';
    if (s === 'Recusada') return 'bg-rose-100 text-rose-700 border-rose-200';
    return 'bg-amber-100 text-amber-700 border-amber-200';
  };

  return (
    <>
      <div className="bg-white p-5 rounded-2xl shadow-sm hover:shadow-xl border border-slate-100 transition-all duration-300 relative group flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-start mb-3">
            <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${getStatusStyle(proposta.status)}`}>
              {proposta.status || 'Pendente'}
            </span>
            <div className="flex gap-1 opacity-80 group-hover:opacity-100 transition">
              <button onClick={() => setIsModalOpen(true)} className="p-1.5 text-slate-400 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition" title="Editar">✏️</button>
              <button onClick={() => onDeletar(proposta.id)} className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition" title="Excluir">🗑️</button>
            </div>
          </div>

          <h3 className="text-lg font-bold text-slate-800 tracking-tight">{nomeCliente}</h3>
          <p className="text-sm text-slate-500 font-medium mb-4 line-clamp-2">{proposta.descricao_servico}</p>
        </div>

        <div className="flex justify-between items-end bg-slate-50 p-3 rounded-xl border border-slate-100 mt-2">
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Válido até</p>
            <p className="text-xs text-slate-600 font-medium">{proposta.data_validade || 'Sem data'}</p>
          </div>
          <p className="text-lg font-black text-emerald-600">
            R$ {proposta.valor_proposta.toFixed(2).replace('.', ',')}
          </p>
        </div>
      </div>

      <ModalEdicao isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} titulo="Editar Proposta">
        <form onSubmit={handleEditar} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Cliente</label>
            <select required value={clienteId} onChange={(e) => setClienteId(e.target.value)} className="w-full border border-slate-200 rounded-xl p-2.5 text-sm bg-white focus:ring-2 focus:ring-teal-500 outline-none">
              {clientes.map(c => (<option key={c.id} value={c.id}>{c.nome_empresa}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Serviço</label>
            <textarea required value={descricaoServico} onChange={(e) => setDescricaoServico(e.target.value)} className="w-full border border-slate-200 rounded-xl p-2.5 text-sm focus:ring-2 focus:ring-teal-500 outline-none" rows="2" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Valor (R$)</label>
              <input type="number" step="0.01" required value={valorProposta} onChange={(e) => setValorProposta(e.target.value)} className="w-full border border-slate-200 rounded-xl p-2.5 text-sm focus:ring-2 focus:ring-teal-500 outline-none" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Status</label>
              <select value={status} onChange={(e) => setStatus(e.target.value)} className="w-full border border-slate-200 rounded-xl p-2.5 text-sm bg-white focus:ring-2 focus:ring-teal-500 outline-none">
                <option value="Pendente">Pendente</option>
                <option value="Aprovada">Aprovada</option>
                <option value="Recusada">Recusada</option>
              </select>
            </div>
          </div>
          <button type="submit" className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-2.5 rounded-xl transition shadow-lg shadow-teal-500/20 mt-2">
            Salvar Alterações
          </button>
        </form>
      </ModalEdicao>
    </>
  );
}