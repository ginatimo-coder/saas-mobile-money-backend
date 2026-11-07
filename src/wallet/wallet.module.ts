import { Module } from '@nestjs/common';
import { WalletController } from './wallet.controller';
import { WalletService } from './wallet.service';

@Module({
  imports: [],
  controllers: [WalletController],
  providers: [WalletService],
  exports: [WalletService], // Assurez-vous que WalletService est bien défini et importé au dessus
})
export class WalletModule {}