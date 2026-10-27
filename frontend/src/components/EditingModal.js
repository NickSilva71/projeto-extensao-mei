'use client';

export default function EditingModal({ isOpen, onClose, titulo, children }) {
  if (!isOpen) return null;

 return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4 transition-opacity">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-100 w-full max-w-lg p-5 md:p-6 relative animate-in fade-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-5 border-b pb-3">
          <h3 className="text-lg md:text-xl font-bold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
            {titulo}
          </h3>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 text-lg p-1.5 rounded-lg hover:bg-slate-100 transition"
          >
            ✕
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}