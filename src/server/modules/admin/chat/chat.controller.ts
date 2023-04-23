import { Controller, Get, Query } from '@nestjs/common';
import { ChatService } from './chat.service';
import { chatUserRes, historyRes, newChatRes, unReadRes } from './dto/chat.dto';

@Controller('api/admin/chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) { }

  @Get('getChat')
  getChat(@Query('id') uid: string): Promise<chatUserRes> {
    return this.chatService.getChat(uid)
  }

  @Get('getUnRead')
  getUnRead(@Query('id') uid2: string, @Query('uid') uid1: string): Promise<unReadRes> {
    return this.chatService.getUnRead(uid1, uid2)
  }

  @Get('getHistory')
  getHistory(@Query('id') uid1: string, @Query('uid') uid2: string, @Query('date') date: string): Promise<historyRes> {
    return this.chatService.getHistory(uid1, uid2, date)
  }

  @Get('getNewChat')
  getNewChat(@Query('uid') uid: string): Promise<newChatRes> {
    return this.chatService.getNewChat(uid)
  }
}
