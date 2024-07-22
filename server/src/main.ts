import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { connectToDb } from './dbConnection/connectToDb';
import { CustomExceptionFilter } from './exception.filter';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { rawBody: true });
  const configureService = app.get(ConfigService);
  const port = configureService.get<number>('PORT');
  const clientUrl = configureService.get<string>('CLIENT_URL');

  app.enableCors({
    origin: [clientUrl, 'http://192.168.10.7:5173'],
    credentials: true,
    exposedHeaders: ['Set-Cookie'],
  });
  app.use(cookieParser());
  // app.use(passport.initialize());
  app.useGlobalFilters(new CustomExceptionFilter());
  await app.listen(port);
  await connectToDb();
}
bootstrap();
