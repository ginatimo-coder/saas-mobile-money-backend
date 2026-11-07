import { Controller, Get } from '@nestjs/common';
import { ComptabiliteService } from './comptabilite.service';

@Controller('comptabilite')
export class ComptabiliteController {
  constructor(private readonly comptabiliteService: ComptabiliteService) {}

  @Get()
  getData() {
    return this.comptabiliteService.getData();
  }
}