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
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <main className="min-h-[calc(100vh-4rem)] p-6 md:p-10 text-slate-800">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8 border-b border-slate-200/80 pb-6">
          <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-blue-500 to-cyan-600 bg-clip-text text-transparent">
            Portfólio de Campanhas
          </h1>
          <p className="text-slate-500 mt-1">Registre as ativações de marca em PDV e Promoção de Vendas.</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <CampanhaForm onAdicionado={buscarCampanhas} />
          </div>

          <div className="lg:col-span-2">
            <h2 className="text-xl font-bold text-slate-700 mb-4">Campanhas em Destaque</h2>
            
            {carregando ? (
              <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-600" />
              </div>
            ) : campanhas.length === 0 ? (
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 text-center">
                <p className="text-slate-500">Nenhuma campanha cadastrada no momento.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {campanhas.map((item) => (
                  <CampanhaCard 
                    key={item.id} 
                    campanha={item} 
                    onDeletar={deletarCampanha} 
                    onAtualizar={buscarCampanhas}
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