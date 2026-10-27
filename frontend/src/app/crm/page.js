'use client';
import { useState, useEffect } from 'react';
import ClienteForm from '../../components/ClientForm';
import ClienteCard from '../../components/ClientCard';

export default function CRMPage() {
  const [clientes, setClientes] = useState([]);
  const [carregando, setCarregando] = useState(true);

  const buscarClientes = () => {
    fetch('https://api-crm-b2b.onrender.com/api/clientes')
      .then((res) => res.json())
      .then((data) => {
        setClientes(data);
        setCarregando(false);
      })
      .catch((err) => {
        console.error('Erro ao buscar clientes:', err);
        setCarregando(false);
      });
  };

  useEffect(() => {
    buscarClientes();
  }, []);

  const deletarCliente = async (id) => {
    if (!window.confirm('Tem certeza que deseja excluir este cliente?')) return;
    try {
      const res = await fetch(`https://api-crm-b2b.onrender.com/api/clientes/${id}`, { method: 'DELETE' });
      if (res.ok) buscarClientes();
      else alert('Erro ao excluir cliente.');
    } catch (err) {
      alert('Erro de conexão ao excluir.');
    }
  };

  return (
    <main className="min-h-screen p-8 text-gray-800">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8 border-b pb-4">
          <h1 className="text-3xl font-bold">Gestão de Clientes (CRM)</h1>
          <p className="text-gray-600">Cadastre e acompanhe seus leads corporativos.</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <ClienteForm onAdicionado={buscarClientes} />
          </div>

          <div className="lg:col-span-2">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">Meus Leads</h2>
            {carregando ? (
              <p className="text-gray-500">Carregando CRM...</p>
            ) : clientes.length === 0 ? (
              <div className="bg-white p-6 rounded-lg shadow border text-center">
                <p className="text-gray-600">Nenhum cliente cadastrado ainda.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {clientes.map((cliente) => (
                  <ClienteCard key={cliente.id} cliente={cliente} onDeletar={deletarCliente} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}