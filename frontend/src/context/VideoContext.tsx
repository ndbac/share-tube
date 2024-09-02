"use client"

import { IVideoShare } from '@/types';
import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';

interface VideoContextType {
  videos: IVideoShare[];
  addVideos: (videos: IVideoShare[]) => void;
  reset: () => void;
}

const VideoContext = createContext<VideoContextType | undefined>(undefined);

export const VideoProvider = ({ children }: { children: ReactNode }) => {
  const [videos, setVideos] = useState<IVideoShare[]>([]);

  const addVideos = useCallback((newVideos: IVideoShare[]) => {
    setVideos((prevVideos) => {
      const videoMap = new Map(prevVideos.map(video => [video.id, video]));
      newVideos.forEach(video => {
        videoMap.set(video.id, video);
      });
      return Array.from(videoMap.values());
    });
  }, []);

  const reset = useCallback(() => {
    setVideos([]);
  }, []);

  return (
    <VideoContext.Provider value={{ videos, addVideos, reset }}>
      {children}
    </VideoContext.Provider>
  );
};

export const useVideoContext = () => {
  const context = useContext(VideoContext);
  if (!context) {
    throw new Error('useVideoContext must be used within a VideoProvider');
  }
  return context;
};
