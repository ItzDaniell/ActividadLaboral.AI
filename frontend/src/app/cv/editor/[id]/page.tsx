"use client";
import { notFound } from "next/navigation";
import React, { useState } from "react";
import "../../../globals.css";
import Button from "@/components/Button";
import { Download, Languages, LayoutPanelLeft } from "lucide-react";
import Modal from "@/components/Modal";
import { useParams } from "next/navigation";

export default function CvEditor() {
  const params = useParams();
  const id = params?.id as string;
  const [activeModal, setActiveModal] = useState<
    null | "layout" | "language" | "download"
  >(null);
  const [lang, setLang] = useState<"es" | "en">("es");
  const [activeLayout, setActiveLayout] = useState("harvard");
  const [selectedLayout, setSelectedLayout] = useState(activeLayout);
  const [translatedFields, setTranslatedFields] = useState<FormFields | null>(null);

  if (!id || isNaN(Number(id))) {
    notFound();
  }

  // Parser para extraer los campos del string traducido
  const parseCVContent = (content: string): FormFields => {
    const lines = content.split(/\r?\n/);
    const fields: any = {};
    lines.forEach(line => {
      const [key, ...rest] = line.split(":");
      if (!key || rest.length === 0) return;
      const value = rest.join(":").trim();
      switch (key.trim().toLowerCase()) {
        case "nombres":
        case "names":
          fields.nombres = value; break;
        case "apellidos":
        case "surname":
          fields.apellidos = value; break;
        case "profesión":
        case "profesion":
        case "profession":
          fields.profesion = value; break;
        case "perfil":
        case "profile":
          fields.perfil = value; break;
        case "correo":
        case "mail":
          fields.correo = value; break;
        case "linkedin":
          fields.linkedin = value; break;
        case "web":
          fields.web = value; break;
        case "lugar":
        case "place":
          fields.lugar = value; break;
        case "celular":
        case "cellular":
          fields.celular = value; break;
        case "educación":
        case "educacion":
        case "education":
          fields.educacion = value; break;
        case "habilidades":
        case "skills":
          fields.habilidades = value; break;
        default: break;
      }
    });
    return {
      nombres: fields.nombres || "",
      apellidos: fields.apellidos || "",
      profesion: fields.profesion || "",
      perfil: fields.perfil || "",
      correo: fields.correo || "",
      linkedin: fields.linkedin || "",
      web: fields.web || "",
      lugar: fields.lugar || "",
      celular: fields.celular || "",
      educacion: fields.educacion || "",
      habilidades: fields.habilidades || "",
    };
  };

  const handleToggle = async () => {
    if (lang === "es") {
      try {
        const content = buildCVContent(form);
        const translated = await translateCV(content, "en");
        console.log('CV traducido:', translated);
        const parsed = parseCVContent(translated);
        console.log('CV parseado:', parsed);
        setTranslatedFields(parsed);
        setLang("en");
      } catch (e) {
        alert("No se pudo traducir. Intenta de nuevo.");
      }
    } else {
      setLang("es");
      setTranslatedFields(null);
    }
  };
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

  // Función para descargar el CV como archivo de texto (puedes cambiar a PDF luego)
  const downloadCV = (content: string, filename: string) => {
    const blob = new Blob([content], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
    const response = await fetch("http://localhost:3001/api/translate-cv", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text, to }),
    });
    const data = await response.json();
    return data.translation;
  };

  const translations = {
    es: {
      perfil: "PERFIL",
      educacion: "EDUCACIÓN",
      habilidades: "HABILIDADES",
      contacto: "CONTACTO"
    },
    en: {
      perfil: "PROFILE",
      educacion: "EDUCATION",
      habilidades: "SKILLS",
      contacto:"CONTACT"
    },
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
            value={lang === "en" ? translatedFields?.correo || form.correo : form.correo}
            onChange={handleChange}
          />
          <input
            className="w-full border rounded px-3 py-2"
            placeholder="LinkedIn"
            name="linkedin"
            value={lang === "en" ? translatedFields?.linkedin || form.linkedin : form.linkedin}
            onChange={handleChange}
          />
          <input
            className="w-full border rounded px-3 py-2"
            placeholder="Página Web"
            name="web"
            value={lang === "en" ? translatedFields?.web || form.web : form.web}
            onChange={handleChange}
          />
          <input
            className="w-full border rounded px-3 py-2"
            placeholder="Lugar"
            name="lugar"
            value={lang === "en" ? translatedFields?.lugar || form.lugar : form.lugar}
            onChange={handleChange}
          />
          <input
            className="w-full border rounded px-3 py-2"
            placeholder="Celular"
            name="celular"
            value={lang === "en" ? translatedFields?.celular || form.celular : form.celular}
            onChange={handleChange}
          />
        </div>
        <h2 className="text-lg font-semibold mt-8 mb-4">Educación</h2>
        <textarea
          className="w-full border rounded px-3 py-2"
          placeholder="Ej: Universidad, carrera, años..."
          name="educacion"
          value={lang === "en" ? translatedFields?.educacion || form.educacion : form.educacion}
          onChange={handleChange}
        />
        <h2 className="text-lg font-semibold mt-8 mb-4">Habilidades</h2>
        <textarea
          className="w-full border rounded px-3 py-2"
          placeholder="Ej: React, Figma, Comunicación..."
          name="habilidades"
          value={lang === "en" ? translatedFields?.habilidades || form.habilidades : form.habilidades}
          onChange={handleChange}
        />
      </aside>

      {activeLayout === "harvard" ? (
        <main className="flex-1 flex flex-col items-center justify-center bg-gray-300 h-screen">
          <div className="bg-white shadow-lg rounded-lg p-10 w-[700px] min-h-[80vh]">
            <h1 className="text-xl font-bold text-center mb-1">
              {lang === "en" ? translatedFields?.nombres || "Nombres" : form.nombres || "Nombres"} {lang === "en" ? translatedFields?.apellidos || "Apellidos" : form.apellidos || "Apellidos"}
            </h1>
            <h2 className="text-sm font-semibold text-center text-gray-500 mb-6">
              {lang === "en" ? translatedFields?.profesion || "PROFESIÓN" : form.profesion || "PROFESIÓN"}
            </h2>
            <div className="flex justify-between items-start mb-6">
              <div className="flex flex-col gap-1">
                <p className="text-sm text-gray-600 underline underline-offset-1 text-xs">
                  {lang === "en" ? translatedFields?.correo || "correo@personal.com" : form.correo || "correo@personal.com"}
                </p>
                <p className="text-sm text-gray-600 text-xs">
                  {lang === "en" ? translatedFields?.linkedin || "linkedin.com" : form.linkedin || "linkedin.com"}
                </p>
              </div>
              <div className="text-right flex flex-col gap-1">
                <p className="text-sm text-gray-600 underline underline-offset-1 text-xs">
                  {lang === "en" ? translatedFields?.web || "miweb.com" : form.web || "miweb.com"}
                </p>
                <p className="text-sm text-gray-600 text-xs">
                  {lang === "en" ? translatedFields?.celular || "+51 999 999 999" : form.celular || "+51 999 999 999"}
                </p>
                <p className="text-sm text-gray-600 text-xs">
                  {lang === "en" ? translatedFields?.lugar || "Lima, Perú" : form.lugar || "Lima, Perú"}
                </p>
              </div>
            </div>
            <section className="mb-4">
              <h3 className="font-semibold border-b pb-2">{translations[lang].perfil}</h3>
              <p className="mt-2 text-gray-700 px-4 text-xs">
                {lang === "en" ? translatedFields?.perfil || "Profile..." : form.perfil || "Lorem ipsum dolor sit amet consectetur adipiscing elit convallis vivamus, turpis mus vel cubilia tincidunt sociis vulputate ullamcorper sodales class, et iaculis tristique leo morbi purus massa lacus. Dapibus tortor metus inceptos cum sociis fringilla purus, at aliquam molestie proin feugiat lectus consequat nec, pharetra hendrerit dictum condimentum ullamcorper nunc. Sagittis ridiculus sodales vestibulum posuere sem facilisis sollicitudin penatibus diam, netus eget parturient platea rutrum eu molestie fusce vulputate, ultrices mattis turpis blandit facilisi interdum arcu fringilla."}
              </p>
            </section>
            <section className="mb-4">
              <h3 className="font-semibold border-b pb-2">{translations[lang].educacion}</h3>
              <p className="mt-2 text-gray-700 px-4 text-xs">
                {lang === "en" ? translatedFields?.educacion || "Education..." : form.educacion || "Educación..."}
              </p>
            </section>
            <section>
              <h3 className="font-semibold border-b pb-2">{translations[lang].habilidades}</h3>
              <p className="mt-2 text-gray-700 px-4 text-xs">
                {lang === "en" ? translatedFields?.habilidades || "Skills..." : form.habilidades || "Habilidades..."}
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
                  {translations[lang].contacto}
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
                  {translations[lang].educacion}
                </h3>
                <div className="text-xs">{lang === "en" ? translatedFields?.educacion || "" : form.educacion || ""}</div>
              </div>
              {/* Habilidades */}
              <div className="px-6 py-6 border-b border-white/70 flex-1">
                <h3 className="font-bold text-sm mb-2 tracking-wide">
                {translations[lang].habilidades}
                </h3>
                <div className="text-xs">{lang === "en" ? translatedFields?.habilidades || "" : form.habilidades || ""}</div>
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
              <div className="text-xs text-gray-800">{lang === "en" ? translatedFields?.perfil || "" : form.perfil || ""}</div>
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
          <Button
            customClass="bg-blue-100 py-4 px-4 rounded-full hover:bg-blue-200"
            onClick={handleToggle}
          >
            <Languages className="w-6 h-6 text-blue-600" />
          </Button>
          {lang === "es" ? (
            <p className="text-sm text-center">Vista previa en Ingl</p>
          ) : (
            <p className="text-sm text-center">Vista previa en Esp</p>
          )}
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
                const content = buildCVContent(form);
                downloadCV(content, "cv_espanol.txt");
              }}
            >
              Descargar en Español
            </Button>
            <Button
              customClass="mt-2 bg-blue-500 rounded hover:bg-blue-600 text-white font-semibold"
              onClick={async () => {
                setActiveModal(null);
                const content = buildCVContent(form);
                const translated = await translateCV(content, "en");
                if (!translated) {
                  alert("No se pudo traducir el CV. Intenta de nuevo.");
                  return;
                }
                downloadCV(translated, "cv_english.txt");
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
