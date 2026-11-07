import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { ComptabiliteEntry } from './comptabilite.entity';

@Injectable()
export class ComptabiliteService {
  private comptabiliteRepository: Repository<ComptabiliteEntry>;

  constructor(private readonly dataSource: DataSource) {
    this.comptabiliteRepository = this.dataSource.getRepository(ComptabiliteEntry);
  }

  async create(createDto: any): Promise<ComptabiliteEntry> {
    const entry = this.comptabiliteRepository.create(createDto);
    return await this.comptabiliteRepository.save(entry as unknown as ComptabiliteEntry);
  }

  async findAll(): Promise<ComptabiliteEntry[]> {
    return await this.comptabiliteRepository.find();
  }

  async findOne(id: string): Promise<ComptabiliteEntry> {
    const entry = await this.comptabiliteRepository.findOne({ where: { id } });
    if (!entry) {
      throw new NotFoundException("Entrée comptable introuvable.");
    }
    return entry;
  }
}