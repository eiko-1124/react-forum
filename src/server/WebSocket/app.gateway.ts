import ac from '#/ac';
import { ChatService } from '#/modules/admin/chat/chat.service';
import { createId } from '#/utils';
import { Injectable } from '@nestjs/common';
import { WebSocketGateway, WebSocketServer, SubscribeMessage } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
@Injectable()
export class AppGateway {

    private clients: Map<string, Socket>

    constructor(private readonly chatService: ChatService) {
        this.clients = new Map()
    }

    @WebSocketServer()
    server: Server;

    handleDisconnect(client: Socket) {
        for (let [key, value] of this.clients) {
            if (value.id === client.id) {
                this.clients.delete(key)
                console.log(key, '断开了连接')
            }
        }
    }

    @SubscribeMessage('setId')
    handleId(client: Socket, payload: any): void {
        if (!payload) client.disconnect()
        this.clients.set(payload, client)
        console.log(payload, '加入了连接')
    }

    @SubscribeMessage('postMessage')
    async handleMessage(client: Socket, payload: any): Promise<void> {
        const hid = createId()
        const date = new Date()
        const user1 = await this.chatService.getChater(payload.uid1)
        const user2 = await this.chatService.getChater(payload.uid2)
        const data = {
            hid,
            uid2: user2.uid,
            name2: user2.name,
            avatar2: user2.avatar,
            uid1: user1.uid,
            name1: user1.name,
            avatar1: user1.avatar,
            text: ac.replace(payload.text),
            date: date
        }
        client.emit('postMessage', { res: 1, data })
        if (this.clients.has(payload.uid2)) {
            this.clients.get(payload.uid2).emit('newMessage', user1.uid)
        }
        this.chatService.setMessage({
            hid: data.hid,
            date: data.date,
            uid1: data.uid1,
            uid2: data.uid1,
            text: data.text,
            read: 0
        })
    }
}
