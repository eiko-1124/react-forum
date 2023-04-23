import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { chat } from '#/entity/chat.entity';
import { user } from '#/entity/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([chat, user])],
  controllers: [ChatController],
  providers: [ChatService]
})
export class ChatModule { }
