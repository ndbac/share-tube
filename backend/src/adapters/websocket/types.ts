export enum EWebsocketEventType {
  ON_NEW_SHARE = 'onNewShare',
}

export interface IOnNewShareEventPayload {
  id: string;
  title: string;
  description: string;
  sharedBy: {
    name: string;
    userId: string;
  };
}
