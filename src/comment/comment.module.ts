import { Module } from '@nestjs/common';
import { CommentsController } from './comment.controller';
import { CommentsService } from './comment.service';
import { PrismaService } from '../prisma/prisma.service';
import { UsersService } from '../user/user.service';
import { PostsService } from '../post/post.service';

@Module({
  controllers: [CommentsController],
  providers: [CommentsService, PrismaService, UsersService, PostsService],
})
export class CommentsModule {}
