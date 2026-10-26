'use client';
import { useEffect, useState } from 'react';

export default function Home() {
  const [campanhas, setCampanhas] = useState([]);
  const [carregando, setCarregando] = useState(true);

  const [tituloAcao, setTituloAcao] = useState('');
  const [descricao, setDescricao] = useState('');
  const [resultadosObtidos, setResultadosObtidos] = useState('');
  const [dataRealizacao, setDataRealizacao] = useState('');

  const buscarCampanhas = () => {
    fetch('http://127.0.0.1:8000/api/campanhas')
      .then((res) => res.json())
      .then((data) => {
        setCampanhas(data);
        setCarregando(false);
      })
      .catch((err) => {
        console.error('Erro ao buscar campanhas:', err);
        setCarregando(false);
      });
  };

  useEffect(() => {
    buscarCampanhas();
  }, []);

  const cadastrarCampanha = async (e) => {
    e.preventDefault();
    const novaCampanha = {
      titulo_acao: tituloAcao,
      descricao: descricao,
      resultados_obtidos: resultadosObtidos || null,
      data_realizacao: dataRealizacao,
      visivel_publico: true
    };

    try {
      const res = await fetch('http://127.0.0.1:8000/api/campanhas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(novaCampanha),
      });

      if (res.ok) {
        setTituloAcao('');
        setDescricao('');
        setResultadosObtidos('');
        setDataRealizacao('');
        buscarCampanhas();
        alert('Campanha adicionada ao portfólio!');
      } else {
        alert('Erro ao cadastrar a campanha.');
      }
    } catch (err) {
      alert('Erro de conexão com o back-end.');
    }
  };

  // Função para deletar campanha
  const deletarCampanha = async (id) => {
    if (!window.confirm('Tem certeza que deseja excluir esta campanha?')) return;

    try {
      const res = await fetch(`http://127.0.0.1:8000/api/campanhas/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        buscarCampanhas(); // Recarrega a lista
      } else {
        alert('Erro ao excluir campanha.');
      }
    } catch (err) {
      alert('Erro de conexão ao excluir.');
    }
  };

  return (
    <main className="min-h-screen p-8 bg-gray-50 text-gray-800">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8 border-b pb-4">
          <h1 className="text-3xl font-bold">Dário Faustino — Promoção de Vendas</h1>
          <p className="text-gray-600">Portfólio B2B & Ativações de Marca em PDV (Paudalho - PE)</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md border lg:col-span-1 h-fit">
            <h2 className="text-xl font-semibold mb-4 text-blue-700">Nova Campanha</h2>
            <form onSubmit={cadastrarCampanha} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Título da Ação *</label>
                <input type="text" required value={tituloAcao} onChange={(e) => setTituloAcao(e.target.value)}
                  className="w-full border rounded p-2" placeholder="Ex: Degustação Marca X" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Descrição *</label>
                <textarea required value={descricao} onChange={(e) => setDescricao(e.target.value)}
                  className="w-full border rounded p-2" rows="3" placeholder="Detalhes de como ocorreu a ação..." />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Resultados Obtidos</label>
                <textarea value={resultadosObtidos} onChange={(e) => setResultadosObtidos(e.target.value)}
                  className="w-full border rounded p-2" rows="2" placeholder="Ex: Aumento de 20% nas vendas" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Data da Realização *</label>
                <input type="date" required value={dataRealizacao} onChange={(e) => setDataRealizacao(e.target.value)}
                  className="w-full border rounded p-2" />
              </div>
              <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition">
                Salvar no Portfólio
              </button>
            </form>
          </div>

          <div className="lg:col-span-2">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">Campanhas em Destaque</h2>
            
            {carregando ? (
              <p className="text-gray-500">Carregando portfólio...</p>
            ) : campanhas.length === 0 ? (
              <div className="bg-white p-6 rounded-lg shadow border text-center">
                <p className="text-gray-600">Nenhuma campanha cadastrada no momento.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {campanhas.map((item) => (
                  <div key={item.id} className="bg-white p-6 rounded-lg shadow border border-t-4 border-t-blue-500 relative group">
                    <button 
                      onClick={() => deletarCampanha(item.id)}
                      className="absolute top-4 right-4 text-gray-400 hover:text-red-600 transition"
                      title="Excluir campanha"
                    >
                      🗑️
                    </button>
                    <div className="flex justify-between items-start mb-2 pr-8">
                      <h3 className="text-xl font-bold text-gray-800">{item.titulo_acao}</h3>
                    </div>
                    <span className="inline-block text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded mb-3">
                      {item.data_realizacao}
                    </span>
                    <p className="text-gray-700 mb-4 text-sm">{item.descricao}</p>
                    {item.resultados_obtidos && (
                      <div className="bg-blue-50 p-3 rounded text-sm text-blue-800 border border-blue-100">
                        <strong>Resultados:</strong> {item.resultados_obtidos}
                      </div>
                    )}
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