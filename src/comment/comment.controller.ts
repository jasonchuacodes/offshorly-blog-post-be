import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Put,
  Post,
} from '@nestjs/common';
import { CommentsService } from './comment.service';
import { Comment } from '@prisma/client';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { CreateCommentDto } from './dto/create-comment.dto';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get()
  async findAll(): Promise<Comment[] | null> {
    return await this.commentsService.findAll();
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Comment | null> {
    return await this.commentsService.findOne({ id });
  }

  @Post()
  async create(@Body() createCommentDto: CreateCommentDto): Promise<Comment> {
    try {
      const { postId, authorId, comment } = createCommentDto;

      return await this.commentsService.create({ comment, authorId, postId });
    } catch (e) {
      throw new Error(`Error: ${e.message}`);
    }
  }

  @Put(':id')
  async update(
    @Body() updateCommentDto: UpdateCommentDto,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Comment> {
    return await this.commentsService.update({ id, updateCommentDto });
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number): Promise<Comment> {
    return await this.commentsService.delete(id);
  }
}
