import './globals.css';
import Navbar from '../components/Navbar';

export const metadata = {
  title: 'Portal B2B | Dário Faustino',
  description: 'Portfólio, CRM e Gerador de Propostas Comerciais',
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body className="bg-gray-100 text-gray-900 antialiased min-h-screen">
        <Navbar />
        {children}
      </body>
    </html>
  );
}