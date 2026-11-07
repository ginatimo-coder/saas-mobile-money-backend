import { Controller, Get } from '@nestjs/common';
import { FournisseursService } from './fournisseurs.service';

@Controller('fournisseurs')
export class FournisseursController {
  constructor(private readonly fournisseursService: FournisseursService) {}

  @Get()
  findAll() {
    return this.fournisseursService.findAll();
  }
}