import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';

@Entity('wallets')
export class Wallet {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('decimal', { precision: 12, scale: 2, default: 0 })
  balance: number;

  @Column({ default: 'CDF' })
  currency: string;

  @OneToMany('Transaction', (transaction: any) => transaction.wallet)
  transactions: any[];

  @CreateDateColumn()
  createdAt: Date;
}