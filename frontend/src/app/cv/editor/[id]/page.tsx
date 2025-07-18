"use client";
import { notFound } from "next/navigation";
import React, { useState } from "react";
import "../../../globals.css";
import Button from "@/components/Button";
import { Download, Languages, LayoutPanelLeft } from "lucide-react";
import Modal from "@/components/Modal";
import { useParams } from "next/navigation";
import { generatePDF, createHarvardTemplate, createSidebarTemplate } from '@/utils/pdfGenerator';

export default function CvEditor() {
  const params = useParams();
  const id = params?.id as string;
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

  // Función para descargar el CV capturando el HTML real de la interfaz
  const downloadCVAsPDF = async (form: FormFields, language: 'es' | 'en') => {
    // Crear un elemento temporal con el HTML real de tu interfaz
    const tempDiv = document.createElement('div');
    tempDiv.style.position = 'absolute';
    tempDiv.style.left = '-9999px';
    tempDiv.style.width = '800px';
    tempDiv.style.backgroundColor = '#f3f4f6'; // bg-gray-100
    tempDiv.style.padding = '20px';
    
    // Clonar el HTML real del CV que se está mostrando
    const cvElement = document.querySelector('main');
    if (cvElement) {
      tempDiv.innerHTML = cvElement.outerHTML;
    }
    
    document.body.appendChild(tempDiv);
    
    try {
      await generatePDF(tempDiv.outerHTML, `cv_${language}.pdf`);
    } finally {
      document.body.removeChild(tempDiv);
    }
  };

  // Definir el tipo de los campos del formulario
  type FormFields = {
    nombres: string;
    apellidos: string;
    profesion: string;
    perfil: string;
    correo: string;
    linkedin: string;
    web: string;
    lugar: string;
    celular: string;
    educacion: string;
    habilidades: string;
  };

  // Función para armar el contenido del CV evitando undefined
  const buildCVContent = (form: FormFields) =>
    `Nombres: ${form.nombres || ""}
Apellidos: ${form.apellidos || ""}
Profesión: ${form.profesion || ""}
Perfil: ${form.perfil || ""}
Correo: ${form.correo || ""}
LinkedIn: ${form.linkedin || ""}
Web: ${form.web || ""}
Lugar: ${form.lugar || ""}
Celular: ${form.celular || ""}
Educación: ${form.educacion || ""}
Habilidades: ${form.habilidades || ""}`;

  // Función para traducir el CV usando el backend
  const translateCV = async (text: string, to: string) => {
    const response = await fetch('http://localhost:3001/api/translate-cv', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, to }),
    });
    const data = await response.json();
    return data.translation;
  };

  // Función para crear el HTML del CV basado en el diseño actual
  const createCVHTML = (form: FormFields) => {
    if (activeLayout === "harvard") {
      return `
        <div style="font-family: Arial, sans-serif; max-width: 700px; margin: 0 auto; background-color: white; padding: 40px; border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          <h1 style="text-align: center; font-size: 24px; margin-bottom: 5px; font-weight: bold; color: #333;">
            ${form.nombres || "Nombres"} ${form.apellidos || "Apellidos"}
          </h1>
          <h2 style="text-align: center; font-size: 14px; color: #666; margin-bottom: 24px; font-weight: 600;">
            ${form.profesion || "PROFESIÓN"}
          </h2>
          
          <div style="display: flex; justify-content: space-between; margin-bottom: 24px;">
            <div>
              <p style="font-size: 12px; color: #666; margin: 2px 0; text-decoration: underline;">${form.correo || "correo@personal.com"}</p>
              <p style="font-size: 12px; color: #666; margin: 2px 0;">${form.linkedin || "linkedin.com"}</p>
            </div>
            <div style="text-align: right;">
              <p style="font-size: 12px; color: #666; margin: 2px 0; text-decoration: underline;">${form.web || "miweb.com"}</p>
              <p style="font-size: 12px; color: #666; margin: 2px 0;">${form.celular || "+51 999 999 999"}</p>
              <p style="font-size: 12px; color: #666; margin: 2px 0;">${form.lugar || "Lima, Perú"}</p>
            </div>
          </div>
          
          <section style="margin-bottom: 16px;">
            <h3 style="font-weight: bold; border-bottom: 1px solid #000; padding-bottom: 8px; color: #333;">PERFIL</h3>
            <p style="margin-top: 8px; color: #333; padding-left: 16px; font-size: 12px; line-height: 1.4;">${form.perfil || "Perfil..."}</p>
          </section>
          
          <section style="margin-bottom: 16px;">
            <h3 style="font-weight: bold; border-bottom: 1px solid #000; padding-bottom: 8px; color: #333;">EDUCACIÓN</h3>
            <p style="margin-top: 8px; color: #333; padding-left: 16px; font-size: 12px; line-height: 1.4;">${form.educacion || "Educación..."}</p>
          </section>
          
          <section>
            <h3 style="font-weight: bold; border-bottom: 1px solid #000; padding-bottom: 8px; color: #333;">HABILIDADES</h3>
            <p style="margin-top: 8px; color: #333; padding-left: 16px; font-size: 12px; line-height: 1.4;">${form.habilidades || "Habilidades..."}</p>
          </section>
        </div>
      `;
    } else {
      return `
        <div style="font-family: Arial, sans-serif; max-width: 700px; margin: 0 auto; background-color: white; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); display: flex;">
          <div style="width: 30%; background-color: #353b47; color: white; padding: 32px 24px;">
            <div style="margin-bottom: 20px; border-bottom: 1px solid rgba(255,255,255,0.3); padding-bottom: 15px;">
              <h3 style="font-weight: bold; font-size: 14px; margin-bottom: 8px; letter-spacing: 1px;">CONTACTO</h3>
              <ul style="font-size: 12px; list-style: none; padding: 0; margin: 0;">
                <li style="margin-bottom: 4px;">- ${form.lugar || "Lima, Perú"}</li>
                <li style="margin-bottom: 4px;">- ${form.celular || "999999999"}</li>
                <li style="margin-bottom: 4px;">- ${form.correo || "pedro@ejemplo.com"}</li>
                <li style="margin-bottom: 4px;">- ${form.linkedin || "linkedin.com"}</li>
                <li style="margin-bottom: 4px;">- ${form.web || "miweb.com"}</li>
              </ul>
            </div>
            
            <div style="margin-bottom: 20px; border-bottom: 1px solid rgba(255,255,255,0.3); padding-bottom: 15px;">
              <h3 style="font-weight: bold; font-size: 14px; margin-bottom: 8px; letter-spacing: 1px;">EDUCACIÓN</h3>
              <p style="font-size: 12px; margin: 0;">${form.educacion || ""}</p>
            </div>
            
            <div>
              <h3 style="font-weight: bold; font-size: 14px; margin-bottom: 8px; letter-spacing: 1px;">HABILIDADES</h3>
              <p style="font-size: 12px; margin: 0;">${form.habilidades || ""}</p>
            </div>
          </div>
          
          <div style="width: 70%; padding: 40px;">
            <h1 style="font-size: 28px; font-weight: bold; margin-bottom: 5px; color: #333;">
              ${form.nombres || "NOMBRES"} <span style="font-weight: normal;">${form.apellidos || "APELLIDOS"}</span>
            </h1>
            <h2 style="font-size: 14px; color: #666; margin-bottom: 20px; font-weight: 600;">${form.profesion || "PROFESIÓN/CARGO"}</h2>
            <p style="font-size: 12px; color: #333; line-height: 1.5; margin: 0;">${form.perfil || ""}</p>
          </div>
        </div>
      `;
    }
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
              onClick={async () => {
                setActiveModal(null);
                const html = createCVHTML(form);
                await generatePDF(html, 'cv_espanol.pdf');
              }}
            >
              Descargar en Español
            </Button>
            <Button
              customClass="mt-2 bg-blue-500 rounded hover:bg-blue-600 text-white font-semibold"
              onClick={async () => {
                setActiveModal(null);
                const html = createCVHTML(form);
                const translated = await translateCV(html, 'en');
                if (!translated) {
                  alert("No se pudo traducir el CV. Intenta de nuevo.");
                  return;
                }
                await generatePDF(translated, 'cv_english.pdf');
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
