import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { ExperimentModule } from './experiment/experiment.module';
import { ImageRecognitionModule } from './image-recognition/image-recognition.module';
import { ExperimentRecordModule } from './experiment-record/experiment-record.module';
import { User } from './user/user.entity';
import { Experiment } from './experiment/experiment.entity';
import { ExperimentRecord } from './experiment-record/experiment-record.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'experiment-prep.db',
      entities: [User, Experiment, ExperimentRecord],
      synchronize: true,
    }),
    UserModule,
    ExperimentModule,
    ImageRecognitionModule,
    ExperimentRecordModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}