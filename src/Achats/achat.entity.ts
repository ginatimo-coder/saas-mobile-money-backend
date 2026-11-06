import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('achats')
export class Achat {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  fournisseur_id: string;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  montant_total: number;

  @Column({ type: 'varchar', length: 50, default: 'EN_ATTENTE' })
  statut_paiement: string; // PAYE, EN_ATTENTE, PARTIEL

  @CreateDateColumn()
  date_achat: Date;
}