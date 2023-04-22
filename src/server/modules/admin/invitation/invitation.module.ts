import { Module } from '@nestjs/common';
import { InvitationService } from './invitation.service';
import { InvitationController } from './invitation.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { invitation } from '#/entity/invitation.entity';
import { invitationLike } from '#/entity/invitationLike.entity';
import { invitationCollect } from '#/entity/invitationCollect.entity';
import { invitationHistory } from '#/entity/invitationHistory.entity';

@Module({
  imports: [TypeOrmModule.forFeature([invitation, invitationLike, invitationCollect, invitationHistory])],
  controllers: [InvitationController],
  providers: [InvitationService]
})
export class InvitationModule { }
