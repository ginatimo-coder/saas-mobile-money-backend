import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vente } from './vente.entity';

@Injectable()
export class VentesService {
  constructor(
    @InjectRepository(Vente)
    private readonly venteRepository: Repository<Vente>,
  ) {}

  findAll() {
    return this.venteRepository.find();
  }
}