import { useState, useEffect } from 'react';
import { fetchSharedVideos } from '@/services/axiosService';

interface Pagination {
  page: number;
  pageSize: number;
  total: number;
}

interface UseVideoListWithPaginationResult {
  videos: any[];
  pagination: Pagination;
  loading: boolean;
  error: string | null;
  handleNextPage: () => void;
  handlePreviousPage: () => void;
}

const useVideoListWithPagination = (initialPageSize: number): UseVideoListWithPaginationResult => {
  const [videos, setVideos] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(initialPageSize);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
    pageSize: initialPageSize,
    total: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const result = await fetchSharedVideos(page, pageSize);
        setVideos(result.data);
        setPagination(result.pagination);
      } catch (error) {
        setError('Failed to fetch videos. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page, pageSize]);

  const handleNextPage = () => {
    if (page < Math.ceil(pagination.total / pagination.pageSize)) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  return {
    videos,
    pagination,
    loading,
    error,
    handleNextPage,
    handlePreviousPage,
  };
};

export default useVideoListWithPagination;