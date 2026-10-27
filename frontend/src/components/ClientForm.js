'use client';
import { useState } from 'react';

export default function ClientForm({ onAdicionado }) {
  const [nomeEmpresa, setNomeEmpresa] = useState('');
  const [pessoaContato, setPessoaContato] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const novoCliente = {
      nome_empresa: nomeEmpresa,
      pessoa_contato: pessoaContato,
      email: email,
      telefone: telefone,
      status: 'Lead'
    };

    try {
      const res = await fetch('https://api-crm-b2b.onrender.com/api/clientes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(novoCliente),
      });

      if (res.ok) {
        setNomeEmpresa('');
        setPessoaContato('');
        setEmail('');
        setTelefone('');
        onAdicionado();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-sm border border-slate-200/80">
      <div className="flex items-center gap-2 mb-6 border-b border-slate-100 pb-3">
        <div className="w-2 h-6 bg-gradient-to-b from-indigo-500 to-violet-600 rounded-full" />
        <h2 className="text-lg font-bold text-slate-800">Novo Cliente</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Empresa *</label>
          <input 
            type="text" required value={nomeEmpresa} onChange={(e) => setNomeEmpresa(e.target.value)}
            className="w-full border border-slate-200 rounded-xl p-2.5 text-sm bg-slate-50/50 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition" 
            placeholder="Ex: Tech Solutions" 
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Contato *</label>
          <input 
            type="text" required value={pessoaContato} onChange={(e) => setPessoaContato(e.target.value)}
            className="w-full border border-slate-200 rounded-xl p-2.5 text-sm bg-slate-50/50 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition" 
            placeholder="Ex: Ana Souza" 
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">E-mail *</label>
          <input 
            type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-slate-200 rounded-xl p-2.5 text-sm bg-slate-50/50 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition" 
            placeholder="contato@empresa.com" 
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Telefone</label>
          <input 
            type="text" value={telefone} onChange={(e) => setTelefone(e.target.value)}
            className="w-full border border-slate-200 rounded-xl p-2.5 text-sm bg-slate-50/50 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition" 
            placeholder="(81) 90000-0000" 
          />
        </div>

        <button 
          type="submit" 
          className="w-full mt-2 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white font-semibold py-3 px-4 rounded-xl transition-all shadow-md shadow-indigo-500/20 active:scale-[0.98]"
        >
          Cadastrar Cliente
        </button>
      </form>
    </div>
  );
}