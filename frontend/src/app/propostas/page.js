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
    } catch (err) {
      console.error(err);
    }
  };

  const getNomeCliente = (id) => {
    const cliente = clientes.find(c => c.id === id);
    return cliente ? cliente.nome_empresa : 'Cliente não encontrado';
  };

  return (
    <main className="min-h-[calc(100vh-4rem)] p-6 md:p-10 text-slate-800">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8 border-b border-slate-200/80 pb-6">
          <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-emerald-500 to-teal-600 bg-clip-text text-transparent">
            Propostas Comerciais
          </h1>
          <p className="text-slate-500 mt-1">Gere, edite e aprove orçamentos para os clientes do CRM.</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <PropostaForm clientes={clientes} onAdicionado={carregarDados} />
          </div>

          <div className="lg:col-span-2">
            <h2 className="text-xl font-bold text-slate-700 mb-4">Propostas Emitidas</h2>
            
            {carregando ? (
              <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600" />
              </div>
            ) : propostas.length === 0 ? (
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 text-center">
                <p className="text-slate-500">Nenhuma proposta comercial emitida.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {propostas.map((prop) => (
                  <PropostaCard 
                    key={prop.id} 
                    proposta={prop} 
                    nomeCliente={getNomeCliente(prop.cliente_id)}
                    clientes={clientes}
                    onDeletar={deletarProposta} 
                    onAtualizar={carregarDados}
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