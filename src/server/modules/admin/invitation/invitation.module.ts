import { Module } from '@nestjs/common';
import { InvitationService } from './invitation.service';
import { InvitationController } from './invitation.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { invitation } from '#/entity/invitation.entity';
import { invitationLike } from '#/entity/invitationLike.entity';
import { invitationCollect } from '#/entity/invitationCollect.entity';
import { invitationHistory } from '#/entity/invitationHistory.entity';
import { plateBlacklist } from '#/entity/plateBlacklist.entity';
import { userBlacklist } from '#/entity/userBlacklist.entity';
import { NoticeService } from '../notice/notice.service';
import { commit } from '#/entity/commit.entity';
import { commitReply } from '#/entity/commitReply.entity';

@Module({
  imports: [TypeOrmModule.forFeature([invitation, invitationLike, invitationCollect, invitationHistory, plateBlacklist, userBlacklist, commit, commitReply])],
  controllers: [InvitationController],
  providers: [InvitationService, NoticeService]
})
export class InvitationModule { }
