import { Controller, Get } from '@nestjs/common';
import { VentesService } from './ventes.service';

@Controller('ventes')
export class VentesController {
  constructor(private readonly ventesService: VentesService) {}

  @Get()
  findAll() {
    return this.ventesService.findAll();
  }
}