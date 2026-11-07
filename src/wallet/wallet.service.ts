import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Wallet } from './wallet.entity';

@Injectable()
export class WalletService {
  private walletRepository: Repository<Wallet>;

  constructor(private readonly dataSource: DataSource) {
    // Récupération directe et sécurisée du repository via DataSource (zéro décorateur, zéro undefined)
    this.walletRepository = this.dataSource.getRepository(Wallet);
  }

  async createWallet(): Promise<Wallet> {
    const wallet = this.walletRepository.create({
      balance: 0,
      currency: 'CDF',
    });
    return await this.walletRepository.save(wallet);
  }

  async findOne(id: string): Promise<Wallet> {
    const wallet = await this.walletRepository.findOne({ where: { id } });
    if (!wallet) {
      throw new NotFoundException("Portefeuille introuvable.");
    }
    return wallet;
  }

  async findAll(): Promise<Wallet[]> {
    return await this.walletRepository.find();
  }
}