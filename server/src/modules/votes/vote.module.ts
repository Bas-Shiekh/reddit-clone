import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Votes } from './entities/votes.entity';
import { VoteController } from './vote.controller';
import { VoteServices } from './vote.service';

@Module({
  imports: [SequelizeModule.forFeature([Votes])],
  controllers: [VoteController],
  providers: [VoteServices],
  exports: [SequelizeModule],
})
export class VoteModule {}
