import { Injectable } from '@nestjs/common';
import { Post } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { PostDto } from './dto/post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { UsersService } from '../user/user.service';

@Injectable()
export class PostsService {
  constructor(
    private prisma: PrismaService,
    private readonly usersService: UsersService,
  ) {}

  async findOne(params: { id: number }): Promise<Post | null> {
    try {
      const { id } = params;
      const post = await this.prisma.post.findUnique({
        include: {
          comments: true,
        },
        where: { id },
      });

      if (!post) {
        throw new Error('Post not found');
      }

      return post;
    } catch (error) {
      console.error(error.message);
      throw new Error('Internal Server Error');
    }
  }

  async findAll(): Promise<Post[]> {
    return this.prisma.post.findMany({
      include: {
        comments: true,
      },
    });
  }

  async create(params: PostDto): Promise<Post> {
    const { post, authorId } = params;

    const user = await this.usersService.findOne({ id: authorId });

    if (!user) return;

    return this.prisma.post.create({
      data: {
        authorId,
        post,
      },
    });
  }

  async update(params: {
    id: number;
    updatePostDto: UpdatePostDto;
  }): Promise<Post> {
    const { id, updatePostDto } = params;
    const { post } = updatePostDto;

    return this.prisma.post.update({
      data: {
        post,
      },
      where: {
        id,
      },
    });
  }

  async delete(id: number): Promise<Post> {
    return this.prisma.post.delete({
      where: { id },
    });
  }
}
