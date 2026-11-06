import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('fournisseurs')
export class Fournisseur {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  nom_entreprise: string;

  @Column({ type: 'varchar', length: 50 })
  telephone: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  categorie_produit: string;

  @Column({ type: 'decimal', precision: 12, scale: 2, default: 0 })
  solde_du: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}