import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Comments } from '../index.models';

@Injectable()
export class CommentServices {
  constructor(
    @InjectModel(Comments) private commentRepository: typeof Comments,
  ) {}

  async comments(postId: number) {
    return this.commentRepository.findAll({ where: { postId } });
  }

  async addComment(commentData: any) {
    return this.commentRepository.create(commentData);
  }
}
