import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import session from 'express-session';
import { RedisStore } from 'connect-redis';
import { createClient } from 'redis';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  /** 🧾 Swagger 설정 */
  const config = new DocumentBuilder()
    .setTitle('MyPLI API')
    .setDescription('My Playlist Intelligence API Docs')
    .setVersion('1.0')
    .addTag('mypli')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  /** 🧹 전역 ValidationPipe */
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  /** 🔌 Redis 클라이언트 설정 */
  const redisClient = createClient({
    socket: {
      host: process.env.REDIS_HOST || 'redis',
      port: Number(process.env.REDIS_PORT) || 6379,
    },
  });
  redisClient.on('error', (err) => console.error('Redis Client Error', err));
  await redisClient.connect();

  /** 🧱 RedisStore 생성 (✅ 최신 문법) */
  const redisStore = new RedisStore({
    client: redisClient,
    prefix: 'mypli:',
  });

  /** 🧠 세션 미들웨어 등록 */
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

  /** 🌐 CORS 설정 */
  app.enableCors({
    origin: 'http://localhost:8080',
    credentials: true, // ✅ 쿠키 전송 허용
  });

  await app.listen(process.env.PORT ?? 3000);
  console.log(
    `🚀 MyPLI API running on http://localhost:${process.env.PORT ?? 3000}`,
  );
}
bootstrap();
