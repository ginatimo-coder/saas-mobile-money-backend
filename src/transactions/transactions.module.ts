import { Module, forwardRef } from '@nestjs/common';
import { TransactionsController } from './transactions.controller';
import { TransactionsService } from './transactions.service';
import { WalletModule } from '../wallet/wallet.module';

@Module({
  imports: [forwardRef(() => WalletModule)],
  controllers: [TransactionsController],
  providers: [TransactionsService],
  exports: [TransactionsService], // Assurez-vous que TransactionsService est bien importé au dessus
})
export class TransactionsModule {}