'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function DashboardVitrine() {
  const [dados, setDados] = useState({ campanhas: [], clientes: [], propostas: [] });
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const buscarDadosDashboard = async () => {
      try {
        const [resCampanhas, resClientes, resPropostas] = await Promise.all([
          fetch('http://127.0.0.1:8000/api/campanhas'),
          fetch('http://127.0.0.1:8000/api/clientes'),
          fetch('http://127.0.0.1:8000/api/propostas')
        ]);
        
        const campanhas = await resCampanhas.json();
        const clientes = await resClientes.json();
        const propostas = await resPropostas.json();

        setDados({ campanhas, clientes, propostas });
        setCarregando(false);
      } catch (error) {
        console.error("Erro ao carregar dashboard:", error);
        setCarregando(false);
      }
    };
    buscarDadosDashboard();
  }, []);

  // Funções para ordenar e pegar os dados mais relevantes (últimos 3 de cada)
  const campanhasProximas = [...dados.campanhas].sort((a, b) => new Date(b.data_realizacao) - new Date(a.data_realizacao)).slice(0, 3);
  const ultimosClientes = [...dados.clientes].reverse().slice(0, 3);
  const propostasPendentes = [...dados.propostas].filter(p => p.data_validade).sort((a, b) => new Date(a.data_validade) - new Date(b.data_validade)).slice(0, 3);

  const getNomeCliente = (id) => {
    const cliente = dados.clientes.find(c => c.id === id);
    return cliente ? cliente.nome_empresa : 'Cliente não encontrado';
  };

  return (
    <main className="min-h-screen p-8 bg-gray-50 text-gray-800">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8 border-b pb-4">
          <h1 className="text-3xl font-bold">Visão Geral</h1>
          <p className="text-gray-600">Resumo estratégico do CRM, Portfólio e Propostas Comerciais.</p>
        </header>

        {carregando ? (
          <p className="text-gray-500">Carregando painel...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Card: Campanhas */}
            <div className="bg-white p-6 rounded-lg shadow border border-t-4 border-t-blue-500">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-700">Ações & Campanhas</h2>
                <Link href="/campanhas" className="text-sm text-blue-600 hover:underline">Ver todas</Link>
              </div>
              <div className="space-y-4">
                {campanhasProximas.length === 0 ? <p className="text-sm text-gray-500">Sem campanhas recentes.</p> : 
                  campanhasProximas.map(camp => (
                    <div key={camp.id} className="border-b pb-2">
                      <p className="font-semibold text-gray-800 truncate">{camp.titulo_acao}</p>
                      <p className="text-xs text-gray-500">Data: {camp.data_realizacao}</p>
                    </div>
                  ))
                }
              </div>
            </div>

            {/* Card: CRM */}
            <div className="bg-white p-6 rounded-lg shadow border border-t-4 border-t-indigo-500">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-700">Últimos Leads</h2>
                <Link href="/crm" className="text-sm text-indigo-600 hover:underline">Ver CRM</Link>
              </div>
              <div className="space-y-4">
                {ultimosClientes.length === 0 ? <p className="text-sm text-gray-500">Sem clientes cadastrados.</p> : 
                  ultimosClientes.map(cliente => (
                    <div key={cliente.id} className="border-b pb-2">
                      <p className="font-semibold text-gray-800 truncate">{cliente.nome_empresa}</p>
                      <p className="text-xs text-gray-500">Contato: {cliente.pessoa_contato}</p>
                    </div>
                  ))
                }
              </div>
            </div>

            {/* Card: Propostas */}
            <div className="bg-white p-6 rounded-lg shadow border border-t-4 border-t-green-500">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-700">Validade Propostas</h2>
                <Link href="/propostas" className="text-sm text-green-600 hover:underline">Ver todas</Link>
              </div>
              <div className="space-y-4">
                {propostasPendentes.length === 0 ? <p className="text-sm text-gray-500">Nenhuma validade próxima.</p> : 
                  propostasPendentes.map(prop => (
                    <div key={prop.id} className="border-b pb-2">
                      <p className="font-semibold text-gray-800 truncate">{getNomeCliente(prop.cliente_id)}</p>
                      <div className="flex justify-between mt-1">
                        <p className="text-xs text-red-500 font-medium">Vence em: {prop.data_validade}</p>
                        <p className="text-xs font-bold text-green-700">R$ {prop.valor_proposta.toFixed(2)}</p>
                      </div>
                    </div>
                  ))
                }
              </div>
            </div>

          </div>
        )}
      </div>
    </main>
  );
}