import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Achat } from './achat.entity';

@Injectable()
export class AchatsService {
  constructor(
    @InjectRepository(Achat)
    private readonly achatRepository: Repository<Achat>,
  ) {}

  findAll() {
    return this.achatRepository.find();
  }
}