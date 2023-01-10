import { Body, Controller, Get, Post } from '@nestjs/common';
import { GetCurrentUserId, Public } from '../auth/common/decorators';
import { CreatePostDto } from './dto/createPost.dto';
import { PostServices } from './post.service';

@Controller('posts')
export class PostsController {
  constructor(private postServices: PostServices) {}

  @Public()
  @Get()
  allPosts() {
    return this.postServices.getAllPosts();
  }

  @Post('submit')
  addPost(@Body() postData: CreatePostDto, @GetCurrentUserId() userId: number) {
    return this.postServices.addPost(postData, userId);
  }
}
