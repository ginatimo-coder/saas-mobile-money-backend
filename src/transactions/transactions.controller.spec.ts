import { Controller, Post, Get, Param, Body, ParseUUIDPipe } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { Transaction } from './transaction.entity';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  // Route pour effectuer un dépôt
  // POST /transactions/deposit
  @Post('deposit')
  async deposit(
    @Body('walletId') walletId: string,
    @Body('amount') amount: number,
  ): Promise<Transaction> {
    return await this.transactionsService.createDeposit(walletId, amount);
  }

  // Route pour l'historique d'un portefeuille
  // GET /transactions/wallet/:walletId
  @Get('wallet/:walletId')
  async getByWallet(@Param('walletId', ParseUUIDPipe) walletId: string): Promise<Transaction[]> {
    return await this.transactionsService.findByWalletId(walletId);
  }
}