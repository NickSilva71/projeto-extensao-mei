import './globals.css';
import Navbar from '../components/Navbar'; // Importação do componente

export const metadata = {
  title: 'Portal B2B | Dário Faustino',
  description: 'Portfólio, CRM e Gerador de Propostas Comerciais',
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body className="bg-gray-50 text-gray-900 antialiased">
        <Navbar />
        {/* Conteúdo dinâmico de cada página */}
        {children}
      </body>
    </html>
  );
}