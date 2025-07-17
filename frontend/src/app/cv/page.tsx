import { CloudUpload, Edit2, FileText, Plus } from 'lucide-react';
import Link from 'next/link';
import "../globals.css";

export default function Dashboard() {
  const cvs = [
    {
      id: 1,
      name: '6877247649fccafa6905611a...',
      date: 'hace alrededor de 21 horas',
      main: true,
    },
    {
      id: 2,
      name: 'Laboral_Juan_Rodriguez_Or...',
      date: 'hace alrededor de 22 horas',
      main: false,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-8 flex flex-col">
      <div className="max-w-6xl w-full mx-auto flex flex-col md:flex-row gap-8">
        {/* Lista de CVs */}
        <div className="flex-1 bg-white rounded-xl shadow p-6 min-w-[320px]">
          <h2 className="font-semibold text-lg mb-1 text-black">Lista de CVs</h2>
          <p className="text-gray-500 text-sm mb-6">En esta sección podrás subir tu CV o crear uno desde cero.</p>
          <div className="space-y-4">
            {cvs.map((cv) => (
            <Link href={`/cv/editor/${cv.id}`} key={cv.id}>
              <div className="flex items-center gap-2 text-sm justify-between hover:bg-gray-100 p-2 rounded-md">
                <div className="flex items-center gap-2">
                    <FileText className="text-gray-400 w-5 h-5" />
                    <div className="flex flex-col">
                        <span className="truncate max-w-[160px] font-medium text-gray-800">{cv.name}</span>
                        <span className="text-gray-400 text-xs text-left">{cv.date}</span>
                    </div>
                </div>
                {cv.main && (
                  <span className="bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded-full ml-1">Principal</span>
                )}
                <Edit2 className="w-4 h-4 text-black" />
              </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Acciones */}
        <div className="flex-1 flex flex-col gap-6">
          <h2 className="font-semibold text-lg mb-2 text-black">Acciones</h2>
          <div className="flex flex-col sm:flex-row gap-6">
            {/* Card: Sube tu CV */}
            <div className="flex-1 bg-blue-500 rounded-xl shadow-lg p-6 flex flex-col justify-between min-w-[320px] text-white relative overflow-hidden">
              <div>
                <h3 className="font-bold text-lg mb-2">Sube tu CV</h3>
                <p className="mb-8">Analizaremos tu CV y recopilaremos tu información para ahorrarte muchos minutos.</p>
              </div>
              <div className="flex items-center justify-between bg-blue-700/30 rounded-lg px-4 py-2 mt-auto">
                <span className="text-xs">Formatos permitidos: PDF</span>
                <button className="bg-white text-blue-600 rounded-full p-2 hover:bg-blue-100 transition">
                  <CloudUpload className="w-5 h-5" />
                </button>
              </div>
            </div>
            {/* Card: Crea tu CV desde cero */}
            <div className="flex-1 bg-purple-500 rounded-xl shadow-lg p-6 flex flex-col justify-between min-w-[320px] text-white relative overflow-hidden">
              <div>
                <h3 className="font-bold text-lg mb-2">Crea tu CV desde cero</h3>
                <p className="mb-8">Gracias a nuestro editor inteligente podrás crear un CV asombroso en cuestión de minutos.</p>
              </div>
              <div className="flex items-center justify-between bg-purple-600/30 rounded-lg px-4 py-2 mt-auto">
                <span className="text-xs">Empieza ahora!</span>
                <button className="bg-white text-purple-600 rounded-full p-2 hover:bg-purple-100 transition">
                  <Plus className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
