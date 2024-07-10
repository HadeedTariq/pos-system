import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { connectToDb } from './dbConnection/connectToDb';
import { CustomExceptionFilter } from './exception.filter';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configureService = app.get(ConfigService);
  const port = configureService.get<number>('PORT');
  const clientUrl = configureService.get<string>('CLIENT_URL');

  app.enableCors({
    origin: clientUrl,
    credentials: true,
    exposedHeaders: ['Set-Cookie'],
  });
  app.use(cookieParser());
  app.useGlobalFilters(new CustomExceptionFilter());
  await app.listen(port);
  await connectToDb();
}
bootstrap();
