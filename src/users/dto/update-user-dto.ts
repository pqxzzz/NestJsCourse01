import { CreateUserDto } from './create-user-dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateUserDto extends PartialType(CreateUserDto) {}
// PartialType é um utilitário que cria um tipo que tem todas as propriedades de um tipo, mas todas são opcionais.
