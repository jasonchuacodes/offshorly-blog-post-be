import { ApiProperty } from '@nestjs/swagger';

export class PostDto {
  @ApiProperty()
  authorId: number;

  @ApiProperty()
  post: string;
}
