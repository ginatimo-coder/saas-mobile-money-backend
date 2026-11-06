import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('utilisateurs_rh')
export class UtilisateurRh {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  nom_complet: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 255 })
  mot_de_passe: string;

  @Column({ type: 'varchar', length: 50, default: 'COMMERCIAL' })
  role: string; // ADMIN, COMPTABLE, CAISSIER, COMMERCIAL

  @Column({ type: 'decimal', precision: 12, scale: 2, nullable: true })
  salaire_base: number;

  @Column({ type: 'varchar', length: 20, default: 'ACTIF' })
  statut: string;

  @CreateDateColumn()
  createdAt: Date;
}