import { Module } from '@nestjs/common/decorators';
import { SequelizeModule } from '@nestjs/sequelize';
import { CommentsController } from './comment.controllers';
import { CommentServices } from './comment.service';
import { Comments } from './entities/comments.entity';

@Module({
  imports: [SequelizeModule.forFeature([Comments])],
  controllers: [CommentsController],
  providers: [CommentServices],
  exports: [SequelizeModule],
})
export class CommentModule {}
