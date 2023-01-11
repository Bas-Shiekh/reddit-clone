import {
  Table,
  Model,
  DataType,
  Column,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { ISaves } from 'src/core/interfaces/index.interface';
import { Posts, Users } from 'src/modules/index.models';

@Table
export class Saves extends Model<ISaves> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  })
  id: number;

  @ForeignKey(() => Posts)
  postId: number;

  @BelongsTo(() => Posts)
  post: Posts;

  @ForeignKey(() => Users)
  userId: number;

  @BelongsTo(() => Users)
  user: Users;
}
