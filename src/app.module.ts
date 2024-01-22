import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersService } from './user/user.service';
import { UsersController } from './user/user.controller';
import { PrismaService } from './prisma/prisma.service';
import { PostsService } from './post/post.service';
import { PostsController } from './post/post.controller';

@Module({
  imports: [],
  controllers: [AppController, UsersController, PostsController],
  providers: [AppService, UsersService, PostsService, PrismaService],
})
export class AppModule {}
