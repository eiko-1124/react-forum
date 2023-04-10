import { Body, Controller, Get, Post, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { PlateService } from './plate.service';
import { createNewPlateRes, detailsRes, simpleSearchRes } from './dto/plate.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('api/plate')
export class PlateController {
  constructor(private readonly plateService: PlateService) { }

  @Get('simpleSearch')
  simpleSearch(@Query('keyWord') keyWord: string): Promise<simpleSearchRes> {
    return this.plateService.simpleSearch(keyWord)
  }

  @Post('/admin/createNewPlate')
  @UseInterceptors(FileInterceptor('file'))
  createNewPlate(
    @UploadedFile() file: Express.Multer.File,
    @Body('id') id: string,
    @Body('name') name: string,
    @Body('tag') tag: string,
    @Body('introduction') introduction: string
  ): Promise<createNewPlateRes> {
    return this.plateService.createNewPlate(file, id, name, tag, introduction)
  }

  @Get('getDetails')
  getDetails(@Query('pid') id: string): Promise<detailsRes> {
    return this.plateService.getDetails(id)
  }
}
