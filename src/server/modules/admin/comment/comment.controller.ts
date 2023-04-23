import { Body, Controller, Post } from '@nestjs/common';
import { CommentService } from './comment.service';
import { postCommentRes } from './dto/comment.dto';

@Controller('api/admin/comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) { }

  @Post('postComment')
  postComment(@Body('id') uid1: string, @Body('iid') iid: string, @Body('text') text: string): Promise<postCommentRes> {
    return this.commentService.postComment(uid1, iid, text)
  }

  @Post('postReply')
  postReply(@Body('cid') cid: string, @Body('text') text: string, @Body('id') id: string, @Body('iid') iid: string, @Body('uid2') uid2: string) {
    return this.commentService.postReply(cid, text, id, iid, uid2)
  }

  @Post('setLike')
  setLike(@Body('cid') cid: string, @Body('id') uid: string, @Body('owner') owner: string, @Body('flag') flag: boolean) {
    return this.commentService.setLike(cid, uid, owner, flag)
  }

  @Post('deleteReply')
  deleteReply(@Body('cid') cid: string) {
    return this.commentService.deleteReply(cid)
  }

  @Post('deleteComment')
  deleteComment(@Body('cid') cid: string) {
    return this.commentService.deleteComment(cid)
  }
}
