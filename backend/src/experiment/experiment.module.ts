import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Experiment } from './experiment.entity';
import { ExperimentService } from './experiment.service';
import { ExperimentController } from './experiment.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Experiment])],
  providers: [ExperimentService],
  controllers: [ExperimentController],
  exports: [ExperimentService],
})
export class ExperimentModule {}
