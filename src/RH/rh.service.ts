import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UtilisateurRh } from './utilisateur-rh.entity';

@Injectable()
export class RhService {
  constructor(
    @InjectRepository(UtilisateurRh)
    private readonly utilisateurRhRepository: Repository<UtilisateurRh>,
  ) {}

  findAll() {
    return this.utilisateurRhRepository.find();
  }
}