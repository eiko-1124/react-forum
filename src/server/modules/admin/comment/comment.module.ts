import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { invitation } from '#/entity/invitation.entity';
import { commit } from '#/entity/commit.entity';
import { user } from '#/entity/user.entity';
import { commitReply } from '#/entity/commitReply.entity';
import { NoticeService } from '../notice/notice.service';
import { userBlacklist } from '#/entity/userBlacklist.entity';
import { plateBlacklist } from '#/entity/plateBlacklist.entity';
import { commitLike } from '#/entity/commitLike.entity';

@Module({
  imports: [TypeOrmModule.forFeature([invitation, commit, user, commitReply, userBlacklist, plateBlacklist, commitLike])],
  controllers: [CommentController],
  providers: [CommentService, NoticeService]
})
export class CommentModule { }
