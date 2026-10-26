'use client';
import { useState, useEffect } from 'react';
import PropostaForm from '../../components/ProposalForm';
import PropostaCard from '../../components/ProposalCard';

export default function PropostasPage() {
  const [propostas, setPropostas] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [carregando, setCarregando] = useState(true);

  const carregarDados = async () => {
    try {
      const [resPropostas, resClientes] = await Promise.all([
        fetch('http://127.0.0.1:8000/api/propostas'),
        fetch('http://127.0.0.1:8000/api/clientes')
      ]);
      
      setPropostas(await resPropostas.json());
      setClientes(await resClientes.json());
      setCarregando(false);
    } catch (err) {
      console.error('Erro ao buscar dados:', err);
      setCarregando(false);
    }
  };

  useEffect(() => {
    carregarDados();
  }, []);

  const deletarProposta = async (id) => {
    if (!window.confirm('Tem certeza que deseja excluir esta proposta?')) return;
    try {
      const res = await fetch(`http://127.0.0.1:8000/api/propostas/${id}`, { method: 'DELETE' });
      if (res.ok) carregarDados();
      else alert('Erro ao excluir proposta.');
    } catch (err) {
      alert('Erro de conexão ao excluir.');
    }
  };

  const getNomeCliente = (id) => {
    const cliente = clientes.find(c => c.id === id);
    return cliente ? cliente.nome_empresa : 'Cliente não encontrado';
  };

  return (
    <main className="min-h-screen p-8 text-gray-800">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8 border-b pb-4">
          <h1 className="text-3xl font-bold">Propostas Comerciais</h1>
          <p className="text-gray-600">Gere orçamentos e vincule aos seus clientes do CRM.</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <PropostaForm clientes={clientes} onAdicionado={carregarDados} />
          </div>

          <div className="lg:col-span-2">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">Propostas Emitidas</h2>
            
            {carregando ? (
              <p className="text-gray-500">Carregando propostas...</p>
            ) : propostas.length === 0 ? (
              <div className="bg-white p-6 rounded-lg shadow border text-center">
                <p className="text-gray-600">Nenhuma proposta comercial emitida.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {propostas.map((prop) => (
                  <PropostaCard 
                    key={prop.id} 
                    proposta={prop} 
                    nomeCliente={getNomeCliente(prop.cliente_id)} 
                    onDeletar={deletarProposta} 
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}