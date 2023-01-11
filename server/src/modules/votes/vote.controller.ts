import { Controller, ParseIntPipe } from '@nestjs/common';
import { Get, Param, Post } from '@nestjs/common/decorators';
import { GetCurrentUserId, Public } from '../auth/common/decorators';
import { VoteServices } from './vote.service';

@Controller('post/:postId/vote')
export class VoteController {
  constructor(private voteServices: VoteServices) {}

  @Post('up')
  upVote(
    @Param('postId', ParseIntPipe) postId: number,
    @GetCurrentUserId() userId: number,
  ) {
    return this.voteServices.addUpVote(postId, userId);
  }

  @Post('down')
  downVote(
    @Param('postId', ParseIntPipe) postId: number,
    @GetCurrentUserId() userId: number,
  ) {
    return this.voteServices.addDownVote(postId, userId);
  }

  @Public()
  @Get()
  votes(@Param('postId', ParseIntPipe) postId: number) {
    return this.voteServices.votesByPostId(postId);
  }
}
