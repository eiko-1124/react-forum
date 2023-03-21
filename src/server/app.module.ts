import { MiddlewareConsumer, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoginModule } from './login/login.module';
import { NextModule } from './next/next.module';
import { user } from './entity/user.entity';
import { plate } from './entity/plate.entity';
import { PlateModule } from './plate/plate.module';
import { UploadModule } from './upload/upload.module';
import { upload } from './entity/upload.entity';
import { AuthMiddleware } from '#/middleware/Auth.middleware';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '120.79.73.206',
      port: 3306,
      username: "dmeiko",
      password: "#Eiko1124",
      database: "forum_DB",
      entities: [user, plate, upload],
      synchronize: false
    }),
    LoginModule,
    PlateModule,
    UploadModule,
    NextModule
  ],
})
export class AppModule implements NextModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('api')
  }
}