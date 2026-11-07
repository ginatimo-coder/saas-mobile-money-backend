import { Controller, Get } from '@nestjs/common';
import { AchatsService } from './achats.service';

@Controller('achats')
export class AchatsController {
  constructor(private readonly achatsService: AchatsService) {}

  @Get()
  findAll() {
    return this.achatsService.findAll();
  }
}