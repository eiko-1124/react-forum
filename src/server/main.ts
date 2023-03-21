import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path'
import cookieParser from 'cookie-parser'
import nextServer from './next.app';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets(join(__dirname, '..', 'public'), {
    prefix: '/static/',   //设置虚拟路径
  });
  app.use(cookieParser('lysname'))
  await app.listen(3000);
}

nextServer.prepare().then(() => {
  bootstrap()
})
