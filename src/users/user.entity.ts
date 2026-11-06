import { Entity, PrimaryGeneratedColumn, Column, OneToOne, OneToMany, CreateDateColumn } from 'typeorm';
import { Wallet } from './wallet.entity';
import { Transaction } from './transaction.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  phoneNumber: string;

  @Column()
  fullName: string;

  @Column()
  pinCode: string;

  @OneToOne(() => Wallet, (wallet) => wallet.user, { cascade: true })
  wallet: Wallet;

  @OneToMany(() => Transaction, (transaction) => transaction.user, { cascade: true })
  transactions: Transaction[];

  @CreateDateColumn()
  createdAt: Date;
}