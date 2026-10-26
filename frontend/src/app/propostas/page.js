'use client';
import { useState, useEffect } from 'react';

export default function PropostasPage() {
  const [propostas, setPropostas] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [carregando, setCarregando] = useState(true);

  // Estados do formulário
  const [clienteId, setClienteId] = useState('');
  const [descricaoServico, setDescricaoServico] = useState('');
  const [valorProposta, setValorProposta] = useState('');
  const [dataValidade, setDataValidade] = useState('');

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

  const cadastrarProposta = async (e) => {
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
        carregarDados();
        alert('Proposta gerada com sucesso!');
      } else {
        alert('Erro ao gerar proposta.');
      }
    } catch (err) {
      alert('Erro de conexão com o back-end.');
    }
  };

  // Função para pegar o nome da empresa pelo ID
  const getNomeCliente = (id) => {
    const cliente = clientes.find(c => c.id === id);
    return cliente ? cliente.nome_empresa : 'Cliente não encontrado';
  };

  return (
    <main className="min-h-screen p-8 bg-gray-50 text-gray-800">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8 border-b pb-4">
          <h1 className="text-3xl font-bold">Propostas Comerciais</h1>
          <p className="text-gray-600">Gere orçamentos e vincule aos seus clientes do CRM.</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md border lg:col-span-1 h-fit">
            <h2 className="text-xl font-semibold mb-4 text-blue-700">Nova Proposta</h2>
            <form onSubmit={cadastrarProposta} className="space-y-4">
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
                  <div key={prop.id} className="bg-white p-5 rounded-lg shadow border border-l-4 border-l-green-500 flex justify-between items-center">
                    <div>
                      <h3 className="text-lg font-bold text-gray-800">{getNomeCliente(prop.cliente_id)}</h3>
                      <p className="text-sm text-gray-600 mt-1">{prop.descricao_servico}</p>
                      {prop.data_validade && (
                        <p className="text-xs text-gray-500 mt-2">Válido até: {prop.data_validade}</p>
                      )}
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold text-green-700">
                        R$ {prop.valor_proposta.toFixed(2).replace('.', ',')}
                      </p>
                      <span className="inline-block mt-2 bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded">
                        {prop.status}
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