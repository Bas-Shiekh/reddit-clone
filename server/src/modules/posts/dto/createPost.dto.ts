import { IsNotEmpty, MaxLength, ValidateIf } from 'class-validator';

export class CreatePostDto {
  @MaxLength(300)
  title: string;

  @IsNotEmpty()
  content: string;

  @ValidateIf((object, value) => value !== null)
  postImg!: string | null;

  @ValidateIf((object, value) => value !== null)
  topicName!: string | null;
}
