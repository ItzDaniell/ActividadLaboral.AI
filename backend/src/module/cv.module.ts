import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CurriculumController } from 'src/controller/cv.controller';
import { Curriculum, CurriculumSchema } from 'src/schema/cv.schema';
import { CurriculumService } from 'src/service/cv.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: Curriculum.name, schema: CurriculumSchema }])],
  controllers: [CurriculumController],
  providers: [CurriculumService],
})
export class CurriculumModule {}