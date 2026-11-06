import { Controller, Post, Get, Body, Param, UseGuards, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async register(
    @Body('phoneNumber') phoneNumber: string,
    @Body('fullName') fullName: string,
    @Body('pinCode') pinCode: string,
  ) {
    return this.usersService.register(phoneNumber, fullName, pinCode);
  }

  @Post('login')
  async login(
    @Body('phoneNumber') phoneNumber: string,
    @Body('pinCode') pinCode: string,
  ) {
    return this.usersService.login(phoneNumber, pinCode);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id/wallet')
  async getWallet(@Param('id') id: string) {
    return this.usersService.getWallet(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post(':id/wallet/deposit')
  async deposit(
    @Param('id') id: string,
    @Body('amount') amount: number,
    @Body('currency') currency: 'CDF' | 'USD',
  ) {
    return this.usersService.depositMoney(id, amount, currency);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post(':id/wallet/transfer')
  async transfer(
    @Param('id') id: string,
    @Body('recipientPhone') recipientPhone: string,
    @Body('amount') amount: number,
    @Body('currency') currency: 'CDF' | 'USD',
  ) {
    return this.usersService.transferMoney(id, recipientPhone, amount, currency);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id/transactions')
  async getTransactions(@Param('id') id: string) {
    return this.usersService.getTransactions(id);
  }
}