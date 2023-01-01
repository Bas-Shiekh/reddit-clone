import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Saves } from './entities/saves.entity';
import { SaveController } from './save.controller';
import { SaveServices } from './save.service';

@Module({
  imports: [SequelizeModule.forFeature([Saves])],
  controllers: [SaveController],
  providers: [SaveServices],
  exports: [SequelizeModule],
})
export class SaveModule {}
