import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: { flexDirection: 'row', backgroundColor: '#fff' },
  sidebar: { width: '30%', backgroundColor: '#353b47', color: 'white', padding: 20 },
  content: { width: '70%', padding: 20 },
  section: { marginBottom: 10 },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 5 },
  subtitle: { fontSize: 12, color: '#666', marginBottom: 10 },
  text: { fontSize: 10, color: '#333', marginBottom: 2 },
});

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

export const CVPdf = ({ form }: { form: FormFields }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.sidebar}>
        <Text style={styles.title}>CONTACTO</Text>
        <Text style={styles.text}>- {form.lugar || ""}</Text>
        <Text style={styles.text}>- {form.celular || ""}</Text>
        <Text style={styles.text}>- {form.correo || ""}</Text>
        <Text style={styles.text}>- {form.linkedin || ""}</Text>
        <Text style={styles.text}>- {form.web || ""}</Text>
        <Text style={[styles.title, { marginTop: 20 }]}>EDUCACIÓN</Text>
        <Text style={styles.text}>{form.educacion || ""}</Text>
        <Text style={[styles.title, { marginTop: 20 }]}>HABILIDADES</Text>
        <Text style={styles.text}>{form.habilidades || ""}</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>{form.nombres || ""} {form.apellidos || ""}</Text>
        <Text style={styles.subtitle}>{form.profesion || ""}</Text>
        <Text style={styles.text}>{form.perfil || ""}</Text>
      </View>
    </Page>
  </Document>
);