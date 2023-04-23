import { Controller, Get, Query } from '@nestjs/common';
import { InvitationService } from './invitation.service';
import { TopRes, invitationRes } from './dto/invitation.dto';

@Controller('api/local/invitation')
export class InvitationController {
  constructor(private readonly invitationService: InvitationService) { }

  @Get('getTops')
  getTops(@Query('pid') pid: string): Promise<TopRes> {
    return this.invitationService.getTops(pid)
  }

  @Get('getInvitation')
  getInvitation(@Query('iid') iid: string, @Query('pid') pid: string): Promise<invitationRes> {
    return this.invitationService.getInvitation(iid, pid)
  }

  @Get('getSubstance')
  getSubstance(@Query('iid') iid: string, @Query('id') uid: string) {
    return this.invitationService.getSubstance(iid, uid)
  }

  @Get('getRote')
  getRote(@Query('id') uid: string, @Query('iid') iid: string) {
    return this.invitationService.getRote(uid, iid)
  }
}
