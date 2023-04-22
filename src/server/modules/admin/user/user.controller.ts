import { Body, Controller, Get, Post, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { setAvatarRes, setNameRes, userInfoRes } from './dto/user.dto';
import { UserService } from './user.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('api/admin/user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get('getUserInfo')
  getUserInfo(@Query('id') id: string): Promise<userInfoRes> {
    return this.userService.getUserInfo(id)
  }

  @Post('setName')
  setName(
    @Body('id') uid: string,
    @Body('name') name: string
  ): Promise<setNameRes> {
    return this.userService.setName(uid, name)
  }

  @Post('setAvatar')
  @UseInterceptors(FileInterceptor('file'))
  createNewPlate(
    @UploadedFile() file: Express.Multer.File,
    @Body('id') uid: string,
  ): Promise<setAvatarRes> {
    return this.userService.setAvatar(file, uid)
  }
}
