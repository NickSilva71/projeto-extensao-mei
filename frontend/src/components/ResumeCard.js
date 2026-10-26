import Link from 'next/link';

export default function ResumeCard({ titulo, linkHref, linkTexto, corGradiente, icone, children }) {
  return (
    <div className="group relative bg-white/90 backdrop-blur-md rounded-2xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-slate-200/80 overflow-hidden flex flex-col justify-between">
      {/* Barra superior de acento com gradiente */}
      <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${corGradiente}`} />

      <div>
        <div className="flex justify-between items-center mb-5">
          <div className="flex items-center gap-2.5">
            <span className="text-xl p-2 rounded-xl bg-slate-100/80">{icone}</span>
            <h2 className="text-lg font-bold text-slate-800 tracking-tight">{titulo}</h2>
          </div>
          <Link 
            href={linkHref} 
            className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 bg-indigo-50 hover:bg-indigo-100/80 px-3 py-1.5 rounded-full transition-colors flex items-center gap-1"
          >
            {linkTexto} →
          </Link>
        </div>

        <div className="space-y-3">
          {children}
        </div>
      </div>
    </div>
  );
}