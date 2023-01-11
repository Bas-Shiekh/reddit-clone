import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Comments, Users } from '../index.models';

@Injectable()
export class CommentServices {
  constructor(
    @InjectModel(Comments) private commentRepository: typeof Comments,
  ) {}

  async comments(postId: number) {
    return this.commentRepository.findAll({
      where: { postId },
      include: [
        {
          model: Users,
          attributes: ['userImg', 'username'],
        },
      ],
    });
  }

  async addComment(commentData: any) {
    return this.commentRepository.create(commentData);
  }
}
