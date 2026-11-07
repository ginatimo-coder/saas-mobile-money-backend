import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { Wallet } from './wallet.entity';
// Assurez-vous d'importer votre AuthGuard selon son emplacement (ex: JWT)
// import { AuthGuard } from '@nestjs/passport'; 

@Controller('wallets')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  // Route pour récupérer le portefeuille de l'utilisateur connecté
  // @UseGuards(AuthGuard('jwt')) // Décommentez lorsque votre authentification sera active
  @Get('me')
  async getMyWallet(@Req() req: any): Promise<Wallet> {
    // Supposons que l'ID utilisateur est extrait du token JWT (ex: req.user.userId)
    // Pour l'instant, vous pouvez adapter selon votre payload d'authentification
    const userId = req.user?.userId || req.user?.id; 
    
    return await this.walletService.findByUserId(userId);
  }
}