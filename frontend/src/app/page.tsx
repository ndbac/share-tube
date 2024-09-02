"use client"

import { useEffect } from "react";
import ShareList from "@/components/ShareList";
import { useAuthContext } from "@/context/AuthContext";
import { socketService } from "@/services/socketService";
import { IOnNewShareEventPayload } from "@/types";

export default function Home() {
  const { isAuthenticated } = useAuthContext();

  useEffect(() => {
    if (isAuthenticated) {
      socketService.connect();

      socketService.onNewShare((payload: IOnNewShareEventPayload) => {
        console.log("New video shared:", payload);
      });

      return () => {
        socketService.disconnect();
      };
    }
  }, [isAuthenticated]);

  return (
    <main>
      <ShareList />
    </main>
  );
}
