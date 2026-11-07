import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ComptabiliteController } from './comptabilite.controller';
import { ComptabiliteService } from './comptabilite.service';
// Adaptez le nom de l'entité selon votre fichier existant dans le dossier
// import { CompteEntity } from './...';

@Module({
  imports: [TypeOrmModule.forFeature([])],
  controllers: [ComptabiliteController],
  providers: [ComptabiliteService],
  exports: [ComptabiliteService],
})
export class ComptabiliteModule {}