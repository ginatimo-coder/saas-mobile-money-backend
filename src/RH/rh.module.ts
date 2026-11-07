import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RhController } from './rh.controller';
import { RhService } from './rh.service';
import { UtilisateurRh } from './utilisateur-rh.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UtilisateurRh])],
  controllers: [RhController],
  providers: [RhService],
  exports: [RhService],
})
export class RhModule {}