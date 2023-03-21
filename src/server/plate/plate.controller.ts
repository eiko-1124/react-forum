import { Controller, Get, Query } from '@nestjs/common';
import { PlateService } from './plate.service';
import { simpleSearchRes } from './dto/plate.dto';

@Controller('api/plate')
export class PlateController {
  constructor(private readonly plateService: PlateService) { }

  @Get('simpleSearch')
  simpleSearch(@Query('keyWord') keyWord: string): Promise<simpleSearchRes> {
    return this.plateService.simpleSearch(keyWord)
  }
}
