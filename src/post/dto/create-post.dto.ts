import { IsNumber, IsString } from 'class-validator';

export class CreatePostDto {
  @IsNumber()
  authorId: number;

  @IsString()
  post: string;
}
