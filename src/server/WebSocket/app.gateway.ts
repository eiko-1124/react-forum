import { WebSocketGateway, WebSocketServer, SubscribeMessage } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class AppGateway {
    @WebSocketServer()
    server: Server;

    onModuleInit() {
        this.server.on('connection', (socket: Socket) => {
            console.log('New client connected', socket.id);
            // 处理连接事件，例如发送欢迎消息等
        });
    }

    handleDisconnect(client: Socket) {
        console.log(`Client disconnected: ${client.id}`);
    }

    @SubscribeMessage('message')
    handleMessage(client: any, payload: any): string {
        client.send(payload)
        return 'Hello world!';
    }
}
