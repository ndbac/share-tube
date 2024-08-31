import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayInit,
  WsResponse,
} from '@nestjs/websockets';
import { Observable, from, map } from 'rxjs';
import { Socket, Server } from 'socket.io';
import { EWebsocketEventType, IOnNewShareEventPayload } from './types';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
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

  @SubscribeMessage('ping')
  ping(): Observable<WsResponse<number>> {
    return from([1, 2, 3]).pipe(map((item) => ({ event: 'pong', data: item })));
  }

  sendVideoSharedEvent(payload: IOnNewShareEventPayload) {
    this.sendEvent(EWebsocketEventType.ON_NEW_SHARE, payload);
  }

  private sendEvent(eventType: EWebsocketEventType, payload: any) {
    this.server.emit(eventType, payload);
  }
}
