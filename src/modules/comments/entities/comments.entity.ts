import {
  Model,
  Table,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { IComments } from 'src/core/interfaces/index.interface';
import { Posts, Users } from 'src/modules/index.models';

@Table
export class Comments extends Model<IComments> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  })
  id: number;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  content: string;

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
