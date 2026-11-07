import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction, TransactionType } from './transaction.entity';
import { Wallet } from '../wallet/wallet.entity';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>,
    @InjectRepository(Wallet)
    private readonly walletRepository: Repository<Wallet>,
  ) {}

  // Effectuer un dépôt sur un portefeuille
  async createDeposit(walletId: string, amount: number): Promise<Transaction> {
    if (amount <= 0) {
      throw new BadRequestException("Le montant du dépôt doit être supérieur à zéro.");
    }

    // 1. Rechercher le portefeuille
    const wallet = await walletRepository.findOne({ where: { id: walletId } });
    if (!wallet) {
      throw new NotFoundException("Portefeuille introuvable.");
    }

    // 2. Mettre à jour le solde
    wallet.balance = Number(wallet.balance) + Number(amount);
    await this.walletRepository.save(wallet);

    // 3. Enregistrer la transaction
    const transaction = this.transactionRepository.create({
      amount,
      type: TransactionType.DEPOSIT,
      status: 'SUCCESS',
      wallet,
    });

    return await this.transactionRepository.save(transaction);
  }

  // Historique des transactions d'un portefeuille
  async findByWalletId(walletId: string): Promise<Transaction[]> {
    return await this.transactionRepository.find({
      where: { wallet: { id: walletId } },
      order: { createdAt: 'DESC' },
    });
  }
}