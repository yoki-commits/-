import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Experiment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'text' })
  principle: string;

  @Column({ type: 'text' })
  steps: string;

  @Column({ type: 'text' })
  notes: string;

  @Column({ type: 'text' })
  observations: string;

  @Column({ type: 'text' })
  instruments: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}