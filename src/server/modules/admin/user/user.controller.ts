import { Body, Controller, Get, Post, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { getFriendsRes, getPlateBlackListRes, getUserBlackListRes, setAvatarRes, setFriendRes, setNameRes, setPlateBlackList, setUserBlackList, unFriendRes, unPlateBlackList, unUserBlackList, userInfoRes } from './dto/user.dto';
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

  @Get('getFriends')
  getFriends(@Query('id') uid: string): Promise<getFriendsRes> {
    return this.userService.getFrineds(uid)
  }

  @Post('unFriend')
  unFriend(@Body('uid1') uid1: string, @Body('uid2') uid2: string): Promise<unFriendRes> {
    return this.userService.unFriend(uid1, uid2)
  }

  @Post('setFriend')
  setFriend(@Body('uid1') uid1: string, @Body('uid2') uid2: string): Promise<setFriendRes> {
    return this.userService.setFriend(uid1, uid2)
  }

  @Get('getUserBlackList')
  getUserBlackList(@Query('id') uid: string): Promise<getUserBlackListRes> {
    return this.userService.getUserBlackList(uid)
  }

  @Post('unUserBlackList')
  unUserBlackList(@Body('uid1') uid1: string, @Body('uid2') uid2: string): Promise<unUserBlackList> {
    return this.userService.unUserBlackList(uid1, uid2)
  }

  @Post('setUserBlackList')
  setUserBlackList(@Body('uid1') uid1: string, @Body('uid2') uid2: string): Promise<setUserBlackList> {
    return this.userService.setUserBlackList(uid1, uid2)
  }

  @Get('getPlateBlackList')
  getPlateBlackList(@Query('id') uid: string): Promise<getPlateBlackListRes> {
    return this.userService.getPlateBlackList(uid)
  }

  @Post('unPlateBlackList')
  unPlateBlackList(@Body('uid') uid: string, @Body('pid') pid: string): Promise<unPlateBlackList> {
    return this.userService.unPlateBlackList(uid, pid)
  }

  @Post('setPlateBlackList')
  setPlateBlackList(@Body('uid') uid: string, @Body('pid') pid: string): Promise<setPlateBlackList> {
    return this.userService.setPlateBlackList(uid, pid)
  }
}
