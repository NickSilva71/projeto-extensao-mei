'use client';
import { useEffect, useState } from 'react';
import ResumoCard from '../components/ResumeCard';
import ReceitaChart from '../components/RevenueChart';
import LeadsChart from '../components/LeadsChart';

export default function DashboardVitrine() {
  const [dados, setDados] = useState({ campanhas: [], clientes: [], propostas: [] });
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const buscarDadosDashboard = async () => {
      try {
        const [resCampanhas, resClientes, resPropostas] = await Promise.all([
          fetch('https://api-crm-b2b.onrender.com/api/campanhas'),
          fetch('https://api-crm-b2b.onrender.com/api/clientes'),
          fetch('https://api-crm-b2b.onrender.com/api/propostas')
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

  // Processamento e ordenação para pegar apenas os 3 itens mais relevantes
  const campanhasProximas = [...dados.campanhas]
    .sort((a, b) => new Date(b.data_realizacao) - new Date(a.data_realizacao))
    .slice(0, 3);
    
  const ultimosClientes = [...dados.clientes]
    .reverse()
    .slice(0, 3);
    
  const propostasPendentes = [...dados.propostas]
    .filter(p => p.data_validade)
    .sort((a, b) => new Date(a.data_validade) - new Date(b.data_validade))
    .slice(0, 3);

  // Funções de apoio visual e de dados
  const getNomeCliente = (id) => {
    const cliente = dados.clientes.find(c => c.id === id);
    return cliente ? cliente.nome_empresa : 'Cliente não encontrado';
  };

  const getStatusColor = (status) => {
    if (status === 'Cliente Ativo') return 'bg-emerald-100 text-emerald-700 border-emerald-200';
    if (status === 'Em Negociação') return 'bg-amber-100 text-amber-700 border-amber-200';
    return 'bg-indigo-100 text-indigo-700 border-indigo-200';
  };

  return (
    <main className="min-h-[calc(100vh-4rem)] p-6 md:p-10 text-slate-800">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* CABEÇALHO DO DASHBOARD */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200/80 pb-6">
          <div>
            <h1 className="text-3xl font-black tracking-tight text-slate-900">
              Visão Geral
            </h1>
            <p className="text-slate-500 text-sm mt-1">
              Acompanhamento em tempo real de ações, novos leads e propostas ativas.
            </p>
          </div>
          <div className="flex items-center gap-2 self-start md:self-auto bg-emerald-50 text-emerald-700 text-xs font-bold px-3 py-1.5 rounded-full border border-emerald-200/60">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Sistema Operacional
          </div>
        </header>

        {carregando ? (
          // LOADING SPINNER
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600" />
          </div>
        ) : (
          <div className="space-y-6">
            
            {/* 1. SESSÃO DE CARDS MENORES */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Card Campanhas */}
              <ResumoCard titulo="Campanhas" linkHref="/campanhas" linkTexto="Ver todas" corGradiente="from-blue-500 to-cyan-500" icone="📢">
                {campanhasProximas.length === 0 ? (
                  <p className="text-xs text-slate-400 py-4 text-center">Sem campanhas registradas.</p>
                ) : (
                  campanhasProximas.map(camp => (
                    <div key={camp.id} className="p-3 bg-slate-50/80 rounded-xl border border-slate-100 flex flex-col gap-1">
                      <p className="font-bold text-slate-800 text-sm truncate">{camp.titulo_acao}</p>
                      <span className="text-[11px] font-medium text-slate-400">📅 {camp.data_realizacao}</span>
                    </div>
                  ))
                )}
              </ResumoCard>

              {/* Card Leads (Com Dados Completos) */}
              <ResumoCard titulo="Últimos Leads" linkHref="/crm" linkTexto="Ver CRM" corGradiente="from-indigo-500 to-violet-500" icone="👥">
                {ultimosClientes.length === 0 ? (
                  <p className="text-xs text-slate-400 py-4 text-center">Sem clientes cadastrados.</p>
                ) : (
                  ultimosClientes.map(cliente => (
                    <div key={cliente.id} className="p-3 bg-slate-50/80 rounded-xl border border-slate-100 flex flex-col gap-2">
                      <div className="flex justify-between items-start">
                        <p className="font-bold text-slate-800 text-sm truncate pr-2">{cliente.nome_empresa}</p>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${getStatusColor(cliente.status)} shrink-0`}>
                          {cliente.status || 'Lead'}
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-500 space-y-0.5">
                        <p>👤 {cliente.pessoa_contato}</p>
                        <p>✉️ {cliente.email}</p>
                        {cliente.telefone && <p>📞 {cliente.telefone}</p>}
                      </div>
                    </div>
                  ))
                )}
              </ResumoCard>

              {/* Card Propostas */}
              <ResumoCard titulo="Validade Propostas" linkHref="/propostas" linkTexto="Ver todas" corGradiente="from-emerald-500 to-teal-500" icone="📄">
                {propostasPendentes.length === 0 ? (
                  <p className="text-xs text-slate-400 py-4 text-center">Nenhuma proposta pendente.</p>
                ) : (
                  propostasPendentes.map(prop => (
                    <div key={prop.id} className="p-3 bg-slate-50/80 rounded-xl border border-slate-100 flex justify-between items-center">
                      <div className="truncate pr-2">
                        <p className="font-bold text-slate-800 text-sm truncate">{getNomeCliente(prop.cliente_id)}</p>
                        <span className="text-[11px] text-rose-500 font-medium">Vence: {prop.data_validade}</span>
                      </div>
                      <span className="text-xs font-black text-emerald-700 bg-emerald-100/80 px-2.5 py-1 rounded-lg shrink-0">
                        R$ {prop.valor_proposta.toFixed(2)}
                      </span>
                    </div>
                  ))
                )}
              </ResumoCard>
            </div>

            {/* 2. SESSÃO DE GRÁFICOS (Só renderiza se houver dados no banco) */}
            {(dados.propostas.length > 0 || dados.clientes.length > 0) && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-2">
                
                {dados.propostas.length > 0 && (
                  <div className="lg:col-span-2">
                    <ReceitaChart propostas={dados.propostas} />
                  </div>
                )}
                
                {dados.clientes.length > 0 && (
                  <div className="lg:col-span-1">
                    <LeadsChart clientes={dados.clientes} />
                  </div>
                )}

              </div>
            )}

          </div>
        )}
      </div>
    </main>
  );
}