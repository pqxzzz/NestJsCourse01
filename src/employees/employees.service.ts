import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class EmployeesService {
  constructor(private readonly databaseService: DatabaseService) {} // 👈 Inject the DatabaseService into the Employees
  // pelo oq entendi databaseService é um objeto que tem metodos para interagir com o banco de dados e injetando ele no construtor da classe EmployeesService, a classe EmployeesService pode usar esses metodos para interagir com o banco de dados.

  async create(createEmployeeDto: Prisma.EmployeeCreateInput) {
    return this.databaseService.employee.create({ data: createEmployeeDto }); // 👈 Use the Prisma Client to create a new employee
  }

  async findAll(role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
    if (role) {
      return this.databaseService.employee.findMany({ where: { role: role } });
    } // 👈 Use the Prisma Client to find all employees
    return this.databaseService.employee.findMany();
  }

  async findOne(id: number) {
    return this.databaseService.employee.findUnique({ where: { id: id } }); // 👈 Use the Prisma Client to find an employee by ID
  }

  async update(id: number, updateEmployeeDto: Prisma.EmployeeUpdateInput) {
    return this.databaseService.employee.update({
      where: { id: id },
      data: updateEmployeeDto,
    }); // 👈 Use the Prisma Client to update an employee
  }

  async remove(id: number) {
    return this.databaseService.employee.delete({ where: { id: id } }); // 👈 Use the Prisma Client to delete an employee
  }
}
