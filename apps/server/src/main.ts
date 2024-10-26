import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';
import {
  ExpressAdapter,
  NestExpressApplication,
} from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import { ResponseInterceptor } from './interceptor/response.interceptor';
import { Reflector } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
    new ExpressAdapter(),
    {
      cors: {
        origin: ['http://localhost:3000', '*'],
        credentials: true,
      },
    },
  );

  const configService = app.get(ConfigService);
  const reflector = app.get(Reflector);

  const globalPrefix = configService.get<string>('API_PREFIX') || 'api/v1';
  app.setGlobalPrefix(globalPrefix);

  app.useGlobalInterceptors(new ResponseInterceptor(reflector));

  const COOKIE_SECRET = configService.get<string>('COOKIE_SECRET');
  const PORT = configService.get<string>('PORT') || 8386;
  const HOST = configService.get<string>('HOST') || '0.0.0.0';
  app.use(cookieParser(COOKIE_SECRET));
  const config = new DocumentBuilder()
    .setTitle('Kapi - Learn Japanese')
    .setDescription('Kapi helps you learn Japanese naturally and effectively')
    .addCookieAuth()
    .setVersion('1.0')
    .addTag('Kapi')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(PORT, HOST);
}

bootstrap();
