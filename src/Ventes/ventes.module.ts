import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VentesController } from './ventes.controller';
import { VentesService } from './ventes.service';
import { Vente } from './vente.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Vente])],
  controllers: [VentesController],
  providers: [VentesService],
  exports: [VentesService],
})
export class VentesModule {}