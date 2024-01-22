import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { UserDto } from './dto/user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findOne(params: { id: number }): Promise<User | null> {
    try {
      const { id } = params;
      const user = await this.prisma.user.findUnique({
        where: { id },
      });

      if (!user) {
        throw new Error('User not found');
      }

      return user;
    } catch (error) {
      console.error(error.message);
    }
  }

  async findAll(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async create(params: UserDto): Promise<User> {
    const { firstName, lastName } = params;

    return this.prisma.user.create({
      data: {
        firstName,
        lastName,
      },
    });
  }

  async update(params: {
    id: number;
    updateUserDto: UpdateUserDto;
  }): Promise<User> {
    const { id, updateUserDto } = params;
    const { firstName, lastName } = updateUserDto;

    return this.prisma.user.update({
      data: {
        firstName,
        lastName,
      },
      where: {
        id,
      },
    });
  }

  async delete(id: number): Promise<User> {
    return this.prisma.user.delete({
      where: { id },
    });
  }
}
