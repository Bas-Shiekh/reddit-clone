import { IsNotEmpty, MaxLength } from 'class-validator';

export class CreatePostDto {
  @MaxLength(300)
  title: string;

  @IsNotEmpty()
  content: string;
}
