import { IVideoShare } from '@/types';
import React from 'react';

interface ShareCardProps {
  video: IVideoShare;
}

const ShareCard: React.FC<ShareCardProps> = ({ video }) => {
  const truncateDescription = (description: string, maxLength: number) => {
    if (description.length <= maxLength) {
      return description;
    }
    return description.slice(0, maxLength) + '...';
  };

  const getYouTubeEmbedUrl = (videoId: string) => {
    return `https://www.youtube.com/embed/${videoId}`;
  };

  const getYouTubeUrl = (videoId: string) => {
    return `https://www.youtube.com/watch?v=${videoId}`;
  };

  return (
    <div className="border rounded-lg p-4 mb-4 shadow-md w-full max-w-screen-lg mx-auto">
      <a
        href={getYouTubeUrl(video.youtubeId)}
        target="_blank"
        rel="noopener noreferrer"
        className="text-xl font-bold text-blue-500 hover:underline"
      >
        {video.title}
      </a>
      <iframe
        width="100%"
        height="315"
        src={getYouTubeEmbedUrl(video.youtubeId)}
        title={video.title}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
      <p className="text-gray-700 pt-4">{truncateDescription(video.description, 300)}</p>
      <p className="text-gray-500 text-sm pt-4">Shared by: {video.user.name} ({video.user.email})</p>
      <p className="text-gray-500 text-sm">Shared at: {new Date(video.createdAt).toLocaleString()}</p>
    </div>
  );
};

export default ShareCard;
