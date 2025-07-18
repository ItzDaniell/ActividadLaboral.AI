import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TraductorController } from './controller/traductor.controller'; 
import { CurriculumController } from './controller/cv.controller';

@Module({
  imports: [],
  controllers: [AppController, TraductorController, CurriculumController],
  providers: [AppService],
})
export class AppModule {}