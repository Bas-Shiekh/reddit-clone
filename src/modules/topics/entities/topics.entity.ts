import { Model, DataType, Table, Column, HasMany } from 'sequelize-typescript';
import { ITopics } from 'src/core/interfaces/index.interface';
import { Posts } from 'src/modules/index.models';

@Table
export class Topics extends Model<ITopics> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @HasMany(() => Posts)
  posts: Posts[];
}
