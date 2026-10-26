'use client';

export default function ClientCard({ cliente, onDeletar }) {
  return (
    <div className="bg-white p-5 rounded-lg shadow border border-l-4 border-l-blue-500 relative group">
      <button 
        onClick={() => onDeletar(cliente.id)}
        className="absolute top-4 right-4 text-gray-400 hover:text-red-600 transition"
        title="Excluir cliente"
      >
        🗑️
      </button>
      <h3 className="text-lg font-bold text-gray-800 pr-6">{cliente.nome_empresa}</h3>
      <p className="text-sm text-gray-600 mb-2">👤 {cliente.pessoa_contato}</p>
      <div className="text-sm text-gray-700 space-y-1">
        <p>✉️ {cliente.email}</p>
        <p>📞 {cliente.telefone || 'Não informado'}</p>
      </div>
      <div className="mt-3 pt-3 border-t">
        <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
          Status: {cliente.status}
        </span>
      </div>
    </div>
  );
}