import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Wallet } from './wallet.entity';

@Injectable()
export class WalletService {
  constructor(
    @InjectRepository(Wallet)
    private readonly walletRepository: Repository<Wallet>,
  ) {}

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