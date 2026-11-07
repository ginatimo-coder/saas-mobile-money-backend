import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ComptabiliteEntry } from './comptabilite.entity';

@Injectable()
export class ComptabiliteService {
  constructor(
    @InjectRepository(ComptabiliteEntry)
    private readonly comptabiliteRepository: Repository<ComptabiliteEntry>,
  ) {}

  // Enregistrer une écriture comptable liée à une transaction
  async createEntry(amount: number, libelle: string, transactionId: string): Promise<ComptabiliteEntry> {
    const entry = this.comptabiliteRepository.create({
      amount,
      libelle,
      currency: 'CDF', // <-- Bien ancré sur CDF
      transaction: { id: transactionId } as any,
    });
    return await this.comptabiliteRepository.save(entry);
  }

  // Lister toutes les écritures comptables
  async findAllEntries(): Promise<ComptabiliteEntry[]> {
    return await this.comptabiliteRepository.find({
      order: { createdAt: 'DESC' },
    });
  }
}