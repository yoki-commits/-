import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ExperimentRecord } from './experiment-record.entity';

@Injectable()
export class ExperimentRecordService {
  constructor(
    @InjectRepository(ExperimentRecord)
    private experimentRecordRepository: Repository<ExperimentRecord>,
  ) {}

  async create(recordData: {
    user_id: number;
    experiment_id: number;
    experiment_name: string;
  }) {
    const record = this.experimentRecordRepository.create(recordData);
    return this.experimentRecordRepository.save(record);
  }

  async findByUserId(user_id: number) {
    return this.experimentRecordRepository.find({
      where: { user_id },
      order: { completed_at: 'DESC' },
    });
  }

  async findById(id: number) {
    return this.experimentRecordRepository.findOne({ where: { id } });
  }

  async delete(id: number) {
    return this.experimentRecordRepository.delete(id);
  }
}