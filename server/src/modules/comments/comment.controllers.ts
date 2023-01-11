import { Controller } from '@nestjs/common';
import { Body, Get, Param, Post } from '@nestjs/common/decorators';
import { GetCurrentUserId, Public } from '../auth/common/decorators';
import { CommentServices } from './comment.service';

@Controller('comments')
export class CommentsController {
  constructor(private commentServices: CommentServices) {}

  @Public()
  @Get(':postId')
  allComments(@Param('postId') postId: number) {
    return this.commentServices.comments(Number(postId));
  }

  @Post(':postId/create')
  addComment(
    @Body('content') content: string,
    @Param('postId') postId: number,
    @GetCurrentUserId() userId: number,
  ) {
    console.log(content)
    return this.commentServices.addComment({ content, postId, userId });
  }
}
