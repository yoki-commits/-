import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne } from 'typeorm';
import { User } from '../user/user.entity';
import { Experiment } from '../experiment/experiment.entity';

@Entity()
export class ExperimentRecord {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  user: User;

  @Column()
  user_id: number;

  @ManyToOne(() => Experiment)
  experiment: Experiment;

  @Column()
  experiment_id: number;

  @Column()
  experiment_name: string;

  @CreateDateColumn()
  completed_at: Date;
}