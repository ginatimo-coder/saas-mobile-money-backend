import { Controller, Get } from '@nestjs/common';
<<<<<<< HEAD
=======
import { DataSource } from 'typeorm';
>>>>>>> f53be801812e677f221d1bae063d2bc525236fbf
import { AppService } from './app.service';

@Controller()
export class AppController {
<<<<<<< HEAD
  constructor(private readonly appService: AppService) {}
=======
  constructor(
    private readonly appService: AppService,
    private readonly dataSource: DataSource,
  ) {}
>>>>>>> f53be801812e677f221d1bae063d2bc525236fbf

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
<<<<<<< HEAD
=======

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
>>>>>>> f53be801812e677f221d1bae063d2bc525236fbf
}
