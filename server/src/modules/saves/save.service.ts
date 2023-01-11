import { Injectable } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import { HttpException } from '@nestjs/common/exceptions';
import { InjectModel } from '@nestjs/sequelize';
import { Posts, Saves, Users } from '../index.models';

@Injectable()
export class SaveServices {
  constructor(@InjectModel(Saves) private saveRepository: typeof Saves) {}

  async allSavePosts(userId: number) {
    return await this.saveRepository.findAll({
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'id', 'postId', 'userId'],
      },
      where: { userId },
      include: [
        {
          model: Posts,
          include: [
            {
              model: Users,
              attributes: ['userImg', 'username'],
            },
          ],
        },
      ],
    });
  }

  async addPostToSave(userId: number, postId: number) {
    const isAddedPost = await this.saveRepository.findOrCreate({
      where: { userId },
      defaults: { userId, postId },
    });

    if (!isAddedPost)
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);

    return { data: isAddedPost, message: 'Post was added to save list' };
  }

  async deletePostFromSave(userId: number, postId: number) {
    const isDeletedPost = await this.saveRepository.destroy({
      where: { userId, postId },
    });

    if (!isDeletedPost)
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);

    return { data: isDeletedPost, message: 'Post was removed from save list' };
  }
}
