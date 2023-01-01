import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Posts } from '../index.models';

@Injectable()
export class PostServices {
  constructor(@InjectModel(Posts) private postRepository: typeof Posts) {}

  async getAllPosts() {
    return await this.postRepository.findAll();
  }
}
