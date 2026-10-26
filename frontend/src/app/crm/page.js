'use client';
import { useState, useEffect } from 'react';

export default function CRMPage() {
  const [clientes, setClientes] = useState([]);
  const [carregando, setCarregando] = useState(true);

  const [nomeEmpresa, setNomeEmpresa] = useState('');
  const [pessoaContato, setPessoaContato] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');

  const buscarClientes = () => {
    fetch('http://127.0.0.1:8000/api/clientes')
      .then((res) => res.json())
      .then((data) => {
        setClientes(data);
        setCarregando(false);
      })
      .catch((err) => {
        console.error('Erro ao buscar clientes:', err);
        setCarregando(false);
      });
  };

  useEffect(() => {
    buscarClientes();
  }, []);

  const cadastrarCliente = async (e) => {
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
        buscarClientes();
        alert('Cliente cadastrado com sucesso!');
      } else {
        alert('Erro ao cadastrar cliente.');
      }
    } catch (err) {
      alert('Erro de conexão com o back-end.');
    }
  };

  // Função para deletar cliente
  const deletarCliente = async (id) => {
    if (!window.confirm('Tem certeza que deseja excluir este cliente?')) return;

    try {
      const res = await fetch(`http://127.0.0.1:8000/api/clientes/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        buscarClientes(); // Atualiza a lista na tela
      } else {
        alert('Erro ao excluir cliente.');
      }
    } catch (err) {
      alert('Erro de conexão ao excluir.');
    }
  };

  return (
    <main className="min-h-screen p-8 bg-gray-50 text-gray-800">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8 border-b pb-4">
          <h1 className="text-3xl font-bold">Gestão de Clientes (CRM)</h1>
          <p className="text-gray-600">Cadastre e acompanhe seus leads corporativos.</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md border lg:col-span-1 h-fit">
            <h2 className="text-xl font-semibold mb-4 text-blue-700">Novo Cliente</h2>
            <form onSubmit={cadastrarCliente} className="space-y-4">
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

          <div className="lg:col-span-2">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">Meus Leads</h2>
            
            {carregando ? (
              <p className="text-gray-500">Carregando CRM...</p>
            ) : clientes.length === 0 ? (
              <div className="bg-white p-6 rounded-lg shadow border text-center">
                <p className="text-gray-600">Nenhum cliente cadastrado ainda.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {clientes.map((cliente) => (
                  <div key={cliente.id} className="bg-white p-5 rounded-lg shadow border border-l-4 border-l-blue-500 relative group">
                    <button 
                      onClick={() => deletarCliente(cliente.id)}
                      className="absolute top-4 right-4 text-gray-400 hover:text-red-600 transition"
                      title="Excluir cliente"
                    >
                      🗑️
                    </button>
                    <h3 className="text-lg font-bold text-gray-800 pr-6">{cliente.nome_empresa}</h3>
                    <p className="text-sm text-gray-600 mb-2">👤 {cliente.pessoa_contato}</p>
                    <div className="text-sm text-gray-700 space-y-1">
                      <p>✉️ {cliente.email}</p>
                      <p>📞 {cliente.telefone || 'Não informado'}</p>
                    </div>
                    <div className="mt-3 pt-3 border-t">
                      <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                        Status: {cliente.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}