import { Module } from '@nestjs/common';
import { InvitationService } from './invitation.service';
import { InvitationController } from './invitation.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { invitation } from '#/entity/invitation.entity';
import { user } from '#/entity/user.entity';
import { plateSubscribe } from '#/entity/plateSubscribe.entity';
import { invitationHistory } from '#/entity/invitationHistory.entity';
import { invitationLike } from '#/entity/invitationLike.entity';
import { invitationCollect } from '#/entity/invitationCollect.entity';
import { commit } from '#/entity/commit.entity';
import { commitReply } from '#/entity/commitReply.entity';

@Module({
  imports: [TypeOrmModule.forFeature([invitation, user, plateSubscribe, invitationHistory, invitationLike, invitationCollect, commit, commitReply])],
  controllers: [InvitationController],
  providers: [InvitationService]
})
export class InvitationModule { }
