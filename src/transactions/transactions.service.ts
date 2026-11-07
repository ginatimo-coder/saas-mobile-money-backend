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

  async createDeposit(walletId: string, amount: number): Promise<Transaction> {
    if (amount <= 0) {
      throw new BadRequestException("Le montant du dépôt doit être supérieur à zéro.");
    }

    // Correction ici : ajout de 'this.'
    const wallet = await this.walletRepository.findOne({ where: { id: walletId } });
    if (!wallet) {
      throw new NotFoundException("Portefeuille introuvable.");
    }

    wallet.balance = Number(wallet.balance) + Number(amount);
    await this.walletRepository.save(wallet);

    const transaction = this.transactionRepository.create({
      amount,
      type: TransactionType.DEPOSIT,
      status: 'SUCCESS',
      wallet,
    });

    return await this.transactionRepository.save(transaction);
  }

  async findByWalletId(walletId: string): Promise<Transaction[]> {
    return await this.transactionRepository.find({
      where: { wallet: { id: walletId } },
      order: { createdAt: 'DESC' },
    });
  }
}