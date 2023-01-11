import { Controller, Get } from '@nestjs/common';
import { Delete, Param, Post } from '@nestjs/common/decorators';
import { ParseIntPipe } from '@nestjs/common/pipes';
import { GetCurrentUserId } from '../auth/common/decorators';
import { SaveServices } from './save.service';

@Controller('save')
export class SaveController {
  constructor(private readonly saveServices: SaveServices) {}

  @Get()
  savePosts(@GetCurrentUserId() userId: number) {
    return this.saveServices.allSavePosts(userId);
  }

  @Post(':postId')
  addPosts(
    @Param('postId', ParseIntPipe) postId: number,
    @GetCurrentUserId() userId: number,
  ) {
    return this.saveServices.addPostToSave(userId, postId);
  }

  @Delete(':postId')
  deletePost(
    @Param('postId', ParseIntPipe) postId: number,
    @GetCurrentUserId() userId: number,
  ) {
    return this.saveServices.deletePostFromSave(userId, postId);
  }
}
