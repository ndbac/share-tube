import { Test, TestingModule } from '@nestjs/testing';
import { Server, Socket } from 'socket.io';
import {
  IOnNewShareEventPayload,
  EWebsocketEventType,
} from 'src/adapters/websocket/types';
import { WebsocketGateway } from 'src/adapters/websocket/websocket.gateway';

describe('WebsocketGateway', () => {
  let gateway: WebsocketGateway;
  let server: Server;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WebsocketGateway],
    }).compile();

    gateway = module.get<WebsocketGateway>(WebsocketGateway);
    server = { emit: jest.fn() } as unknown as Server;
    gateway.server = server;
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });

  it('should log after initialization', () => {
    console.log = jest.fn();
    gateway.afterInit();
    expect(console.log).toHaveBeenCalledWith('Socket server is running');
  });

  it('should log on connection', () => {
    console.log = jest.fn();
    const socket = { id: '123' } as Socket;
    gateway.handleConnection(socket);
    expect(console.log).toHaveBeenCalledWith(
      { socketId: '123' },
      'Socket connected',
    );
  });

  it('should log on disconnection', () => {
    console.log = jest.fn();
    const socket = { id: '123' } as Socket;
    gateway.handleDisconnect(socket);
    expect(console.log).toHaveBeenCalledWith(
      { socketId: '123' },
      'Socket disconnected',
    );
  });

  it('should to ping with pong', (done) => {
    const result = gateway.ping();
    const expectedResponses = [
      { event: 'pong', data: 1 },
      { event: 'pong', data: 2 },
      { event: 'pong', data: 3 },
    ];

    result.subscribe({
      next: (response) => {
        expect(response).toEqual(expectedResponses.shift());
      },
      complete: () => {
        expect(expectedResponses.length).toBe(0);
        done();
      },
    });
  });

  it('should emit video shared event', () => {
    const payload: IOnNewShareEventPayload = {
      id: 'share123',
      title: 'Sample Video',
      description: 'This is a sample video description',
      sharedBy: {
        name: 'John Doe',
        userId: 'user123',
      },
    };
    gateway.sendVideoSharedEvent(payload);
    expect(server.emit).toHaveBeenCalledWith(
      EWebsocketEventType.ON_NEW_SHARE,
      payload,
    );
  });
});
