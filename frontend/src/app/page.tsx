"use client";

import { useCallback, useEffect, useRef } from "react";
import { socketService } from "@/services/socketService";
import { IOnNewShareEventPayload } from "@/types";
import { useVideoContext } from "@/context/VideoContext";
import { useSnackbar } from "notistack";
import ShareCard from "@/components/ShareCard";

export default function Home() {
  const { resetPagination } = useVideoContext();
  const { enqueueSnackbar } = useSnackbar();
  const { videos, loading, error, loadMoreVideos } = useVideoContext();
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    socketService.connect();

    socketService.onNewShare((payload: IOnNewShareEventPayload) => {
      enqueueSnackbar(`${payload.user.name} just shared a new video!`, {
        variant: "info",
        action: <button onClick={resetPagination}>View</button>,
      });
    });

    return () => {
      socketService.disconnect();
    };
  }, [enqueueSnackbar, resetPagination]);

  const lastVideoElementRef = useCallback(
    (node: Element | null) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          loadMoreVideos();
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, loadMoreVideos]
  );

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-screen-lg mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center">What's new?</h2>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        {loading && !videos.length ? (
          <p>Loading...</p>
        ) : (
          <ul className="w-full">
            {videos.map((video, index) => {
              if (videos.length === index + 1) {
                return (
                  <li
                    ref={lastVideoElementRef}
                    key={video.id}
                    className="mt-12"
                  >
                    <ShareCard video={video} />
                  </li>
                );
              } else {
                return (
                  <li key={video.id} className="mt-12">
                    <ShareCard video={video} />
                  </li>
                );
              }
            })}
          </ul>
        )}
        {loading && videos.length > 0 && <p>Loading more videos...</p>}
      </div>
    </div>
  );
}
