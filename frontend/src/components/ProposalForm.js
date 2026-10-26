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
      data_validade: dataValidade || null
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
        onAdicionado(); // Atualiza a lista pai
        alert('Proposta gerada com sucesso!');
      } else {
        alert('Erro ao gerar proposta.');
      }
    } catch (err) {
      alert('Erro de conexão com o back-end.');
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border h-fit">
      <h2 className="text-xl font-semibold mb-4 text-blue-700">Nova Proposta</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Cliente *</label>
          <select required value={clienteId} onChange={(e) => setClienteId(e.target.value)}
            className="w-full border rounded p-2 bg-white">
            <option value="" disabled>Selecione um cliente</option>
            {clientes.map(c => (
              <option key={c.id} value={c.id}>{c.nome_empresa}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Descrição do Serviço *</label>
          <textarea required value={descricaoServico} onChange={(e) => setDescricaoServico(e.target.value)}
            className="w-full border rounded p-2" rows="3" placeholder="Ação no PDV, degustação..." />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Valor (R$) *</label>
          <input type="number" step="0.01" required value={valorProposta} onChange={(e) => setValorProposta(e.target.value)}
            className="w-full border rounded p-2" placeholder="Ex: 1500.00" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Validade do Orçamento</label>
          <input type="date" value={dataValidade} onChange={(e) => setDataValidade(e.target.value)}
            className="w-full border rounded p-2" />
        </div>
        <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition">
          Gerar Proposta
        </button>
      </form>
    </div>
  );
}