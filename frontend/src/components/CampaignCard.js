'use client';

export default function CampaignCard({ campanha, onDeletar }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow border border-t-4 border-t-blue-500 relative group">
      <button 
        onClick={() => onDeletar(campanha.id)}
        className="absolute top-4 right-4 text-gray-400 hover:text-red-600 transition"
        title="Excluir campanha"
      >
        🗑️
      </button>
      <div className="flex justify-between items-start mb-2 pr-8">
        <h3 className="text-xl font-bold text-gray-800">{campanha.titulo_acao}</h3>
      </div>
      <span className="inline-block text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded mb-3">
        {campanha.data_realizacao}
      </span>
      <p className="text-gray-700 mb-4 text-sm">{campanha.descricao}</p>
      {campanha.resultados_obtidos && (
        <div className="bg-blue-50 p-3 rounded text-sm text-blue-800 border border-blue-100">
          <strong>Resultados:</strong> {campanha.resultados_obtidos}
        </div>
      )}
    </div>
  );
}