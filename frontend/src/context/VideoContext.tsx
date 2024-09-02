"use client";

import { IVideoShare } from "@/types";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
} from "react";
import { fetchSharedVideos } from "@/services/axiosService";

interface Pagination {
  page: number;
  pageSize: number;
  total: number;
}

interface VideoContextType {
  videos: IVideoShare[];
  pagination: Pagination;
  loading: boolean;
  error: string | null;
  loadMoreVideos: () => void;
  resetPagination: () => void;
}

const VideoContext = createContext<VideoContextType | undefined>(undefined);

export const VideoProvider = ({ children }: { children: ReactNode }) => {
  const [videos, setVideos] = useState<IVideoShare[]>([]);
  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
    pageSize: 5,
    total: 0,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async (page: number, pageSize: number) => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetchSharedVideos(page, pageSize);
      setVideos((prev) => [...prev, ...result.data]);
      setPagination(result.pagination);
    } catch (error) {
      setError("Failed to fetch videos. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  const resetPagination = useCallback(() => {
    setVideos([]);
    setPagination({ page: 1, pageSize: 5, total: 0 });
    fetchData(1, 5);
  }, [fetchData]);

  useEffect(() => {
    fetchData(1, pagination.pageSize);
  }, [fetchData, pagination.pageSize]);

  const loadMoreVideos = useCallback(() => {
    if (pagination.page < Math.ceil(pagination.total / pagination.pageSize)) {
      const nextPage = pagination.page + 1;
      fetchData(nextPage, pagination.pageSize);
      setPagination((prev) => ({ ...prev, page: nextPage }));
    }
  }, [fetchData, pagination.page, pagination.pageSize, pagination.total]);

  return (
    <VideoContext.Provider
      value={{
        videos,
        pagination,
        loading,
        error,
        loadMoreVideos,
        resetPagination,
      }}
    >
      {children}
    </VideoContext.Provider>
  );
};

export const useVideoContext = () => {
  const context = useContext(VideoContext);
  if (!context) {
    throw new Error("useVideoContext must be used within a VideoProvider");
  }
  return context;
};
