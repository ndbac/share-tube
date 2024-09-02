import { useState, useEffect, useCallback } from "react";
import { fetchSharedVideos } from "@/services/axiosService";
import { IVideoShare } from "@/types";
import { useVideoContext } from "@/context/VideoContext";

interface Pagination {
  page: number;
  pageSize: number;
  total: number;
}

export interface UseVideoListWithPaginationResult {
  videos: IVideoShare[];
  pagination: Pagination;
  loading: boolean;
  error: string | null;
  handleNextPage: () => void;
  handlePreviousPage: () => void;
  resetPagination: () => void;
}

const useVideoListWithPagination = (
  initialPageSize: number
): UseVideoListWithPaginationResult => {
  const { addVideos, videos, reset } = useVideoContext();
  const [videoData, setVideoData] = useState<IVideoShare[]>([]);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(initialPageSize);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
    pageSize: initialPageSize,
    total: 0,
  });

  const fetchData = useCallback(
    async (page: number, pageSize: number) => {
      setLoading(true);
      setError(null);
      try {
        const result = await fetchSharedVideos(page, pageSize);
        addVideos(result.data);
        setPagination(result.pagination);
        setVideoData(result.data);
      } catch (error) {
        setError("Failed to fetch videos. Please try again.");
      } finally {
        setLoading(false);
      }
    },
    [addVideos]
  );

  useEffect(() => {
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    const pageVideos = videos.slice(start, end);

    if (pageVideos.length) {
      setVideoData(pageVideos);
      setPagination((prev) => ({ ...prev, page }));
    } else {
      fetchData(page, pageSize);
    }
  }, [addVideos, fetchData, page, pageSize, videos]);

  const handleNextPage = () => {
    if (page < Math.ceil(pagination.total / pagination.pageSize)) {
      setPage((prevPage) => {
        const nextPage = prevPage + 1;
        return nextPage;
      });
    }
  };

  const handlePreviousPage = () => {
    setPage((prevPage) => {
      const prevPageNum = Math.max(prevPage - 1, 1);
      return prevPageNum;
    });
  };

  const resetPagination = () => {
    reset();
    setVideoData([]);
    setPage(1);
    setPagination({
      page: 1,
      pageSize: initialPageSize,
      total: 0,
    });
  };

  return {
    videos: videoData,
    pagination,
    loading,
    error,
    handleNextPage,
    handlePreviousPage,
    resetPagination,
  };
};

export default useVideoListWithPagination;
