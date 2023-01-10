import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { CommentModule } from './comments/comment.module';
import { PostModule } from './posts/post.module';
import { SaveModule } from './saves/save.module';
import { UserModule } from './users/user.module';
import { VoteModule } from './votes/vote.module';

@Module({
  imports: [
    CommentModule,
    PostModule,
    UserModule,
    VoteModule,
    SaveModule,
    AuthModule,
  ],

  exports: [
    CommentModule,
    PostModule,
    UserModule,
    VoteModule,
    SaveModule,
    AuthModule,
  ],
})
export class Modules {}
