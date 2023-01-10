import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Posts } from '../index.models';
import { CreatePostDto } from './dto/createPost.dto';

@Injectable()
export class PostServices {
  constructor(@InjectModel(Posts) private postRepository: typeof Posts) {}

  async getAllPosts() {
    return await this.postRepository.findAll();
  }

  async addPost(postData: CreatePostDto, userId: number) {
    const isSubmit = await this.postRepository.create({ ...postData, userId });
    if (!isSubmit)
      throw new HttpException('Something went wrong', HttpStatus.BAD_REQUEST);
    return { data: isSubmit, message: 'Created post successfully' };
  }
}
