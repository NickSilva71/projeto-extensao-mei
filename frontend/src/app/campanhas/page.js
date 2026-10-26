'use client';
import { useEffect, useState } from 'react';
import CampanhaForm from '../../components/CampaignForm';
import CampanhaCard from '../../components/CampaignCard';

export default function CampanhasPage() {
  const [campanhas, setCampanhas] = useState([]);
  const [carregando, setCarregando] = useState(true);

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

  const deletarCampanha = async (id) => {
    if (!window.confirm('Tem certeza que deseja excluir esta campanha?')) return;
    try {
      const res = await fetch(`http://127.0.0.1:8000/api/campanhas/${id}`, { method: 'DELETE' });
      if (res.ok) buscarCampanhas();
      else alert('Erro ao excluir campanha.');
    } catch (err) {
      alert('Erro de conexão ao excluir.');
    }
  };

  return (
    <main className="min-h-screen p-8 text-gray-800">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8 border-b pb-4">
          <h1 className="text-3xl font-bold">Portfólio de Campanhas</h1>
          <p className="text-gray-600">Ativações de Marca em PDV e Promoção de Vendas.</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <CampanhaForm onAdicionado={buscarCampanhas} />
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
                  <CampanhaCard key={item.id} campanha={item} onDeletar={deletarCampanha} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}