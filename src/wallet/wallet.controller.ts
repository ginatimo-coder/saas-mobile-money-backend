import { Controller, Get, Param, Post } from '@nestjs/common';
import { WalletService } from './wallet.service';

@Controller('wallet')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @Get()
  async findAll() {
    return await this.walletService.findAll();
  }

  @Post()
  async create() {
    return await this.walletService.createWallet();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.walletService.findOne(id);
  }
}