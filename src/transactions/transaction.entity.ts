import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from 'typeorm';
import { Wallet } from '../wallet/wallet.entity';

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
  status: string; // <-- Assurez-vous que cette ligne est présente

  @ManyToOne(() => Wallet, { onDelete: 'CASCADE' })
  wallet: Wallet; // <-- Assurez-vous que cette relation est présente

  @CreateDateColumn()
  createdAt: Date;
}