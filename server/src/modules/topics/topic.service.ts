import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Topics } from '../index.models';

@Injectable()
export class TopicServices {
  constructor(@InjectModel(Topics) private postRepository: typeof Topics) { }
  
  
}
