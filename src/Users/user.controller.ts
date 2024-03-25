import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './interface/user.interface';
import { CreateUserDTO } from './dto/CreateUser.dto';
import { UpdateUserDTO } from './dto/UpdateUser.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getUsers(): User[] {
    return this.userService.getUsers();
  }

  @Post()
  createUser(@Body() user: CreateUserDTO): User {
    return this.userService.createUser(user);
  }

  @Get(':id')
  getUser(@Param('id', new ParseUUIDPipe()) id: string): User {
    return this.userService.getUser(id);
  }

  @Delete(':id')
  @HttpCode(204)
  deleteUser(@Param('id', new ParseUUIDPipe()) id: string): void {
    return this.userService.deleteUser(id);
  }

  @Put(':id')
  updateUser(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() track: UpdateUserDTO,
  ): User {
    return this.userService.updateUser(id, track);
  }
}
