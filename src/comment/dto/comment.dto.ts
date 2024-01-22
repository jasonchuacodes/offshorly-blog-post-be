import { ApiProperty } from '@nestjs/swagger';

export class CommentDto {
  @ApiProperty()
  authorId: number;

  @ApiProperty()
  postId: number;

  @ApiProperty()
  comment: string;
}
