import { Injectable } from '@nestjs/common';
import { Comment } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CommentDto } from './dto/comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { UsersService } from '../user/user.service';
import { PostsService } from '../post/post.service';

@Injectable()
export class CommentsService {
  constructor(
    private prisma: PrismaService,
    private readonly usersService: UsersService,
    private readonly postsService: PostsService,
  ) {}

  async findOne(params: { id: number }): Promise<Comment | null> {
    try {
      const { id } = params;
      const comment = await this.prisma.comment.findUnique({
        where: { id },
      });

      if (!comment) {
        throw new Error('Comment not found');
      }

      return comment;
    } catch (error) {
      console.error(error.message);
      throw new Error('Internal Server Error');
    }
  }

  async findAll(): Promise<Comment[]> {
    return this.prisma.comment.findMany();
  }

  async create(params: CommentDto): Promise<Comment> {
    const { authorId, postId, comment } = params;

    const user = await this.usersService.findOne({ id: authorId });
    const post = await this.postsService.findOne({ id: postId });

    if (!user || !post) return;

    return this.prisma.comment.create({
      data: {
        authorId,
        postId,
        comment,
      },
    });
  }

  async update(params: {
    id: number;
    updateCommentDto: UpdateCommentDto;
  }): Promise<Comment> {
    const { id, updateCommentDto } = params;
    const { comment } = updateCommentDto;

    return this.prisma.comment.update({
      data: {
        comment,
      },
      where: {
        id,
      },
    });
  }

  async delete(id: number): Promise<Comment> {
    return this.prisma.comment.delete({
      where: { id },
    });
  }
}
