import { Controller } from '@nestjs/common';
import { Body, Get, Param, Post } from '@nestjs/common/decorators';
import { GetCurrentUserId } from '../auth/common/decorators';
import { CommentServices } from './comment.service';

@Controller('comments')
export class CommentsController {
  constructor(private commentServices: CommentServices) {}

  @Get(':postId')
  allComments(@Param('postId') postId: number) {
    return this.commentServices.comments(Number(postId));
  }

  @Post(':postId/create')
  addComment(
    @Body() commentData: any,
    @Param('postId') postId: number,
    @GetCurrentUserId() userId: number,
  ) {
    return this.commentServices.addComment({ ...commentData, postId, userId });
  }
}
