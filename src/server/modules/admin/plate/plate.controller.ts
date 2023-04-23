import { Body, Controller, Get, Post, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { PlateService } from './plate.service';
import { PreferenceRes, adminPlateRes, createNewPlateRes, isAdminRes, noteRes, setNoticeRes, subscribeRes, unRes } from './dto/plate.dto';
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

  @Get('getPreference')
  getPreference(@Query('id') uid: string): Promise<PreferenceRes> {
    return this.plateService.getPreference(uid)
  }

  @Get('getAdminPlates')
  getAdminPlates(@Query('id') uid: string): Promise<adminPlateRes> {
    return this.plateService.getAdminPlates(uid)
  }

  @Get('getAdminPlatesA')
  getAdminPlatesA(@Query('id') uid: string): Promise<adminPlateRes> {
    return this.plateService.getAdminPlatesA(uid)
  }

  @Get('getAdminPlatesO')
  getAdminPlatesO(@Query('id') uid: string) {
    return this.plateService.getAdminPlatesO(uid)
  }

  @Post('unAdmin1')
  unAdim1(@Body('uid') uid: string, @Body('pid') pid: string): Promise<unRes> {
    return this.plateService.unAdmin(uid, pid)
  }

  @Post('unAdmin2')
  unAdim2(@Body('uid') uid: string, @Body('pid') pid: string): Promise<unRes> {
    return this.plateService.unAdmin(uid, pid)
  }

  @Post('unSubscribe')
  unSubscribe(@Body('uid') uid: string, @Body('pid') pid: string): Promise<unRes> {
    return this.plateService.unSubscribe(uid, pid)
  }

  @Post('unOwner')
  unOwner(@Body('uid') uid: string, @Body('pid') pid: string): Promise<unRes> {
    return this.plateService.unOwner(uid, pid)
  }

  @Get('isAdmin')
  isAdmin(@Query('id') uid: string, @Query('pid') pid: string): Promise<isAdminRes> {
    return this.plateService.isAdmin(uid, pid)
  }

  @Post('setNotice')
  setNotice(@Body('pid') pid: string, @Body('notice') notice: string): Promise<setNoticeRes> {
    return this.plateService.setNotice(pid, notice)
  }
}
