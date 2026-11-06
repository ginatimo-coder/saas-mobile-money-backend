import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';

@Entity('transactions')
export class Transaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  type: 'DEPOSIT' | 'TRANSFER_SENT' | 'TRANSFER_RECEIVED';

  @Column('decimal', { precision: 15, scale: 2 })
  amount: number;

  @Column()
  currency: string; // 'CDF' ou 'USD'

  @Column({ nullable: true })
  relatedPhone: string; // Numéro concerné (ex: destinataire ou expéditeur)

  @ManyToOne(() => User, (user) => user.transactions, { onDelete: 'CASCADE' })
  user: User;

  @CreateDateColumn()
  createdAt: Date;
}