import { EWebsocketEventType, IOnNewShareEventPayload } from "@/types";
import { io, Socket } from "socket.io-client";

class SocketService {
  private socket: Socket | null = null;

  connect() {
    this.socket = io(
      process.env.NEXT_PUBLIC_SOCKET_URL!,
      {
        transports: ["websocket"],
      }
    );

    this.socket.on("connect", () => {
      console.log("Connected to socket server");
    });

    this.socket.on("disconnect", () => {
      console.log("Disconnected from socket server");
    });
  }

  onNewShare(callback: (payload: IOnNewShareEventPayload) => void) {
    if (this.socket) {
      this.socket.on(EWebsocketEventType.ON_NEW_SHARE, callback);
    }
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }
}

export const socketService = new SocketService();
