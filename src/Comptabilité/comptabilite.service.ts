import { Injectable } from '@nestjs/common';

@Injectable()
export class ComptabiliteService {
  getData() {
    return { message: 'Comptabilité service active' };
  }
}