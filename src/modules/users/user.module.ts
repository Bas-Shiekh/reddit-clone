import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Users } from '../index.models';
import { UserController } from './user.controller';
import { UserServices } from './user.service';

@Module({
  imports: [SequelizeModule.forFeature([Users])],
  controllers: [UserController],
  providers: [UserServices],
  exports: [SequelizeModule],
})
export class UserModule {}
