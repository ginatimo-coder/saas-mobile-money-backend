import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('ventes')
export class Vente {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  client_id: string;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  montant_total: number;

  @Column({ type: 'varchar', length: 10, default: 'USD' })
  devise: string; // USD ou CDF

  @Column({ type: 'varchar', length: 50 })
  mode_reglement: string; // ESPECES, MOBILE_MONEY, BANQUE

  @Column({ type: 'varchar', length: 50, default: 'VALIDEE' })
  statut: string;

  @CreateDateColumn()
  date_vente: Date;
}