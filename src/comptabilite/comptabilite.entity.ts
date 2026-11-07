import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity('comptabilite_entries')
export class ComptabiliteEntry {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('decimal', { precision: 12, scale: 2 })
  amount: number;

  @Column()
  libelle: string;

  @Column({ default: 'CDF' })
  currency: string;

  @ManyToOne('Transaction', { onDelete: 'CASCADE' })
  @JoinColumn()
  transaction: any;

  @CreateDateColumn()
  createdAt: Date;
}