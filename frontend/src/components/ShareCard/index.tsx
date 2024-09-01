import React from 'react';

interface ShareCardProps {
  videoId: string;
  title: string;
  description: string;
  sharedBy: string;
}

const ShareCard: React.FC<ShareCardProps> = ({ videoId, title, description, sharedBy }) => {
  const truncatedDescription = description.length > 300 ? description.substring(0, 300) + '...' : description;

  return (
    <div className="flex bg-white shadow-md rounded-lg overflow-hidden">
      <div className="w-1/2">
        <iframe
          width="100%"
          height="315"
          src={`https://www.youtube.com/embed/${videoId}`}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
      <div className="w-1/2 p-4">
        <h2 className="text-xl font-bold mb-2">
          <a href={`https://www.youtube.com/watch?v=${videoId}`} target="_blank" rel="noopener noreferrer">
            {title}
          </a>
        </h2>
        <p className="text-gray-700 mb-4">{truncatedDescription}</p>
        <p className="text-gray-500">Shared by: {sharedBy}</p>
      </div>
    </div>
  );
};

export default ShareCard;
