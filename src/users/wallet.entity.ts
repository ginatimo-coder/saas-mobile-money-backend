import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';

@Entity('wallets')
export class Wallet {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('decimal', { precision: 15, scale: 2, default: 0 })
  balanceCdf: number;

  @Column('decimal', { precision: 12, scale: 2, default: 0 })
  balanceUsd: number;

  @OneToOne(() => User, (user) => user.wallet, { onDelete: 'CASCADE' })
  @JoinColumn()
  user: User;
}