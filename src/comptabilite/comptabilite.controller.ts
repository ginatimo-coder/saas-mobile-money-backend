import { Controller, Get } from '@nestjs/common';
import { ComptabiliteService } from './comptabilite.service';

@Controller('comptabilite')
export class ComptabiliteController {
  constructor(private readonly comptabiliteService: ComptabiliteService) {}

  @Get()
  async findAll() {
    return await this.comptabiliteService.findAllEntries();
  }
}