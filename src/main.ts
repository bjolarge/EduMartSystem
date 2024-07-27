import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import *as cookieParser from 'cookie-parser';
import { ConfigService } from "@nestjs/config";
import { ValidationPipe } from '@nestjs/common';
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist:true,
      transform:true,
      forbidNonWhitelisted:true,
      transformOptions:{
      enableImplicitConversion:true,
      }
    })
  );
  const options = new DocumentBuilder()
  .setTitle('NewFoundationApp')
  .setDescription('Voters and Judge platform')
  .setVersion('1.0')
  .build();
const document = SwaggerModule.createDocument(app, options);
SwaggerModule.setup('api', app, document);
const configService = app.get(ConfigService);
const PORT = +configService.get<number>("PORT")||3000;
await app.listen(PORT);
}
bootstrap();
