import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
   app.enableCors({
    origin: '*',  // Allow all domains
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS', // Allowed HTTP methods
    credentials: true, // If you want to allow cookies/auth headers
  });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();