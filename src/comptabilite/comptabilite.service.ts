import { Injectable } from '@nestjs/common';

@Injectable()
export class ComptabiliteService {
  getData() {
    return { message: 'Comptabilite service active' };
  }
}