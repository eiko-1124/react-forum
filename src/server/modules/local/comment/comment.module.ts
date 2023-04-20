import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { commit } from '#/entity/commit.entity';
import { user } from '#/entity/user.entity';
import { commitLike } from '#/entity/commitLike.entity';
import { commitReply } from '#/entity/commitReply.entity';
import { invitation } from '#/entity/invitation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([commit, user, commitLike, commitReply, invitation])],
  controllers: [CommentController],
  providers: [CommentService]
})
export class CommentModule { }
