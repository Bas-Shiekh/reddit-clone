import {
  Table,
  Model,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  BelongsTo,
} from 'sequelize-typescript';
import { Votes, Users, Saves, Comments } from 'src/modules/index.models';
import { IPosts } from 'src/core/interfaces/index.interface';

@Table
export class Posts extends Model<IPosts> {
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  title: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  content: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  postImg: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  topicName: string;

  @ForeignKey(() => Users)
  userId: number;

  @BelongsTo(() => Users)
  user: Users;

  @HasMany(() => Comments)
  comments: Comments[];

  @HasMany(() => Votes)
  Votes: Posts[];

  @HasMany(() => Saves)
  saves: Saves[];
}
