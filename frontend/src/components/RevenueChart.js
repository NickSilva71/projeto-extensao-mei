'use client';
import { useMemo } from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

export default function ReceitaChart({ propostas }) {
  // Processa e agrupa os dados reais
  const dadosProcessados = useMemo(() => {
    if (!propostas || propostas.length === 0) return [];

    const mapa = {};

    propostas.forEach(prop => {
      // Usa a data de validade ou a data atual (caso a validade esteja vazia)
      const dataStr = prop.data_validade || new Date().toISOString().split('T')[0];
      const dataObj = new Date(dataStr + 'T12:00:00'); // T12 evita bugs de fuso horário
      
      const mes = dataObj.toLocaleDateString('pt-BR', { month: 'short' }).replace('.', '');
      const ano = dataObj.getFullYear().toString().slice(2); // Pega os 2 últimos dígitos do ano
      const chave = `${dataObj.getFullYear()}-${dataObj.getMonth()}`;

      if (!mapa[chave]) {
        mapa[chave] = {
          chaveOrdenacao: dataObj.getTime(),
          mes: `${mes.charAt(0).toUpperCase() + mes.slice(1)}/${ano}`, // Ex: Out/26
          receita: 0
        };
      }
      mapa[chave].receita += prop.valor_proposta;
    });

    // Retorna ordenado cronologicamente
    return Object.values(mapa).sort((a, b) => a.chaveOrdenacao - b.chaveOrdenacao);
  }, [propostas]);

  // Regra de Ocultação: Se não houver dados, o gráfico não aparece
  if (dadosProcessados.length === 0) return null;

  return (
    <div className="bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-sm border border-slate-200/80 flex flex-col h-full animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center gap-2 mb-6">
        <span className="text-xl p-2 rounded-xl bg-emerald-50 text-emerald-600">📈</span>
        <div>
          <h2 className="text-lg font-bold text-slate-800 tracking-tight">Evolução de Receita</h2>
          <p className="text-xs text-slate-500">Volume financeiro gerado (agrupado por mês)</p>
        </div>
      </div>

      <div className="flex-1 w-full min-h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={dadosProcessados} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="corReceita" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.4}/>
                <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
            <XAxis 
              dataKey="mes" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#64748b', fontSize: 12 }} 
              dy={10} 
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#64748b', fontSize: 12 }} 
              tickFormatter={(value) => `R$${value >= 1000 ? (value/1000).toFixed(1) + 'k' : value}`} 
            />
            <Tooltip 
              contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              formatter={(value) => [`R$ ${value.toFixed(2).replace('.', ',')}`, 'Receita']}
              labelStyle={{ color: '#0f172a', fontWeight: 'bold', marginBottom: '4px' }}
            />
            <Area 
              type="monotone" 
              dataKey="receita" 
              stroke="#10b981" 
              strokeWidth={3} 
              fillOpacity={1} 
              fill="url(#corReceita)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}