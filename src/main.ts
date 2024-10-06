import { NestFactory, HttpAdapterHost } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './all-exceptions.filter';

async function bootstrap() {
  // aqui inicia tudo da aplicação
  const app = await NestFactory.create(AppModule);

  const { httpAdapter } = app.get(HttpAdapterHost); // 👈 Get the HTTP adapter
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter)); // 👈 Use the custom exception filter

  app.enableCors(); // 👈 Enable CORS for everyone
  app.setGlobalPrefix('api'); // 👈 Set the global prefix to 'api'
  await app.listen(3001);
}
bootstrap();
