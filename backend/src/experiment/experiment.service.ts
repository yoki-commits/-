import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Experiment } from './experiment.entity';

@Injectable()
export class ExperimentService {
  constructor(
    @InjectRepository(Experiment)
    private experimentRepository: Repository<Experiment>,
  ) {}

  async create(experimentData: {
    name: string;
    principle: string;
    steps: string;
    notes: string;
    observations: string;
    instruments: string;
  }) {
    const experiment = this.experimentRepository.create(experimentData);
    return this.experimentRepository.save(experiment);
  }

  async findAll() {
    return this.experimentRepository.find();
  }

  async findByName(name: string) {
    return this.experimentRepository.findOne({ where: { name } });
  }

  async findById(id: number) {
    return this.experimentRepository.findOne({ where: { id } });
  }

  async update(id: number, experimentData: Partial<Experiment>) {
    await this.experimentRepository.update(id, experimentData);
    return this.experimentRepository.findOne({ where: { id } });
  }

  async delete(id: number) {
    return this.experimentRepository.delete(id);
  }

  async search(name: string) {
    return this.experimentRepository.createQueryBuilder('experiment')
      .where('experiment.name LIKE :name', { name: `%${name}%` })
      .getMany();
  }
}