'use client';
import { useState } from 'react';
import ModalEdicao from './EditingModal';

export default function ClientCard({ cliente, onDeletar, onAtualizar }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [nomeEmpresa, setNomeEmpresa] = useState(cliente.nome_empresa);
  const [pessoaContato, setPessoaContato] = useState(cliente.pessoa_contato);
  const [email, setEmail] = useState(cliente.email);
  const [telefone, setTelefone] = useState(cliente.telefone || '');
  const [status, setStatus] = useState(cliente.status || 'Lead');

  const handleEditar = async (e) => {
    e.preventDefault();
    const clienteAtualizado = {
      nome_empresa: nomeEmpresa,
      pessoa_contato: pessoaContato,
      email: email,
      telefone: telefone,
      status: status
    };

    try {
      const res = await fetch(`https://api-crm-b2b.onrender.com/api/clientes/${cliente.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(clienteAtualizado),
      });

      if (res.ok) {
        setIsModalOpen(false);
        onAtualizar();
      } else {
        alert('Erro ao atualizar cliente.');
      }
    } catch (err) {
      alert('Erro de conexão ao atualizar.');
    }
  };

  return (
    <>
      <div className="bg-white p-5 rounded-2xl shadow-sm hover:shadow-xl border border-slate-100 transition-all duration-300 relative group flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-start mb-3">
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-600 border border-indigo-100">
              {cliente.status}
            </span>
            <div className="flex gap-1 opacity-80 group-hover:opacity-100 transition">
              <button 
                onClick={() => setIsModalOpen(true)}
                className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition"
                title="Editar cliente"
              >
                ✏️
              </button>
              <button 
                onClick={() => onDeletar(cliente.id)}
                className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition"
                title="Excluir cliente"
              >
                🗑️
              </button>
            </div>
          </div>

          <h3 className="text-lg font-bold text-slate-800 tracking-tight">{cliente.nome_empresa}</h3>
          <p className="text-sm text-slate-500 font-medium mb-3">👤 {cliente.pessoa_contato}</p>
          
          <div className="text-xs text-slate-600 space-y-1.5 bg-slate-50 p-3 rounded-xl border border-slate-100">
            <p className="flex items-center gap-2">✉️ <span className="truncate">{cliente.email}</span></p>
            <p className="flex items-center gap-2">📞 {cliente.telefone || 'Não informado'}</p>
          </div>
        </div>
      </div>

      {/* Modal de Edição */}
      <ModalEdicao isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} titulo="Editar Cliente">
        <form onSubmit={handleEditar} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Nome da Empresa</label>
            <input type="text" required value={nomeEmpresa} onChange={(e) => setNomeEmpresa(e.target.value)}
              className="w-full border border-slate-200 rounded-xl p-2.5 text-sm focus:ring-2 focus:ring-indigo-500 outline-none" />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Pessoa de Contato</label>
            <input type="text" required value={pessoaContato} onChange={(e) => setPessoaContato(e.target.value)}
              className="w-full border border-slate-200 rounded-xl p-2.5 text-sm focus:ring-2 focus:ring-indigo-500 outline-none" />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-600 uppercase mb-1">E-mail</label>
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-slate-200 rounded-xl p-2.5 text-sm focus:ring-2 focus:ring-indigo-500 outline-none" />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Telefone</label>
            <input type="text" value={telefone} onChange={(e) => setTelefone(e.target.value)}
              className="w-full border border-slate-200 rounded-xl p-2.5 text-sm focus:ring-2 focus:ring-indigo-500 outline-none" />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Status</label>
            <select value={status} onChange={(e) => setStatus(e.target.value)}
              className="w-full border border-slate-200 rounded-xl p-2.5 text-sm focus:ring-2 focus:ring-indigo-500 outline-none bg-white">
              <option value="Lead">Lead</option>
              <option value="Em Negociação">Em Negociação</option>
              <option value="Cliente Ativo">Cliente Ativo</option>
            </select>
          </div>
          <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2.5 rounded-xl transition shadow-lg shadow-indigo-500/20">
            Salvar Alterações
          </button>
        </form>
      </ModalEdicao>
    </>
  );
}