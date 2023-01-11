import { IsNotEmpty, MaxLength } from 'class-validator';

export class CreateCommentDto {
  @MaxLength(300)
  @IsNotEmpty()
  content: string;
}
