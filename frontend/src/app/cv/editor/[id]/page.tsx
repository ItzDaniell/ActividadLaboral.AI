"use client";
import { notFound } from "next/navigation";
import React, { useState } from "react";
import "../../../globals.css";
import Button from "@/components/Button";
import { Download, Languages, LayoutPanelLeft } from "lucide-react";
import Modal from "@/components/Modal";

interface Props {
  params: {
    id: string;
  };
}

export default function CvEditor({ params }: Props) {
  const { id } = params;
  const [activeModal, setActiveModal] = useState<
    null | "layout" | "language" | "download"
  >(null);
  const [activeLayout, setActiveLayout] = useState("harvard");
  const [selectedLayout, setSelectedLayout] = useState(activeLayout);

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
      <aside className="w-1/3 bg-white p-6 border-r border-gray-300 overflow-y-auto">
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

      {activeLayout === "harvard" ? (
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
      ) : (
        <main className="flex-1 flex flex-col items-center justify-center bg-gray-300 h-screen">
          <div className="flex w-[700px] min-h-[80vh] bg-white shadow-lg rounded-lg overflow-hidden">
            {/* Sidebar */}
            <aside className="w-1/3 bg-[#353b47] text-white flex flex-col pt-8">
              {/* Contacto */}
              <div className="px-6 pb-6 border-b border-white/70">
                <h3 className="font-bold text-sm mb-2 tracking-wide">
                  CONTACTO
                </h3>
                <ul className="text-xs space-y-1">
                  <li>- {form.lugar || "Lima, Perú"}</li>
                  <li>- {form.celular || "999999999"}</li>
                  <li>- {form.correo || "pedro@ejemplo.com"}</li>
                  <li>- {form.linkedin || "linkedin.com"}</li>
                  <li>- {form.web || "miweb.com"}</li>
                </ul>
              </div>
              {/* Educación */}
              <div className="px-6 py-6 border-b border-white/70">
                <h3 className="font-bold text-sm mb-2 tracking-wide">
                  EDUCACIÓN
                </h3>
                <div className="text-xs">{form.educacion || ""}</div>
              </div>
              {/* Habilidades */}
              <div className="px-6 py-6 border-b border-white/70 flex-1">
                <h3 className="font-bold text-sm mb-2 tracking-wide">
                  HABILIDADES
                </h3>
                <div className="text-xs">{form.habilidades || ""}</div>
              </div>
            </aside>
            {/* Contenido principal */}
            <section className="flex-1 p-10">
              <h1 className="text-2xl font-bold mb-1">
                {form.nombres || "NOMBRES"}{" "}
                <span className="font-normal">
                  {form.apellidos || "APELLIDOS"}
                </span>
              </h1>
              <h2 className="text-sm font-semibold text-gray-700 mb-2">
                {form.profesion || "PROFESIÓN/CARGO"}
              </h2>
              <div className="text-xs text-gray-800">{form.perfil || ""}</div>
            </section>
          </div>
        </main>
      )}

      {/* Vista previa del CV */}

      <aside className="w-1/12 p-4 bg-white flex flex-col gap-4 text-center">
        {/* Herramientas o funciones extra */}
        <div className="flex flex-col items-center gap-1">
          <Button
            customClass="bg-blue-100 py-4 px-4 rounded-full hover:bg-blue-200"
            onClick={() => {
              setSelectedLayout(activeLayout); // Resetea la selección al abrir el modal
              setActiveModal("layout");
            }}
          >
            <LayoutPanelLeft className="w-6 h-6 text-blue-600" />
          </Button>
          <p className="text-sm text-center">Diseño</p>
        </div>
        <div className="flex flex-col items-center gap-1">
          <Button customClass="bg-blue-100 py-4 px-4 rounded-full hover:bg-blue-200">
            <Languages className="w-6 h-6 text-blue-600" />
          </Button>
          <p className="text-sm text-center">Vista previa en Ing</p>
        </div>
        <div className="flex flex-col items-center gap-1">
          <Button
            customClass="bg-blue-100 py-4 px-4 rounded-full hover:bg-blue-200"
            onClick={() => {
              setActiveModal("download");
            }}
          >
            <Download className="w-6 h-6 text-blue-600" />
          </Button>
          <p className="text-sm text-center">Descargar</p>
        </div>
      </aside>

      {activeModal === "layout" && (
        <Modal
          isOpen={true}
          onClose={() => setActiveModal(null)}
          title="Selecciona el diseño"
        >
          <div className="flex w-full p-4 gap-4 justify-evenly">
            <button
              onClick={() => setSelectedLayout("harvard")}
              className={`w-auto flex flex-col text-sm cursor-pointer rounded-xl gap-2 pb-2 border-2 transition ${
                selectedLayout === "harvard"
                  ? "border-blue-500"
                  : "border-transparent"
              }`}
            >
              <img
                src="/harvard-layout.svg"
                alt="Harvard"
                className="rounded-xl"
              />
              Diseño Harvard
            </button>
            <button
              onClick={() => setSelectedLayout("sidebar")}
              className={`w-auto flex flex-col text-sm cursor-pointer rounded-xl gap-2 pb-2 border-2 transition ${
                selectedLayout === "sidebar"
                  ? "border-blue-500"
                  : "border-transparent"
              }`}
            >
              <img
                src="/left-bar-layout.svg"
                alt="Sidebar"
                className="rounded-xl"
              />
              Diseño Barra Lateral
            </button>
          </div>
          <div className="flex w-full justify-end gap-2">
            <Button
              onClick={() => setActiveModal(null)}
              customClass="mt-2 bg-red-500 rounded hover:bg-red-600 text-white font-semibold"
            >
              Cerrar
            </Button>
            <Button
              onClick={() => {
                setActiveLayout(selectedLayout);
                setActiveModal(null);
              }}
              customClass="mt-2 bg-blue-500 rounded hover:bg-blue-600 text-white font-semibold"
            >
              Usar
            </Button>
          </div>
        </Modal>
      )}

      {activeModal === "download" && (
        <Modal
          isOpen={true}
          onClose={() => setActiveModal(null)}
          title="Seleccione su descarga"
        >
          <div className="flex w-full p-4 gap-4 justify-evenly">
            <Button
              customClass="mt-2 bg-blue-500 rounded hover:bg-blue-600 text-white font-semibold"
              onClick={() => {
                setActiveModal(null);
              }}
            >
              Descargar en Español
            </Button>
            <Button
              customClass="mt-2 bg-blue-500 rounded hover:bg-blue-600 text-white font-semibold"
              onClick={() => {
                setActiveModal(null);
              }}
            >
              Descargar en Inglés
            </Button>
          </div>
        </Modal>
      )}
    </div>
  );
}
