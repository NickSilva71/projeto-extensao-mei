'use client';

export default function ProposalCard({ proposta, nomeCliente, onDeletar }) {
  return (
    <div className="bg-white p-5 rounded-lg shadow border border-l-4 border-l-green-500 flex justify-between items-center relative group">
      <button 
        onClick={() => onDeletar(proposta.id)}
        className="absolute top-4 right-4 text-gray-400 hover:text-red-600 transition"
        title="Excluir proposta"
      >
        🗑️
      </button>
      <div>
        <h3 className="text-lg font-bold text-gray-800 pr-6">{nomeCliente}</h3>
        <p className="text-sm text-gray-600 mt-1">{proposta.descricao_servico}</p>
        {proposta.data_validade && (
          <p className="text-xs text-gray-500 mt-2">Válido até: {proposta.data_validade}</p>
        )}
      </div>
      <div className="text-right mt-6 pr-2">
        <p className="text-xl font-bold text-green-700">
          R$ {proposta.valor_proposta.toFixed(2).replace('.', ',')}
        </p>
        <span className="inline-block mt-2 bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded">
          {proposta.status}
        </span>
      </div>
    </div>
  );
}