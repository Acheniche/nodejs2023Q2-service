import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { User } from "./interface/user.interface";
import { CreateUserDTO } from "./dto/CreateUser.dto";
import { validate as uuidValidate, v4 as uuidv4 } from 'uuid';
import { UpdateUserDTO } from "./dto/UpdateUser.dto";

@Injectable()

export class UserService {
    users: User[] = [];

    getUsers(): User[] {
        return this.users;
      }

    createUser(dto: CreateUserDTO): User {
        const user = {
          id: uuidv4(),
          ...dto,
          version: 1,
          createdAt: +new Date(),
          updatedAt: +new Date(),
        };
        this.users.push(user);
        const response = { ...user };
        delete response.password;
        return response;
    }

    getUser(id: string): User {
        if (!uuidValidate(id)) {
            throw new BadRequestException('Not Valid');
        }
        const findUser = this.users.find((user) =>
        user.id === id
        );
        if (!findUser) {
            throw new NotFoundException('Not Found');
        }
        return findUser;
    }

    deleteUser(id: string): void {
        if (!uuidValidate(id)) {
            throw new BadRequestException('Not Valid');
        }
        const findUser = this.users.find((user) =>
        user.id === id
        );
        if (!findUser) {
            throw new NotFoundException('Not Found');
        }
        this.users = this.users.filter((user) => 
        user.id !== id
        );
    }

    updateUser(id: string, dto: UpdateUserDTO): User {
        if (!uuidValidate(id)) {
            throw new BadRequestException('Not Valid');
        }
        const findUser = this.users.find((user) => 
        user.id === id
        );
        if (!findUser) {
            throw new NotFoundException('Not Found');
        }
        if (dto.oldPassword !== findUser.password) {
          throw new ForbiddenException('Password is not correct');
        }
        const updatedUser = {
          ...findUser,
          password: dto.newPassword,
          version: findUser.version + 1,
          updatedAt: +new Date(),
        };
        this.users = this.users.map((user) =>
          user.id === id ? updatedUser : user,
        );
        const response = { ...updatedUser };
        delete response.password;
        return response;
      }
}