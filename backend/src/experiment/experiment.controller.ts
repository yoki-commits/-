import { Controller, Get, Post, Body, Param, Put, Delete, Query } from '@nestjs/common';
import { ExperimentService } from './experiment.service';
import { Experiment } from './experiment.entity';

@Controller('experiments')
export class ExperimentController {
  constructor(private experimentService: ExperimentService) {}

  @Post()
  async create(
    @Body() experimentData: {
      name: string;
      principle: string;
      steps: string;
      notes: string;
      observations: string;
      instruments: string;
    },
  ) {
    return this.experimentService.create(experimentData);
  }

  @Get()
  async findAll() {
    return this.experimentService.findAll();
  }

  @Get('search')
  async search(@Query('name') name: string) {
    return this.experimentService.search(name);
  }

  @Get(':id')
  async findById(@Param('id') id: number) {
    return this.experimentService.findById(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() experimentData: Partial<Experiment>,
  ) {
    return this.experimentService.update(id, experimentData);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.experimentService.delete(id);
  }
}