import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('clients')
export class Client {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  nom_entreprise: string;

  @Column({ type: 'varchar', length: 50, unique: true })
  telephone: string;

  @Column({ type: 'text', nullable: true })
  adresse: string;

  @Column({ type: 'decimal', precision: 12, scale: 2, default: 0 })
  solde_compte: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}