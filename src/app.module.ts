import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WalletModule } from './wallet/wallet.module';
import { TransactionsModule } from './transactions/transactions.module';
import { ComptabiliteModule } from './comptabilite/comptabilite.module';
import { Wallet } from './wallet/wallet.entity';
import { Transaction } from './transactions/transaction.entity';
import { ComptabiliteEntry } from './comptabilite/comptabilite.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      entities: [Wallet, Transaction, ComptabiliteEntry],
      synchronize: true,
    }),
    WalletModule,
    TransactionsModule,
    ComptabiliteModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}