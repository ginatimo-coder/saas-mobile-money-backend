import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('comptabilite')
export class Comptabilite {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 20 })
  type_flux: string; // ENTREE ou SORTIE

  @Column({ type: 'varchar', length: 100 })
  categorie: string; // VENTE, ACHAT, SALAIRE, etc.

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  montant: number;

  @Column({ type: 'varchar', length: 10, default: 'USD' })
  devise: string; // USD ou CDF

  @Column({ type: 'varchar', length: 100, nullable: true })
  reference_piece: string;

  @Column({ type: 'varchar', length: 100 })
  compte_tresorerie: string; // Caisse, M-Pesa, Banque

  @CreateDateColumn()
  date_operation: Date;
}