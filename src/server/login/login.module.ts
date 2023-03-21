import { Module } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginController } from './login.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { user } from '#/entity/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([user])],
  controllers: [LoginController],
  providers: [LoginService]
})
export class LoginModule { }
