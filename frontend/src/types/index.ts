export interface IVideoShare {
  id: string;
  youtubeId: string;
  title: string;
  description: string;
  createdAt: string;
  user: {
    name: string;
    email: string;
    userId: string;
  };
}

export enum EWebsocketEventType {
  ON_NEW_SHARE = 'onNewShare',
}

export interface IOnNewShareEventPayload extends IVideoShare {}
