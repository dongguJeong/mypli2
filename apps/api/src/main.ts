import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { RedisStore } from 'connect-redis';
import { createClient } from 'redis';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import session from 'express-session';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);

  const redisClient = createClient({
    socket: {
      host: process.env.REDIS_HOST || 'redis',
      port: Number(process.env.REDIS_PORT) || 6379,
    },
  });
  redisClient.on('error', (err) => console.error('Redis Client Error', err));
  await redisClient.connect();

  const redisStore = new RedisStore({
    client: redisClient,
    prefix: 'mypli:',
  });

  app.use(
    session({
      store: redisStore, // ✅ new RedisStore() 로 생성한 인스턴스 사용
      secret: process.env.SESSION_SECRET || 'mypli-secret',
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true, // 클라이언트 JS 접근 방지
        secure: false, // 개발용: HTTPS가 아닐 때 false
        maxAge: 1000 * 60 * 60 * 24, // 1일
      },
    }),
  );

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('cats')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  app.enableCors({
    origin: ['http://localhost:5173'],
    credentials: true,
  });

  await app.listen(process.env.PORT || 3001);
  console.log(
    `🚀 Server running on http://localhost:${process.env.PORT || 3001}`,
  );
  console.log('✅ Swagger: http://localhost:3001/api/docs');
}
bootstrap();
