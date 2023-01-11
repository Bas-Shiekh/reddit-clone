import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize';
import { Comments, Posts, Users } from '../index.models';
import { CreatePostDto } from './dto/createPost.dto';

@Injectable()
export class PostServices {
  constructor(@InjectModel(Posts) private postRepository: typeof Posts) {}

  async getAllPosts() {
    const postData = await this.postRepository.findAll({
      include: [
        {
          model: Users,
          attributes: ['username', 'userImg'],
        },
        {
          model: Comments,
        },
      ],
    });

    return postData.map((post) => {
      return {
        id: post.id,
        commentsCount: post.comments.length,
        title: post.title,
        content: post.content,
        postImg: post.postImg,
        user: post.user,
        userId: post.userId,
        createdAt: post.createdAt,
        updatedAt: post.updatedAt,
      };
    });
  }

  async addPost(postData: CreatePostDto, userId: number) {
    const isSubmit = await this.postRepository.create({ ...postData, userId });
    if (!isSubmit)
      throw new HttpException('Something went wrong', HttpStatus.BAD_REQUEST);
    return { data: isSubmit, message: 'Created post successfully' };
  }
}
