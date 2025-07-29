import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
   app.enableCors({
    origin: '*',  // Allow all domains
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS', // Allowed HTTP methods
    credentials: true, // If you want to allow cookies/auth headers
  });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();