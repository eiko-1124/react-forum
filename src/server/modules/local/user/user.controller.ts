import { Controller, Get, Query } from '@nestjs/common';
import { userInfoRes } from './dto/user.dto';
import { UserService } from './user.service';

@Controller('api/local/user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get('getUserInfo')
  getUserInfo(@Query('id') id: string): Promise<userInfoRes> {
    return this.userService.getUserInfo(id)
  }

  @Get('test')
  test() {
    return this.userService.queryFans('')
  }
}
