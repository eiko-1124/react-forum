import { Body, Controller, Post } from '@nestjs/common';
import { InvitationService } from './invitation.service';
import { collectRes, likeRes, publishRes } from './dto/invitation.dto';

@Controller('api/admin/invitation')
export class InvitationController {
  constructor(private readonly invitationService: InvitationService) { }

  @Post('publish')
  publish(@Body('pid') pid: string, @Body('id') uid: string, @Body('title') title: string, @Body('text') text: string): Promise<publishRes> {
    return this.invitationService.publish(pid, uid, title, text)
  }

  @Post('setLike')
  setLike(@Body('id') uid: string, @Body('iid') iid: string, @Body('flag') flag: boolean, @Body('owner') owner: string): Promise<likeRes> {
    return this.invitationService.setLike(uid, iid, flag, owner)
  }

  @Post('setLike')
  setCollect(@Body('id') uid: string, @Body('iid') iid: string, @Body('flag') flag: boolean, @Body('floor') floor: number): Promise<collectRes> {
    return this.invitationService.setCollect(uid, iid, flag, floor)
  }
}
