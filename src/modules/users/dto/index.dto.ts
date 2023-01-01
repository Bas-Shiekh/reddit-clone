import { IsNotEmpty } from 'class-validator';

export class BioDto {
  @IsNotEmpty()
  bio: string;
}
