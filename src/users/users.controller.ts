import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  ParseIntPipe,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user-dto';
import { UpdateUserDto } from './dto/update-user-dto';

@Controller('users') // Decorator que define o caminho base para todas as rotas dentro do controlador
export class UsersController {
  constructor(private readonly usersService: UsersService) {} // Injeta o UsersService no controlador. Cria uma instância de UsersService e a torna acessível em todos os métodos do controlador. Singleton: uma única instância de UsersService é compartilhada entre todos os módulos que a importam.

  @Get() //GET /users or /users?role=value&age=28
  findAll(@Query('role') role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
    return this.usersService.findAll(role);
  }
  // @Get('interns') // GET /users/interns EXEMPLO ROTA ESTATICA DEVE VIR ANTES DE ROTA DINAMICA!
  // findAllInterns() {
  //   return [];
  // }
  @Get(':id') // GET /users/:id
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(id); // passa id como numero pq recebe como param e todo param é string
  }
  @Post() // POST /users
  create(
    @Body(ValidationPipe)
    user: CreateUserDto,
  ) {
    return this.usersService.create(user);
  }
  @Patch(':id') // PATCH /users/:id <- atualiza apenas um campo e nao o objeto inteiro
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe)
    userupdate: UpdateUserDto,
  ) {
    return this.usersService.update(id, userupdate);
  }

  @Delete(':id') // DELETE /users/:id
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.delete(id);
  }
}
