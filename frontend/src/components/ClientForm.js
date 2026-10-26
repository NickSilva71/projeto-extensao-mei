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
      const res = await fetch('http://127.0.0.1:8000/api/clientes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(novoCliente),
      });

      if (res.ok) {
        setNomeEmpresa('');
        setPessoaContato('');
        setEmail('');
        setTelefone('');
        onAdicionado(); // Chama a função para atualizar a lista na tela principal
        alert('Cliente cadastrado com sucesso!');
      } else {
        alert('Erro ao cadastrar cliente.');
      }
    } catch (err) {
      alert('Erro de conexão com o back-end.');
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border h-fit">
      <h2 className="text-xl font-semibold mb-4 text-blue-700">Novo Cliente</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Nome da Empresa *</label>
          <input type="text" required value={nomeEmpresa} onChange={(e) => setNomeEmpresa(e.target.value)}
            className="w-full border rounded p-2" placeholder="Ex: Supermercado Todo Dia" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Pessoa de Contato *</label>
          <input type="text" required value={pessoaContato} onChange={(e) => setPessoaContato(e.target.value)}
            className="w-full border rounded p-2" placeholder="Ex: João Silva (Gerente)" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">E-mail *</label>
          <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded p-2" placeholder="contato@empresa.com" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Telefone / WhatsApp</label>
          <input type="text" value={telefone} onChange={(e) => setTelefone(e.target.value)}
            className="w-full border rounded p-2" placeholder="(81) 90000-0000" />
        </div>
        <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition">
          Salvar Cliente
        </button>
      </form>
    </div>
  );
}