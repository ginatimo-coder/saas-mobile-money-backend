import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WalletModule } from './wallet/wallet.module';
import { TransactionsModule } from './transactions/transactions.module';
import { ComptabiliteModule } from './comptabilite/comptabilite.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      autoLoadEntities: true, // Chargement automatique par les modules enfants
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