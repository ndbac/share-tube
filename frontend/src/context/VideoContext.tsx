"use client"

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Video {
  videoId: string;
  title: string;
  description: string;
  sharedBy: string;
}

interface VideoContextType {
  videos: Video[];
  addVideo: (video: Video) => void;
}

const VideoContext = createContext<VideoContextType | undefined>(undefined);

export const VideoProvider = ({ children }: { children: ReactNode }) => {
  const [videos, setVideos] = useState<Video[]>([]);

  const addVideo = (video: Video) => {
    setVideos((prevVideos) => [...prevVideos, video]);
  };

  return (
    <VideoContext.Provider value={{ videos, addVideo }}>
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
