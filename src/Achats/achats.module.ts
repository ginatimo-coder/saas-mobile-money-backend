import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AchatsController } from './achats.controller';
import { AchatsService } from './achats.service';
import { Achat } from './achat.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Achat])],
  controllers: [AchatsController],
  providers: [AchatsService],
  exports: [AchatsService],
})
export class AchatsModule {}