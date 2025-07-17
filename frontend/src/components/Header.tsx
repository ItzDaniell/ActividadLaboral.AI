"use client";

import { usePathname } from "next/navigation";
import Button from "./Button";
import Link from "next/link";
import { SquarePen } from "lucide-react"

const Header = () => {
  const pathname = usePathname();

  const isEditor = pathname.includes("/cv/editor");

  return (
    <header className="w-full flex items-center justify-between px-6 py-4 bg-white shadow border-b border-gray-300" >
      {isEditor ? (
        <>
          {/* Logo y título */}
          <div className="flex items-center gap-2">
            <img src="/file.svg" alt="Logo" className="h-8 w-8" />
            <Link href={"/cv"} className="font-bold text-blue-600 text-lg">
              Laboral<span className="text-black">.ai</span>
            </Link>
          </div>
          {/* Nombre del archivo */}
          <div className="text-gray-700 text-base">
            <Button customClass="w-auto cursor-pointer rounded-full bg-gray-200 flex gap-3 items-center">
                Nombre del Documento
                <SquarePen  className="w-5 h-5 text-blue-500" />
            </Button>
          </div>
          {/* Boton de guardado */}
          <div className="flex items-center gap-3">
            <Button customClass="w-auto cursor-pointer rounded-lg bg-blue-600 text-white">
                Guardar
            </Button>
          </div>
        </>
      ) : (
        <>
          {/* Logo y título */}
          <div className="flex items-center gap-2">
            <img src="/file.svg" alt="Logo" className="h-8 w-8" />
            <span className="font-bold text-blue-600 text-lg">
              Laboral<span className="text-black">.ai</span>
            </span>
          </div>
          {/* Texto central */}
          <div className="text-gray-700 font-medium text-base">
            Curriculum Vitae
          </div>
          {/* Usuario y salir */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="bg-blue-500 text-white rounded-full w-10 h-10 flex items-center justify-center font-semibold">
                Jua
              </div>
              <span className="text-gray-800">Juan Daniel</span>
            </div>
            <button className="text-blue-600 hover:underline text-sm">
              Salir
            </button>
          </div>
        </>
      )}
    </header>
  );
};

export default Header;
