import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { user } from '#/entity/user.entity';
import { invitation } from '#/entity/invitation.entity';
import { commitLike } from '#/entity/commitLike.entity';
import { invitationLike } from '#/entity/invitationLike.entity';
import { commit } from '#/entity/commit.entity';
import { commitReply } from '#/entity/commitReply.entity';
import { userFans } from '#/entity/userFans.entity';
import { upload } from '#/entity/upload.entity';
import { plate } from '#/entity/plate.entity';
import { userBlacklist } from '#/entity/userBlacklist.entity';
import { plateBlacklist } from '#/entity/plateBlacklist.entity';

@Module({
  imports: [TypeOrmModule.forFeature([user, invitation, commitLike, invitationLike, commit, commitReply, userFans, upload, plate, userBlacklist, plateBlacklist])],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule { }
