import { Body, Controller, Get, Post } from '@nestjs/common';
import { Public } from '../auth/common/decorators';
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

  @Post()
  addPost(@Body() postData: CreatePostDto) {
    return postData;
  }
}
