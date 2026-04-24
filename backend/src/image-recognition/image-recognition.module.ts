import { Module } from '@nestjs/common';
import { ImageRecognitionService } from './image-recognition.service';
import { ImageRecognitionController } from './image-recognition.controller';

@Module({
  providers: [ImageRecognitionService],
  controllers: [ImageRecognitionController],
  exports: [ImageRecognitionService],
})
export class ImageRecognitionModule {}
