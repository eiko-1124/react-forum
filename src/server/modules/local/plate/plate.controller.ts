import { Controller, Get, Query } from '@nestjs/common';
import { PlateService } from './plate.service';
import { adminRes, detailsRes, noticeRes, plateListRes, plateSumRes, rankingRes, subscribeRes } from './dto/plate.dto';

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

  @Get('getDetails')
  getDetails(@Query('pid') id: string): Promise<detailsRes> {
    return this.plateService.getDetails(id)
  }

  @Get('getNotice')
  getNotice(@Query('pid') pid: string): Promise<noticeRes> {
    return this.plateService.getNotice(pid)
  }

  @Get('getAdmins')
  getAdmins(@Query('pid') pid: string): Promise<adminRes> {
    return this.plateService.getAdmins(pid)
  }

  @Get('getRanking')
  getRanking(@Query('pid') pid: string, @Query('id') id: string): Promise<rankingRes> {
    return this.plateService.getRanking(pid, id)
  }

  @Get('getSubscribe')
  getSubscribe(@Query('id') id: string, @Query('pid') pid: string): Promise<subscribeRes> {
    return this.plateService.getSubscribe(id, pid)
  }
}
