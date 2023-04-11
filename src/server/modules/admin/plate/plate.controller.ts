import { Body, Controller, Post } from '@nestjs/common';
import { PlateService } from './plate.service';
import { noteRes, subscribeRes } from './dto/plate.dto';

@Controller('api/admin/plate')
export class PlateController {
  constructor(private readonly plateService: PlateService) { }

  @Post('setSubscribe')
  setSubscribe(@Body('id') id: string, @Body('pid') pid: string, @Body('name') name: string): Promise<subscribeRes> {
    return this.plateService.setSubscribe(id, pid, name)
  }

  @Post('setNote')
  setNote(@Body('id') id: string, @Body('pid') pid: string): Promise<noteRes> {
    return this.plateService.setNote(pid, id)
  }
}
