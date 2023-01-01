import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Topics } from './entities/topics.entity';
import { TopicController } from './topic.controller';
import { TopicServices } from './topic.service';

@Module({
  imports: [SequelizeModule.forFeature([Topics])],
  controllers: [TopicController],
  providers: [TopicServices],
  exports: [SequelizeModule],
})
export class TopicModule {}
