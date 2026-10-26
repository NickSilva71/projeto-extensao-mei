'use client';
import { useMemo } from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const CORES_STATUS = {
  'Lead': '#6366f1',
  'Em Negociação': '#f59e0b',
  'Cliente Ativo': '#10b981',
  'Outro': '#94a3b8'
};

export default function LeadsChart({ clientes }) {
  const dadosProcessados = useMemo(() => {
    if (!clientes || clientes.length === 0) return [];
    
    const contagem = {};
    clientes.forEach(cliente => {
      const status = cliente.status || 'Lead';
      contagem[status] = (contagem[status] || 0) + 1;
    });

    return Object.keys(contagem).map(key => ({
      nome: key,
      valor: contagem[key]
    }));
  }, [clientes]);

  if (dadosProcessados.length === 0) return null;

  return (
    <div className="bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-sm border border-slate-200/80 flex flex-col h-full animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-xl p-2 rounded-xl bg-indigo-50 text-indigo-600">🎯</span>
        <div>
          <h2 className="text-lg font-bold text-slate-800 tracking-tight">Conversão de Leads</h2>
          <p className="text-xs text-slate-500">Distribuição por status no CRM</p>
        </div>
      </div>

      <div className="flex-1 w-full min-h-[250px] flex items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={dadosProcessados}
              cx="50%"
              cy="50%"
              innerRadius={65}
              outerRadius={85}
              paddingAngle={5}
              dataKey="valor"
              nameKey="nome" /* 👈 Esta é a linha que corrige a legenda */
              stroke="none"
            >
              {dadosProcessados.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={CORES_STATUS[entry.nome] || CORES_STATUS['Outro']} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
              itemStyle={{ fontWeight: 'bold', color: '#0f172a' }}
              formatter={(value) => [value, 'Empresas']}
            />
            <Legend 
              verticalAlign="bottom" 
              height={36} 
              iconType="circle" 
              wrapperStyle={{ fontSize: '12px', fontWeight: '500', color: '#64748b' }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}