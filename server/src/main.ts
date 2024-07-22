import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { connectToDb } from './dbConnection/connectToDb';
import { CustomExceptionFilter } from './exception.filter';
import * as cookieParser from 'cookie-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

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
  app.useGlobalFilters(new CustomExceptionFilter());

  const config = new DocumentBuilder()
    .setTitle('QuickSell API')
    .setDescription('Quick Sell Api a pos system')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(port);
  await connectToDb();
}
bootstrap();
