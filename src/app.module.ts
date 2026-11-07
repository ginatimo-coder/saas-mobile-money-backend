import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WalletModule } from './wallet/wallet.module';
import { TransactionsModule } from './transactions/transactions.module';
import { ComptabiliteModule } from './comptabilite/comptabilite.module';
import { join } from 'path';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      // Chargement dynamique des entités
      entities: [join(__dirname, '**/*.entity{.ts,.js}')],
      synchronize: true,
    }),
    
    // 1. On garde uniquement le WalletModule pour le test
    WalletModule,

    // 2. Les deux autres modules sont désactivés pour isoler l'erreur
    // TransactionsModule,
    // ComptabiliteModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}