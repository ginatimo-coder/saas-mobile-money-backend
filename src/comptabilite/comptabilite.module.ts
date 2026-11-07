import { Module } from '@nestjs/common';
import { ComptabiliteController } from './comptabilite.controller';
import { ComptabiliteService } from './comptabilite.service';

@Module({
  imports: [],
  controllers: [ComptabiliteController],
  providers: [ComptabiliteService],
  exports: [ComptabiliteService], // Assurez-vous que ComptabiliteService est bien importé au dessus
})
export class ComptabiliteModule {}