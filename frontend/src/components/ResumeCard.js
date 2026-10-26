import Link from 'next/link';

export default function ResumeCard({ titulo, linkHref, linkTexto, corBorda, children }) {
  return (
    <div className={`bg-white p-6 rounded-lg shadow border border-t-4 ${corBorda}`}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-700">{titulo}</h2>
        <Link href={linkHref} className="text-sm text-blue-600 hover:underline">
          {linkTexto}
        </Link>
      </div>
      <div className="space-y-4">
        {children}
      </div>
    </div>
  );
}