"use client";
import { notFound } from "next/navigation";
import React, { useState } from "react";
import "../../../globals.css";
import Button from "@/components/Button";
import { Download, Languages, LayoutPanelLeft } from "lucide-react";

interface Props {
  params: {
    id: string;
  };
}

export default function CvEditor({ params }: Props) {
  const { id } = params;

  if (!id || isNaN(Number(id))) {
    notFound();
  }

  // Estado para los campos del formulario
  const [form, setForm] = useState({
    nombres: "",
    apellidos: "",
    profesion: "",
    perfil: "",
    correo: "",
    linkedin: "",
    web: "",
    lugar: "",
    celular: "",
    educacion: "",
    habilidades: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar de edición */}
      <aside className="w-1/3 bg-white p-6 border-r overflow-y-auto">
        <h2 className="text-lg font-semibold mb-4">
          Completa tus datos personales
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Nombres</label>
            <input
              className="w-full border rounded px-3 py-2 mt-1"
              placeholder="Escribe tus nombres"
              name="nombres"
              value={form.nombres}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Apellidos</label>
            <input
              className="w-full border rounded px-3 py-2 mt-1"
              placeholder="Escribe tus apellidos"
              name="apellidos"
              value={form.apellidos}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Profesión</label>
            <input
              className="w-full border rounded px-3 py-2 mt-1"
              placeholder="Diseñador UX/UI"
              name="profesion"
              value={form.profesion}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Acerca de mí</label>
            <textarea
              className="w-full border rounded px-3 py-2 mt-1"
              placeholder="Cuéntanos sobre ti..."
              name="perfil"
              value={form.perfil}
              onChange={handleChange}
            />
          </div>
        </div>
        <h2 className="text-lg font-semibold mt-8 mb-4">
          Información de contacto
        </h2>
        <div className="space-y-4">
          <input
            className="w-full border rounded px-3 py-2"
            placeholder="Correo electrónico"
            name="correo"
            value={form.correo}
            onChange={handleChange}
          />
          <input
            className="w-full border rounded px-3 py-2"
            placeholder="LinkedIn"
            name="linkedin"
            value={form.linkedin}
            onChange={handleChange}
          />
          <input
            className="w-full border rounded px-3 py-2"
            placeholder="Página Web"
            name="web"
            value={form.web}
            onChange={handleChange}
          />
          <input
            className="w-full border rounded px-3 py-2"
            placeholder="Lugar"
            name="lugar"
            value={form.lugar}
            onChange={handleChange}
          />
          <input
            className="w-full border rounded px-3 py-2"
            placeholder="Celular"
            name="celular"
            value={form.celular}
            onChange={handleChange}
          />
        </div>
        <h2 className="text-lg font-semibold mt-8 mb-4">Educación</h2>
        <textarea
          className="w-full border rounded px-3 py-2"
          placeholder="Ej: Universidad, carrera, años..."
          name="educacion"
          value={form.educacion}
          onChange={handleChange}
        />
        <h2 className="text-lg font-semibold mt-8 mb-4">Habilidades</h2>
        <textarea
          className="w-full border rounded px-3 py-2"
          placeholder="Ej: React, Figma, Comunicación..."
          name="habilidades"
          value={form.habilidades}
          onChange={handleChange}
        />
      </aside>

      {/* Vista previa del CV */}
      <main className="flex-1 flex flex-col items-center justify-center bg-gray-300 h-screen">
        <div className="bg-white shadow-lg rounded-lg p-10 w-[700px] min-h-[80vh]">
          <h1 className="text-xl font-bold text-center mb-1">
            {form.nombres || "Nombres"} {form.apellidos || "Apellidos"}
          </h1>
          <h2 className="text-sm font-semibold text-center text-gray-500 mb-6">
            {form.profesion || "PROFESIÓN"}
          </h2>
          <div className="flex justify-between items-start mb-6">
            <div className="flex flex-col gap-1">
              <p className="text-sm text-gray-600 underline underline-offset-1 text-xs">
                {form.correo || "correo@personal.com"}
              </p>
              <p className="text-sm text-gray-600 text-xs">
                {form.linkedin || "linkedin.com"}
              </p>
            </div>
            <div className="text-right flex flex-col gap-1">
              <p className="text-sm text-gray-600 underline underline-offset-1 text-xs">
                {form.web || "miweb.com"}
              </p>
              <p className="text-sm text-gray-600 text-xs">
                {form.celular || "+51 999 999 999"}
              </p>
              <p className="text-sm text-gray-600 text-xs">
                {form.lugar || "Lima, Perú"}
              </p>
            </div>
          </div>
          <section className="mb-4">
            <h3 className="font-semibold border-b pb-2">PERFIL</h3>
            <p className="mt-2 text-gray-700 px-4 text-xs">
              {form.perfil ||
                "Lorem ipsum dolor sit amet consectetur adipiscing elit convallis vivamus, turpis mus vel cubilia tincidunt sociis vulputate ullamcorper sodales class, et iaculis tristique leo morbi purus massa lacus. Dapibus tortor metus inceptos cum sociis fringilla purus, at aliquam molestie proin feugiat lectus consequat nec, pharetra hendrerit dictum condimentum ullamcorper nunc. Sagittis ridiculus sodales vestibulum posuere sem facilisis sollicitudin penatibus diam, netus eget parturient platea rutrum eu molestie fusce vulputate, ultrices mattis turpis blandit facilisi interdum arcu fringilla."}
            </p>
          </section>
          <section className="mb-4">
            <h3 className="font-semibold border-b pb-2">EDUCACIÓN</h3>
            <p className="mt-2 text-gray-700 px-4 text-xs">
              {form.educacion || "Educación..."}
            </p>
          </section>
          <section>
            <h3 className="font-semibold border-b pb-2">HABILIDADES</h3>
            <p className="mt-2 text-gray-700 px-4 text-xs">
              {form.habilidades || "Habilidades..."}
            </p>
          </section>
        </div>
      </main>

      <aside className="w-1/12 p-4 bg-white flex flex-col gap-4 text-center">
        {/* Herramientas o funciones extra */}
        <div className="flex flex-col items-center gap-1">
          <Button customClass="bg-blue-100 py-4 px-4 rounded-full hover:bg-blue-200">
            <LayoutPanelLeft className="w-6 h-6 text-blue-600" />
          </Button>
          <p className="text-sm text-center">Diseño</p>
        </div>
        <div className="flex flex-col items-center gap-1">
          <Button customClass="bg-blue-100 py-4 px-4 rounded-full hover:bg-blue-200">
            <Languages className="w-6 h-6 text-blue-600" />
          </Button>
          <p className="text-sm text-center">Idioma</p>
        </div>
        <div className="flex flex-col items-center gap-1">
          <Button customClass="bg-blue-100 py-4 px-4 rounded-full hover:bg-blue-200">
            <Download className="w-6 h-6 text-blue-600" />
          </Button>
          <p className="text-sm text-center">Descargar</p>
        </div>
      </aside>
    </div>
  );
}
