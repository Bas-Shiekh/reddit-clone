import {
  Table,
  Column,
  DataType,
  Model,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { IVotes } from 'src/core/interfaces/index.interface';
import { Posts, Users } from 'src/modules/index.models';

@Table
export class Votes extends Model<IVotes> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  })
  id: number;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: true,
    defaultValue: null,
  })
  status: boolean;

  @ForeignKey(() => Users)
  @Column
  userId: number;

  @BelongsTo(() => Users)
  user: Users;

  @ForeignKey(() => Posts)
  @Column
  postId: number;

  @BelongsTo(() => Posts)
  post: Posts;
}
