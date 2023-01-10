import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Posts } from '../index.models';
import { CreatePostDto } from './dto/createPost.dto';

@Injectable()
export class PostServices {
  constructor(@InjectModel(Posts) private postRepository: typeof Posts) {}

  async getAllPosts() {
    return await this.postRepository.findAll();
  }

  async addPost(postData: CreatePostDto) {
    return await this.postRepository.create(postData);
  }
}
