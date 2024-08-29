import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayInit,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';

@WebSocketGateway()
export class WebsocketGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  afterInit(): void {
    console.log('Socket server is running');
  }

  handleConnection(socket: Socket): void {
    console.log({ socketId: socket.id }, 'Socket connected');
  }

  handleDisconnect(socket: Socket): void {
    console.log({ socketId: socket.id }, 'Socket disconnected');
  }

  @SubscribeMessage('shares')
  onNewShare(socket: Socket) {
    console.log({ socketId: socket.id }, 'Socket received new share');
  }
}
