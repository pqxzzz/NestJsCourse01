import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user-dto';
import { UpdateUserDto } from './dto/update-user-dto';

@Injectable()
export class UsersService {
  private users = [
    {
      id: 1,
      name: 'John Doe',
      email: 'johnDoe@gmail.com',
      role: 'ADMIN',
    },
    {
      id: 2,
      name: 'Jane Doe',
      email: 'janedoe@gmail.com',
      role: 'INTERN',
    },
    {
      id: 3,
      name: 'Alice',
      email: 'alice@gmail.com',
      role: 'ENGINEER',
    },
    {
      id: 4,
      name: 'Bob',
      email: 'bob@inter.com',
      role: 'ADMIN',
    },
    {
      id: 5,
      name: 'Charlie',
      email: 'charlie@hahaha.com',
      role: 'INTERN',
    },
  ];

  findAll(role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
    if (role) {
      const rolesArray = this.users.filter((user) => user.role === role);
      if (rolesArray.length === 0) {
        throw new NotFoundException('Role not found!');
      }
      return rolesArray;
    }
    return this.users;
  }

  findOne(id: number) {
    const user = this.users.find((user) => user.id === id);
    if (!user) {
      throw new NotFoundException('User not found!');
    }

    return user;
  }

  create(user: CreateUserDto) {
    const usersByHighestId = [...this.users].sort((a, b) => b.id - a.id); // ordena pelo maior id
    const newUser = {
      id: usersByHighestId[0].id + 1, // pega o user com maior id e soma 1 para criar o novo usuario com id maior que o maior id
      ...user,
    };
    this.users.push(newUser);
  }

  update(id: number, updatedUser: UpdateUserDto) {
    this.users = this.users.map((user) => {
      if (user.id === id) {
        return { ...user, ...updatedUser }; // updatedUser overwrite o user com as informacoes que tem. Se nao tiver informacao, mantem a informacao do user
      }
      return user;
    });
    this.findOne(id); // dps de fazer o update retorna o usuario que foi atualizado
  }

  delete(id: number) {
    const removedUser = this.findOne(id);
    this.users = this.users.filter((user) => user.id !== id);
    return removedUser;
  }
}
