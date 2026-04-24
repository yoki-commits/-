import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImageRecognitionService } from './image-recognition.service';

@Controller('image-recognition')
export class ImageRecognitionController {
  constructor(private imageRecognitionService: ImageRecognitionService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('image'))
  async uploadFile(@UploadedFile() file: any) {
    if (!file) {
      return { error: 'No file uploaded' };
    }

    try {
      // 保存上传的文件
      const filePath = await this.imageRecognitionService.saveUploadedFile(file);
      
      // 调用大模型进行识别
      const recognitionResult = await this.imageRecognitionService.recognizeImage(filePath);
      
      // 删除临时文件
      await this.imageRecognitionService.deleteFile(filePath);
      
      return recognitionResult;
    } catch (error) {
      console.error('Image recognition error:', error);
      return { error: 'Image recognition failed' };
    }
  }
}