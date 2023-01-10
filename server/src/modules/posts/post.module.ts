import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Posts } from './entities/posts.entity';
import { PostsController } from './post.controllers';
import { PostServices } from './post.service';

@Module({
  imports: [SequelizeModule.forFeature([Posts])],
  controllers: [PostsController],
  providers: [PostServices],
  exports: [SequelizeModule],
})
export class PostModule {}
