import { Body, Controller, Post } from '@nestjs/common';
import { InvitationService } from './invitation.service';
import { publishRes } from './dto/invitation.dto';

@Controller('api/invitation')
export class InvitationController {
  constructor(private readonly invitationService: InvitationService) { }

  @Post('/admin/publish')
  publish(@Body('pid') pid: string, @Body('id') uid: string, @Body('title') title: string, @Body('text') text: string): Promise<publishRes> {
    return this.invitationService.publish(pid, uid, title, text)
  }
}
