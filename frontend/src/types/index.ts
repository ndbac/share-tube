export interface IVideoShare {
  id: number;
  youtubeId: string;
  title: string;
  description: string;
  createdAt: string;
  user: {
    name: string;
    email: string;
  };
}
