"use client";

import { useEffect, useState } from "react";
import ShareList from "@/components/ShareList";
import { useAuthContext } from "@/context/AuthContext";
import { socketService } from "@/services/socketService";
import { IOnNewShareEventPayload } from "@/types";
import { useVideoContext } from "@/context/VideoContext";

export default function Home() {
  const { isAuthenticated } = useAuthContext();
  const { resetPagination } = useVideoContext();
  const [newVideo, setNewVideo] = useState<IOnNewShareEventPayload | null>(null);

  useEffect(() => {
    if (isAuthenticated) {
      socketService.connect();

      socketService.onNewShare((payload: IOnNewShareEventPayload) => {
        setNewVideo(payload);
      });

      return () => {
        socketService.disconnect();
      };
    }
  }, [isAuthenticated]);

  const handlePopupClick = () => {
    if (newVideo) {
      setNewVideo(null);
      resetPagination();
    }
  };

  return (
    <main>
      {newVideo && (
        <div className="popup" onClick={handlePopupClick}>
          New video shared! Click to view.
        </div>
      )}
      <ShareList />
    </main>
  );
}
