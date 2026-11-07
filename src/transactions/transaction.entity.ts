import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from 'typeorm';

export enum TransactionType {
  DEPOSIT = 'DEPOSIT',
  WITHDRAWAL = 'WITHDRAWAL',
}

@Entity('transactions')
export class Transaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('decimal', { precision: 12, scale: 2 })
  amount: number;

  @Column({ type: 'enum', enum: TransactionType })
  type: TransactionType;

  @Column({ default: 'SUCCESS' })
  status: string;

  @ManyToOne('Wallet', (wallet: any) => wallet.transactions, { onDelete: 'CASCADE' })
  wallet: any;

  @CreateDateColumn()
  createdAt: Date;
}