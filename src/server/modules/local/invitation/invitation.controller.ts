import { Controller, Get, Query } from '@nestjs/common';
import { InvitationService } from './invitation.service';
import { TopRes } from './dto/invitation.dto';

@Controller('api/local/invitation')
export class InvitationController {
  constructor(private readonly invitationService: InvitationService) { }

  @Get('getTops')
  getTops(@Query('pid') pid: string): Promise<TopRes> {
    return this.invitationService.getTops(pid)
  }
}
