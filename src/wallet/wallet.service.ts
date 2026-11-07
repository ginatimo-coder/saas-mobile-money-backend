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

  // 1. Créer un portefeuille pour un utilisateur
  async createWallet(userId: string): Promise<Wallet> {
    const wallet = this.walletRepository.create({
      user: { id: userId } as any,
      balance: 0,
      currency: 'XOF',
    });
    return await this.walletRepository.save(wallet);
  }

  // 2. Trouver le portefeuille d'un utilisateur par son ID
  async findByUserId(userId: string): Promise<Wallet> {
    const wallet = await this.walletRepository.findOne({
      where: { user: { id: userId } },
    });

    if (!wallet) {
      throw new NotFoundException(`Portefeuille introuvable pour l'utilisateur ${userId}`);
    }

    return wallet;
  }
}