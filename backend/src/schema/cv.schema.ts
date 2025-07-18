import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CurriculumDocument = Curriculum & Document;

@Schema({ timestamps: true })
export class Curriculum {
  @Prop()
  nombres: string;

  @Prop()
  apellidos: string;

  @Prop()
  profesion: string;

  @Prop()
  perfil: string;

  @Prop()
  correo: string;

  @Prop()
  linkedin: string;

  @Prop()
  web: string;

  @Prop()
  lugar: string;

  @Prop()
  celular: string;

  @Prop()
  educacion: string;

  @Prop()
  habilidades: string;
}

export const CurriculumSchema = SchemaFactory.createForClass(Curriculum);
