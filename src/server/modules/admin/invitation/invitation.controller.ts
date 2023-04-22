import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { InvitationService } from './invitation.service';
import { adminInvitationRes, collectRes, deleteRes, getSubscribeInvitationRes, invitationDetailRes, likeRes, publishRes, updateInvitationRes } from './dto/invitation.dto';

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

  @Get('getAdminInvitationList')
  getAdminInvitationList(@Query('id') uid: string, @Query('page') page: number): Promise<adminInvitationRes> {
    return this.invitationService.getAdminInvitationList(uid, page)
  }

  @Post('deleteAdminInvitation')
  deleteAdminInvitation(@Body('iid') iid: string): Promise<deleteRes> {
    return this.invitationService.deleteAdminInvitation(iid)
  }

  @Get('getInvitationDetail')
  getInvitationDetail(@Query('iid') iid: string): Promise<invitationDetailRes> {
    return this.invitationService.getInvitationDetail(iid)
  }

  @Post('updateInvitation')
  updateInvitation(@Body('iid') iid: string, @Body('title') title: string, @Body('text') text: string): Promise<updateInvitationRes> {
    return this.invitationService.updateInvitation(iid, title, text)
  }

  @Get('getAdminHistoryList')
  getAdminHistoryList(@Query('id') uid: string, @Query('page') page: number): Promise<adminInvitationRes> {
    return this.invitationService.getAdminHistoryList(uid, page)
  }

  @Post('deleteAdminHistory')
  deleteAdminHistory(@Body('iid') iid: string): Promise<deleteRes> {
    return this.invitationService.deleteAdminHistory(iid)
  }

  @Get('getAdminCollectList')
  getAdminCollectList(@Query('id') uid: string, @Query('page') page: number): Promise<adminInvitationRes> {
    return this.invitationService.getAdminCollectList(uid, page)
  }

  @Post('deleteAdminCollect')
  deleteAdminCollect(@Body('iid') iid: string): Promise<deleteRes> {
    return this.invitationService.deleteAdminCollect(iid)
  }

  @Get('getSubscribeInvitation')
  getSubscribeInvitation(@Query('id') uid: string, @Query('page') page: number): Promise<getSubscribeInvitationRes> {
    return this.invitationService.getSubscribeInvitation(uid, page)
  }
}
