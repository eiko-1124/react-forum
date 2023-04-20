import { Body, Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { PlateService } from './plate.service';
import { createNewPlateRes, noteRes, subscribeRes } from './dto/plate.dto';
import { FileInterceptor } from '@nestjs/platform-express';

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

  @Post('createNewPlate')
  @UseInterceptors(FileInterceptor('file'))
  createNewPlate(
    @UploadedFile() file: Express.Multer.File,
    @Body('id') uid: string,
    @Body('name') name: string,
    @Body('tag') tag: string,
    @Body('introduction') introduction: string
  ): Promise<createNewPlateRes> {
    return this.plateService.createNewPlate(file, uid, name, tag, introduction)
  }
}
