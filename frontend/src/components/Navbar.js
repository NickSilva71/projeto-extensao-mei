'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();

  const navLinks = [
    { href: '/', label: 'Dashboard' },
    { href: '/crm', label: 'CRM Leads' },
    { href: '/propostas', label: 'Propostas' },
    { href: '/campanhas', label: 'Campanhas' },
  ];

  return (
    <header className="bg-slate-900 text-white sticky top-0 z-40 shadow-md">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between gap-4">
        
        {/* LOGO */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center font-black text-xl shadow-lg shadow-indigo-500/30">
            B
          </div>
          <span className="font-bold text-lg tracking-tight hidden sm:block text-slate-100">
            B2B<span className="text-indigo-400">Flow</span>
          </span>
        </div>

        {/* MENU DESLIZÁVEL NO MOBILE */}
        <nav className="flex gap-1 bg-slate-800/60 p-1 rounded-xl border border-slate-700/50 overflow-x-auto max-w-full no-scrollbar">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-1.5 text-xs md:text-sm font-medium rounded-lg whitespace-nowrap transition-all duration-200 ${
                  isActive
                    ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-md shadow-indigo-500/20'
                    : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}