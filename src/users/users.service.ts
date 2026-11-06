import { Injectable, ConflictException, UnauthorizedException, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { User } from './user.entity';
import { Wallet } from './wallet.entity';
import { Transaction } from './transaction.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Wallet)
    private walletRepository: Repository<Wallet>,
    @InjectRepository(Transaction)
    private transactionRepository: Repository<Transaction>,
    private dataSource: DataSource,
    private jwtService: JwtService,
  ) {}

  async register(phoneNumber: string, fullName: string, pinCode: string) {
    const existingUser = await this.usersRepository.findOne({ where: { phoneNumber } });
    if (existingUser) {
      throw new ConflictException('Ce numéro de téléphone est déjà utilisé.');
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(pinCode, salt);

    const wallet = new Wallet();
    wallet.balanceCdf = 0;
    wallet.balanceUsd = 0;

    const user = this.usersRepository.create({
      phoneNumber,
      fullName,
      pinCode: hashedPassword,
      wallet,
    });

    await this.usersRepository.save(user);

    const { pinCode: _, ...result } = user;
    return {
      message: 'Utilisateur enregistré et portefeuille multi-devises créé avec succès !',
      user: result,
    };
  }

  async login(phoneNumber: string, pinCode: string) {
    const user = await this.usersRepository.findOne({ 
      where: { phoneNumber },
      relations: { wallet: true },
    });

    if (!user) {
      throw new UnauthorizedException('Identifiants invalides.');
    }

    const isPasswordValid = await bcrypt.compare(pinCode, user.pinCode);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Identifiants invalides.');
    }

    // Génération du Token JWT
    const payload = { sub: user.id, phoneNumber: user.phoneNumber };
    const accessToken = this.jwtService.sign(payload);

    const { pinCode: _, ...result } = user;
    return {
      message: 'Connexion réussie',
      accessToken,
      user: result,
    };
  }

  async getWallet(userId: string) {
    const user = await this.usersRepository.findOne({
      where: { id: userId },
      relations: { wallet: true },
    });

    if (!user || !user.wallet) {
      throw new NotFoundException('Utilisateur ou portefeuille introuvable.');
    }

    return {
      userId: user.id,
      fullName: user.fullName,
      phoneNumber: user.phoneNumber,
      balances: {
        CDF: Number(user.wallet.balanceCdf),
        USD: Number(user.wallet.balanceUsd),
      },
    };
  }

  async depositMoney(userId: string, amount: number, currency: 'CDF' | 'USD') {
    if (!amount || amount <= 0) {
      throw new BadRequestException('Le montant du dépôt doit être supérieur à zéro.');
    }

    const user = await this.usersRepository.findOne({
      where: { id: userId },
      relations: { wallet: true },
    });

    if (!user || !user.wallet) {
      throw new NotFoundException('Utilisateur ou portefeuille introuvable.');
    }

    const cur = currency?.toUpperCase();
    if (cur === 'CDF') {
      user.wallet.balanceCdf = Number(user.wallet.balanceCdf) + Number(amount);
    } else if (cur === 'USD') {
      user.wallet.balanceUsd = Number(user.wallet.balanceUsd) + Number(amount);
    } else {
      throw new BadRequestException('Devise non supportée. Utilisez "CDF" ou "USD".');
    }

    await this.walletRepository.save(user.wallet);

    // Enregistrement de la transaction
    const tx = this.transactionRepository.create({
      type: 'DEPOSIT',
      amount,
      currency: cur,
      user,
    });
    await this.transactionRepository.save(tx);

    return {
      message: `Dépôt de ${amount} ${cur} effectué avec succès`,
      balances: {
        CDF: Number(user.wallet.balanceCdf),
        USD: Number(user.wallet.balanceUsd),
      },
    };
  }

  async transferMoney(senderId: string, recipientPhone: string, amount: number, currency: 'CDF' | 'USD') {
    if (!amount || amount <= 0) {
      throw new BadRequestException('Le montant du transfert doit être supérieur à zéro.');
    }

    const cur = currency?.toUpperCase();
    if (cur !== 'CDF' && cur !== 'USD') {
      throw new BadRequestException('Devise non supportée. Utilisez "CDF" ou "USD".');
    }

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const sender = await queryRunner.manager.findOne(User, {
        where: { id: senderId },
        relations: { wallet: true },
      });

      if (!sender || !sender.wallet) {
        throw new NotFoundException('Expéditeur ou portefeuille introuvable.');
      }

      const recipient = await queryRunner.manager.findOne(User, {
        where: { phoneNumber: recipientPhone },
        relations: { wallet: true },
      });

      if (!recipient || !recipient.wallet) {
        throw new NotFoundException('Destinataire introuvable.');
      }

      if (sender.id === recipient.id) {
        throw new BadRequestException('Vous ne pouvez pas vous transférer de l’argent à vous-même.');
      }

      if (cur === 'CDF') {
        if (Number(sender.wallet.balanceCdf) < amount) {
          throw new BadRequestException('Solde en Francs Congolais (CDF) insuffisant.');
        }
        sender.wallet.balanceCdf = Number(sender.wallet.balanceCdf) - Number(amount);
        recipient.wallet.balanceCdf = Number(recipient.wallet.balanceCdf) + Number(amount);
      } else {
        if (Number(sender.wallet.balanceUsd) < amount) {
          throw new BadRequestException('Solde en Dollars Américains (USD) insuffisant.');
        }
        sender.wallet.balanceUsd = Number(sender.wallet.balanceUsd) - Number(amount);
        recipient.wallet.balanceUsd = Number(recipient.wallet.balanceUsd) + Number(amount);
      }

      await queryRunner.manager.save(sender.wallet);
      await queryRunner.manager.save(recipient.wallet);

      // Historique pour l'expéditeur
      const txSender = queryRunner.manager.create(Transaction, {
        type: 'TRANSFER_SENT',
        amount,
        currency: cur,
        relatedPhone: recipientPhone,
        user: sender,
      });
      await queryRunner.manager.save(txSender);

      // Historique pour le destinataire
      const txRecipient = queryRunner.manager.create(Transaction, {
        type: 'TRANSFER_RECEIVED',
        amount,
        currency: cur,
        relatedPhone: sender.phoneNumber,
        user: recipient,
      });
      await queryRunner.manager.save(txRecipient);

      await queryRunner.commitTransaction();

      return {
        message: `Transfert de ${amount} ${cur} réussi vers le ${recipientPhone}`,
        senderNewBalances: {
          CDF: Number(sender.wallet.balanceCdf),
          USD: Number(sender.wallet.balanceUsd),
        },
      };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  // Récupérer l'historique des transactions
  async getTransactions(userId: string) {
    return this.transactionRepository.find({
      where: { user: { id: userId } },
      order: { createdAt: 'DESC' },
    });
  }
}