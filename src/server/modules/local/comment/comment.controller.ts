import { Controller, Get, Query } from '@nestjs/common';
import { CommentService } from './comment.service';
import { commentsRes } from './dto/comment.dto';

@Controller('api/local/comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) { }

  @Get('getComment')
  getComments(@Query('iid') iid: string, @Query('pid') pid: string, @Query('id') id: string, @Query('page') page: number, @Query('floor') floor: number): Promise<commentsRes> {
    return this.commentService.getComments(iid, id, pid, page, floor)
  }

  @Get('getReplys')
  getReplys(@Query('cid') cid: string, @Query('page') page: number) {
    return this.commentService.getReplys(cid, page)
  }
}
