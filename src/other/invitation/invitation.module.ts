import { Module } from '@nestjs/common';
import { InvitationService } from './invitation.service';
import { InvitationController } from './invitation.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { invitation } from '#/entity/invitation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([invitation])],
  controllers: [InvitationController],
  providers: [InvitationService],
})
export class InvitationModule { }
