import { Controller, Get, Query } from '@nestjs/common';
import { PlateService } from './plate.service';
import { plateListRes, plateSumRes } from './dto/plate.dto';

@Controller('api/local/plate')
export class PlateController {
  constructor(private readonly plateService: PlateService) { }

  @Get('getHotList')
  getHotList() {
    this.plateService.getHotList()
  }

  @Get('getPlateList')
  getPlateList(@Query('page') page: number): Promise<plateListRes> {
    return this.plateService.getPlateList(page)
  }

  @Get('getPlateSum')
  getPlateSum(): Promise<plateSumRes> {
    return this.plateService.getPlateSum()
  }
}
