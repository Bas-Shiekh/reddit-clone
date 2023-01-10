import { Controller, Get } from '@nestjs/common';
import { Public } from '../auth/common/decorators';
import { PostServices } from './post.service';

@Controller('posts')
export class PostsController {
  constructor(private postServices: PostServices) {}

  @Public()
  @Get()
  allPosts() {
    return this.postServices.getAllPosts();
  }
}
