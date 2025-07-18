import { Controller, Post } from '@nestjs/common';
import { CurriculumService } from 'src/service/cv.service';


@Controller('api/curriculum')
export class CurriculumController {
  constructor(private readonly curriculumService: CurriculumService) {}

  @Post()
  async crearVacio() {
    const nuevo = await this.curriculumService.crearCurriculumVacio();
    return { id: nuevo._id };
  }
}