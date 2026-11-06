import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'SUPER_SECRET_KEY_MOBILE_MONEY_DRC', // À placer dans des variables d'environnement en production
    });
  }

  async validate(payload: any) {
    return { userId: payload.sub, phoneNumber: payload.phoneNumber };
  }
}