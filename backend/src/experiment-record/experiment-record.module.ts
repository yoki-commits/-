import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExperimentRecord } from './experiment-record.entity';
import { ExperimentRecordService } from './experiment-record.service';
import { ExperimentRecordController } from './experiment-record.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ExperimentRecord])],
  providers: [ExperimentRecordService],
  controllers: [ExperimentRecordController],
  exports: [ExperimentRecordService],
})
export class ExperimentRecordModule {}
