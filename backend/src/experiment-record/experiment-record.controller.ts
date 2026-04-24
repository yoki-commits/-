import { Controller, Get, Post, Body, Param, Delete, Req } from '@nestjs/common';
import { ExperimentRecordService } from './experiment-record.service';

@Controller('experiment-records')
export class ExperimentRecordController {
  constructor(private experimentRecordService: ExperimentRecordService) {}

  @Post()
  async create(
    @Body() recordData: {
      user_id: number;
      experiment_id: number;
      experiment_name: string;
    },
  ) {
    return this.experimentRecordService.create(recordData);
  }

  @Get('user/:user_id')
  async findByUserId(@Param('user_id') user_id: number) {
    return this.experimentRecordService.findByUserId(user_id);
  }

  @Get(':id')
  async findById(@Param('id') id: number) {
    return this.experimentRecordService.findById(id);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.experimentRecordService.delete(id);
  }
}