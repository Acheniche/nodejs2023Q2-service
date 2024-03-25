import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from './entity/user.entity';
import { CreateUserDTO } from './dto/CreateUser.dto';
import { UpdateUserDTO } from './dto/UpdateUser.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getUsers() {
    const users = await this.userRepository.find();
    return users.map((user) => user.toResponse());
  }

  async createUser(userDto: CreateUserDTO) {
    const createdUser = this.userRepository.create(userDto);
    return (await this.userRepository.save(createdUser)).toResponse();
  }

  async getUser(id: string) {
    const findUser = await this.userRepository.findOneBy({ id });
    if (!findUser) {
      throw new NotFoundException('Not Found');
    }
    return findUser.toResponse();
  }

  async deleteUser(id: string) {
    const findUser = await this.userRepository.findOneBy({ id });
    if (!findUser) {
      throw new NotFoundException('Not Found');
    }
    await this.userRepository.delete(id);
  }

  async updateUser(id: string, dto: UpdateUserDTO) {
    const findUser = await this.userRepository.findOneBy({ id });
    if (!findUser) {
      throw new NotFoundException('Not Found');
    }
    if (dto.oldPassword !== findUser.password) {
      throw new ForbiddenException('Password is not correct');
    }
    findUser.password = dto.newPassword;
    return (await this.userRepository.save(findUser)).toResponse();
  }
}
