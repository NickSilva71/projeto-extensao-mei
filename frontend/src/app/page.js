'use client';
import { useEffect, useState } from 'react';

export default function Home() {
  const [campanhas, setCampanhas] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    // Busca as campanhas cadastradas na API FastAPI
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
  }, []);

  return (
    <main className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8 border-b pb-4">
          <h1 className="text-3xl font-bold text-gray-800">
            Dário Faustino — Promoção de Vendas
          </h1>
          <p className="text-gray-600">
            Portfólio B2B & Ativações de Marca em PDV (Paudalho - PE)
          </p>
        </header>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">
            Campanhas em Destaque
          </h2>

          {carregando ? (
            <p className="text-gray-500">Carregando portfólio...</p>
          ) : campanhas.length === 0 ? (
            <div className="bg-white p-6 rounded-lg shadow text-center border">
              <p className="text-gray-600 mb-2">
                Nenhuma campanha cadastrada no momento.
              </p>
              <span className="text-sm text-gray-400">
                Cadastre campanhas via API em http://127.0.0.1:8000/docs
              </span>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {campanhas.map((item) => (
                <div key={item.id} className="bg-white p-6 rounded-lg shadow border">
                  <h3 className="text-xl font-bold mb-2 text-blue-600">
                    {item.titulo_acao}
                  </h3>
                  <p className="text-gray-700 mb-4">{item.descricao}</p>
                  {item.resultados_obtidos && (
                    <div className="bg-blue-50 p-3 rounded text-sm text-blue-800">
                      <strong>Resultados:</strong> {item.resultados_obtidos}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}