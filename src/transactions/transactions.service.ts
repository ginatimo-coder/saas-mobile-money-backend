import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Transaction } from './transaction.entity';

@Injectable()
export class TransactionsService {
  private transactionRepository: Repository<Transaction>;

  constructor(private readonly dataSource: DataSource) {
    // Récupération directe et sécurisée du repository via DataSource (zéro décorateur, zéro undefined)
    this.transactionRepository = this.dataSource.getRepository(Transaction);
  }

  async create(createTransactionDto: any): Promise<Transaction> {
    const transaction = this.transactionRepository.create(createTransactionDto);
    return await this.transactionRepository.save(transaction);
  }

  async findAll(): Promise<Transaction[]> {
    return await this.transactionRepository.find();
  }

  async findOne(id: string): Promise<Transaction> {
    const transaction = await this.transactionRepository.findOne({ where: { id } });
    if (!transaction) {
      throw new NotFoundException("Transaction introuvable.");
    }
    return transaction;
  }
}