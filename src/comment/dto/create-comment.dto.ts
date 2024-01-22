import { IsNumber, IsString } from 'class-validator';

export class CreateCommentDto {
  @IsNumber()
  authorId: number;

  @IsNumber()
  postId: number;

  @IsString()
  comment: string;
}
