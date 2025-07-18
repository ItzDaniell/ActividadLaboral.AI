import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Curriculum, CurriculumDocument } from 'src/schema/cv.schema';


@Injectable()
export class CurriculumService {
  constructor(
    @InjectModel(Curriculum.name) private curriculumModel: Model<CurriculumDocument>,
  ) {}

  async crearCurriculumVacio(): Promise<Curriculum> {
    const nuevo = new this.curriculumModel({});
    return nuevo.save();
  }
}