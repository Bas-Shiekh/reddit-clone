import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import sequelize from 'sequelize';
import { Votes } from '../index.models';

@Injectable()
export class VoteServices {
  constructor(@InjectModel(Votes) private voteRepository: typeof Votes) {}

  async addUpVote(postId: number, userId: number) {
    const isVoted = await this.voteRepository
      .findOne({ where: { postId, userId } })
      .then(function (obj) {
        // update
        if (obj) return obj.update({ status: 1 });
        // insert
      });
    if (isVoted) return isVoted;
    return this.voteRepository.create({ postId, userId, status: 1 });
  }

  async addDownVote(postId: number, userId: number) {
    const isVoted = await this.voteRepository
      .findOne({ where: { postId, userId } })
      .then(function (obj) {
        // update
        if (obj) return obj.update({ status: -1 });
        // insert
      });
    if (isVoted) return isVoted;
    return this.voteRepository.create({ postId, userId, status: -1 });
  }

  async votesByPostId(postId: number) {
    return await this.voteRepository.findAll({
      where: { postId },
      attributes: [
        [sequelize.fn('sum', sequelize.col('postId')), 'totalVotes'],
      ],
      group: ['postId'],
    });
  }
}
