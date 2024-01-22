import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { UsersService } from './user.service';
import { User } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll(): Promise<User[] | null> {
    return await this.usersService.users();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return await this.usersService.user({ id });
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    const { firstName, lastName } = createUserDto;

    return await this.usersService.createUser({ firstName, lastName });
  }

  @Put(':id')
  async update(
    @Body() updateUserDto: UpdateUserDto,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<User> {
    return await this.usersService.updateUser({ id, updateUserDto });
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return await this.usersService.deleteUser(id);
  }
}
