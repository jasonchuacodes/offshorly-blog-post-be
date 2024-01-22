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
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostsService } from './post.service';
import { Post as PostModel } from '@prisma/client';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  async findAll(): Promise<PostModel[] | null> {
    return await this.postsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<PostModel> {
    return await this.postsService.findOne({ id });
  }

  @Post()
  async create(@Body() createPostDto: CreatePostDto): Promise<PostModel> {
    try {
      const { authorId, post } = createPostDto;

      return await this.postsService.create({ authorId, post });
    } catch (e) {
      throw new Error(`Error: ${e.message}`);
    }
  }

  @Put(':id')
  async update(
    @Body() updatePostDto: UpdatePostDto,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<PostModel> {
    return await this.postsService.update({ id, updatePostDto });
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number): Promise<PostModel> {
    return await this.postsService.delete(id);
  }
}
