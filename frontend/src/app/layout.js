import './globals.css';
import Link from 'next/link';

export const metadata = {
  title: 'Portal B2B | Dário Faustino',
  description: 'Portfólio, CRM e Gerador de Propostas Comerciais',
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body className="bg-gray-50 text-gray-900 antialiased">
        {/* Barra de Navegação Global */}
        <nav className="bg-blue-700 text-white shadow-md">
          <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
            <div className="font-bold text-xl tracking-wide">
              <Link href="/">
                Portal <span className="font-light">B2B</span>
              </Link>
            </div>
            <div className="space-x-6 font-medium">
              <Link href="/" className="hover:text-blue-200 transition">Dashboard</Link>
              <Link href="/campanhas" className="hover:text-blue-200 transition">Campanhas</Link>
              <Link href="/crm" className="hover:text-blue-200 transition">CRM</Link>
              <Link href="/propostas" className="hover:text-blue-200 transition">Propostas</Link>
            </div>
          </div>
        </nav>

        {/* Conteúdo dinâmico de cada página */}
        {children}
      </body>
    </html>
  );
}