import { Controller, Get } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly dataSource: DataSource,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('check-db')
  async checkDatabase() {
    try {
      await this.dataSource.query('SELECT 1');
      return {
        status: 'success',
        message: 'Connexion à la base de données PostgreSQL (Supabase) réussie !',
      };
    } catch (error) {
      return {
        status: 'error',
        message: 'Échec de la connexion à la base de données',
        details: error.message,
      };
    }
  }
}
