import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

// Definir el tipo de los campos del formulario
export type FormFields = {
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

export const generatePDF = async (content: string, filename: string) => {
  // Crear un elemento temporal con el contenido
  const element = document.createElement('div');
  element.innerHTML = content;
  element.style.position = 'absolute';
  element.style.left = '-9999px';
  document.body.appendChild(element);

  // Convertir a canvas
  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
    backgroundColor: '#ffffff'
  });

  // Generar PDF
  const imgData = canvas.toDataURL('image/png');
  const pdf = new jsPDF('p', 'mm', 'a4');
  const imgWidth = 210;
  const pageHeight = 295;
  const imgHeight = (canvas.height * imgWidth) / canvas.width;
  let heightLeft = imgHeight;

  let position = 0;

  pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
  heightLeft -= pageHeight;

  while (heightLeft >= 0) {
    position = heightLeft - imgHeight;
    pdf.addPage();
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;
  }

  // Descargar
  pdf.save(filename);
  
  // Limpiar
  document.body.removeChild(element);
};

export const createHarvardTemplate = (form: FormFields) => `
  <div style="font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px;">
    <h1 style="text-align: center; font-size: 24px; margin-bottom: 5px;">
      ${form.nombres || "Nombres"} ${form.apellidos || "Apellidos"}
    </h1>
    <h2 style="text-align: center; font-size: 14px; color: #666; margin-bottom: 20px;">
      ${form.profesion || "PROFESIÓN"}
    </h2>
    
    <div style="display: flex; justify-content: space-between; margin-bottom: 20px;">
      <div>
        <p style="font-size: 12px; color: #666; margin: 2px 0;">${form.correo || "correo@personal.com"}</p>
        <p style="font-size: 12px; color: #666; margin: 2px 0;">${form.linkedin || "linkedin.com"}</p>
      </div>
      <div style="text-align: right;">
        <p style="font-size: 12px; color: #666; margin: 2px 0;">${form.web || "miweb.com"}</p>
        <p style="font-size: 12px; color: #666; margin: 2px 0;">${form.celular || "+51 999 999 999"}</p>
        <p style="font-size: 12px; color: #666; margin: 2px 0;">${form.lugar || "Lima, Perú"}</p>
      </div>
    </div>
    
    <section style="margin-bottom: 15px;">
      <h3 style="font-weight: bold; border-bottom: 1px solid #000; padding-bottom: 5px;">PERFIL</h3>
      <p style="font-size: 12px; color: #333; padding: 10px;">${form.perfil || "Perfil..."}</p>
    </section>
    
    <section style="margin-bottom: 15px;">
      <h3 style="font-weight: bold; border-bottom: 1px solid #000; padding-bottom: 5px;">EDUCACIÓN</h3>
      <p style="font-size: 12px; color: #333; padding: 10px;">${form.educacion || "Educación..."}</p>
    </section>
    
    <section>
      <h3 style="font-weight: bold; border-bottom: 1px solid #000; padding-bottom: 5px;">HABILIDADES</h3>
      <p style="font-size: 12px; color: #333; padding: 10px;">${form.habilidades || "Habilidades..."}</p>
    </section>
  </div>
`;

export const createSidebarTemplate = (form: FormFields) => `
  <div style="font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; display: flex; background-color: white; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
    <!-- Sidebar izquierdo -->
    <div style="width: 30%; background-color: #353b47; color: white; padding: 20px;">
      <div style="margin-bottom: 20px; border-bottom: 1px solid rgba(255,255,255,0.3); padding-bottom: 15px;">
        <h3 style="font-weight: bold; font-size: 14px; margin-bottom: 10px; letter-spacing: 1px;">CONTACTO</h3>
        <ul style="font-size: 12px; list-style: none; padding: 0; margin: 0;">
          <li style="margin-bottom: 5px;">- ${form.lugar || "Lima, Perú"}</li>
          <li style="margin-bottom: 5px;">- ${form.celular || "999999999"}</li>
          <li style="margin-bottom: 5px;">- ${form.correo || "pedro@ejemplo.com"}</li>
          <li style="margin-bottom: 5px;">- ${form.linkedin || "linkedin.com"}</li>
          <li style="margin-bottom: 5px;">- ${form.web || "miweb.com"}</li>
        </ul>
      </div>
      
      <div style="margin-bottom: 20px; border-bottom: 1px solid rgba(255,255,255,0.3); padding-bottom: 15px;">
        <h3 style="font-weight: bold; font-size: 14px; margin-bottom: 10px; letter-spacing: 1px;">EDUCACIÓN</h3>
        <p style="font-size: 12px; margin: 0;">${form.educacion || ""}</p>
      </div>
      
      <div>
        <h3 style="font-weight: bold; font-size: 14px; margin-bottom: 10px; letter-spacing: 1px;">HABILIDADES</h3>
        <p style="font-size: 12px; margin: 0;">${form.habilidades || ""}</p>
      </div>
    </div>
    
    <!-- Contenido principal -->
    <div style="width: 70%; padding: 30px;">
      <h1 style="font-size: 28px; font-weight: bold; margin-bottom: 5px; color: #333;">
        ${form.nombres || "NOMBRES"} <span style="font-weight: normal;">${form.apellidos || "APELLIDOS"}</span>
      </h1>
      <h2 style="font-size: 14px; color: #666; margin-bottom: 20px; font-weight: 600;">${form.profesion || "PROFESIÓN/CARGO"}</h2>
      <p style="font-size: 12px; color: #333; line-height: 1.5; margin: 0;">${form.perfil || ""}</p>
    </div>
  </div>
`;