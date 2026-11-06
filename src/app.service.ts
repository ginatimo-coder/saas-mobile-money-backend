import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
<<<<<<< HEAD
    return 'Hello World!';
=======
    return 'Hello World from SaaS Mobile Money API!';
>>>>>>> f53be801812e677f221d1bae063d2bc525236fbf
  }
}
