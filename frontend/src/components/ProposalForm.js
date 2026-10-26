'use client';
import { useState } from 'react';

export default function ProposalForm({ clientes, onAdicionado }) {
  const [clienteId, setClienteId] = useState('');
  const [descricaoServico, setDescricaoServico] = useState('');
  const [valorProposta, setValorProposta] = useState('');
  const [dataValidade, setDataValidade] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const novaProposta = {
      cliente_id: parseInt(clienteId),
      descricao_servico: descricaoServico,
      valor_proposta: parseFloat(valorProposta),
      data_validade: dataValidade || null,
      status: 'Pendente'
    };

    try {
      const res = await fetch('http://127.0.0.1:8000/api/propostas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(novaProposta),
      });

      if (res.ok) {
        setClienteId('');
        setDescricaoServico('');
        setValorProposta('');
        setDataValidade('');
        if (typeof onAdicionado === 'function') onAdicionado();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-sm border border-slate-200/80">
      <div className="flex items-center gap-2 mb-6 border-b border-slate-100 pb-3">
        <div className="w-2 h-6 bg-gradient-to-b from-emerald-400 to-teal-600 rounded-full" />
        <h2 className="text-lg font-bold text-slate-800">Nova Proposta</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Cliente *</label>
          <select required value={clienteId} onChange={(e) => setClienteId(e.target.value)}
            className="w-full border border-slate-200 rounded-xl p-2.5 text-sm bg-slate-50/50 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition">
            <option value="" disabled>Selecione um cliente</option>
            {clientes.map(c => (
              <option key={c.id} value={c.id}>{c.nome_empresa}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Descrição do Serviço *</label>
          <textarea required value={descricaoServico} onChange={(e) => setDescricaoServico(e.target.value)}
            className="w-full border border-slate-200 rounded-xl p-2.5 text-sm bg-slate-50/50 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition" rows="3" placeholder="Ação no PDV, degustação..." />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Valor (R$) *</label>
            <input type="number" step="0.01" required value={valorProposta} onChange={(e) => setValorProposta(e.target.value)}
              className="w-full border border-slate-200 rounded-xl p-2.5 text-sm bg-slate-50/50 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 outline-none transition" placeholder="1500.00" />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Validade</label>
            <input type="date" value={dataValidade} onChange={(e) => setDataValidade(e.target.value)}
              className="w-full border border-slate-200 rounded-xl p-2.5 text-sm bg-slate-50/50 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 outline-none transition" />
          </div>
        </div>
        <button type="submit" className="w-full mt-2 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-semibold py-3 px-4 rounded-xl transition-all shadow-md shadow-emerald-500/20 active:scale-[0.98]">
          Gerar Proposta
        </button>
      </form>
    </div>
  );
}