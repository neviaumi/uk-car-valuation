import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Query,
} from '@nestjs/common';

import { AppEnvironment } from '../../config/config.constants';
import { ConfigService } from '../../config/config.module';
import { Resource } from './resource.constants';
import { SeederService } from './seeder.service';

@Controller(`/test/seeder/${Resource.GAME}`)
export class SeederController {
  constructor(
    private seederService: SeederService,
    private config: ConfigService,
  ) {}

  private shouldExposeEndpoint() {
    return [AppEnvironment.DEV, AppEnvironment.TEST].includes(
      this.config.get('env')!,
    );
  }

  @Get('/:id')
  async fineOne(@Param('id') id: string) {
    if (!this.shouldExposeEndpoint())
      throw new NotFoundException('Route Not found');
    return { data: await this.seederService.fineOne(id) };
  }

  @Get('/')
  async fineMany(@Query() query: any) {
    if (!this.shouldExposeEndpoint())
      throw new NotFoundException('Route Not found');
    return { data: { items: await this.seederService.fineMany(query) } };
  }

  @Post('/')
  async create(@Body() payload: any) {
    if (!this.shouldExposeEndpoint())
      throw new NotFoundException('Route Not found');
    return { data: await this.seederService.create(payload) };
  }
}
