import { MiddlewareConsumer, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NextModule } from './next/next.module';
import { AuthMiddleware } from '#/middleware/Auth.middleware';
import entity from './entity';
import { ApiModule } from './modules/api.module';
import { AppGateway } from './WebSocket/app.gateway';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '120.79.73.206',
      port: 3306,
      username: "dmeiko",
      password: "#Eiko1124",
      database: "forum_DB",
      entities: entity,
      synchronize: false
    }),
    ApiModule,
    NextModule
  ],
  providers: [AppGateway]
})
export class AppModule implements NextModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('api')
  }
}
