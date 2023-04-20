import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { invitation } from '#/entity/invitation.entity';
import { commit } from '#/entity/commit.entity';
import { user } from '#/entity/user.entity';
import { commitReply } from '#/entity/commitReply.entity';

@Module({
  imports: [TypeOrmModule.forFeature([invitation, commit, user, commitReply])],
  controllers: [CommentController],
  providers: [CommentService]
})
export class CommentModule { }
