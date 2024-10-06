import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { EmployeesModule } from './employees/employees.module';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

@Module({
  // main module, que é o módulo raiz da aplicação
  imports: [
    UsersModule,
    DatabaseModule,
    EmployeesModule,
    ThrottlerModule.forRoot([
      {
        name: 'short',
        ttl: 100, // tempo de vida para cada requisição do cliente
        limit: 3, // limite de requisições
      },
      {
        name: 'long',
        ttl: 60000, // tempo de vida para cada requisição do cliente
        limit: 100, // limite de requisições
      },
    ]),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD, // 👈 Provide the ThrottlerGuard
      useClass: ThrottlerGuard, // 👈 Use the ThrottlerGuard
    },
  ],
})
export class AppModule {}
