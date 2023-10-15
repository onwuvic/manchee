import { Controller, Delete, UseGuards, Request, Get, Param } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':username')
  async findUserByUsername(@Param('username') username: string): Promise<User> {
    return this.userService.findUserByUsername(username);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete()
  async delete(@Request() req): Promise<string> {
    return this.userService.deleteById(req.user.id);
  }
}
