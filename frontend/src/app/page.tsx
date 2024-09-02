"use client";

import { useEffect, useState } from "react";
import ShareList from "@/components/ShareList";
import { useAuthContext } from "@/context/AuthContext";
import { socketService } from "@/services/socketService";
import { IOnNewShareEventPayload } from "@/types";
import { useVideoContext } from "@/context/VideoContext";
import { useSnackbar } from "notistack";

export default function Home() {
  const { isAuthenticated } = useAuthContext();
  const { resetPagination } = useVideoContext();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (isAuthenticated) {
      socketService.connect();

      socketService.onNewShare((payload: IOnNewShareEventPayload) => {
        enqueueSnackbar(`${payload.user.name} just shared a new video!`, {
          variant: "info",
          action: <button onClick={resetPagination}>View</button> 
        });
      });

      return () => {
        socketService.disconnect();
      };
    }
  }, [enqueueSnackbar, isAuthenticated, resetPagination]);

  return (
    <main>
      <ShareList />
    </main>
  );
}
