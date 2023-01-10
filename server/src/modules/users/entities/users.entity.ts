import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import { Comments, Posts, Saves, Votes } from 'src/modules/index.models';
import { IUsers } from 'src/core/interfaces/index.interface';

@Table
export class Users extends Model<IUsers> {
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
  username: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  email: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  password: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  hashedRt: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
    defaultValue:
      'https://i.ibb.co/kKPN0DZ/kisspng-social-media-reddit-computer-icons-logo-reddit-logo-social-icon-5ab1498d75d271-0862203515215.png',
  })
  userImg: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  gender: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  bio: string;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  dateOfBirth: string;

  @HasMany(() => Posts)
  posts: Posts[];

  @HasMany(() => Votes)
  votes: Votes[];

  @HasMany(() => Comments)
  comments: Comments[];

  @HasMany(() => Saves)
  saves: Saves[];
}
