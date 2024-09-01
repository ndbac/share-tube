"use client";

import useVideoListWithPagination from "@/hooks/useVideoListWithPagination";
import ShareCard from "@/components/ShareCard";

const ShareList = () => {
  const {
    videos,
    pagination,
    loading,
    error,
    handleNextPage,
    handlePreviousPage,
  } = useVideoListWithPagination(5);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-screen-lg mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center">What's new?</h2>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        {loading ? (
          <p>Loading...</p>
        ) : (
          <ul className="w-full">
            {videos.map((video: any) => (
              <li key={video.id} className="mt-12">
                <ShareCard video={video} />
              </li>
            ))}
          </ul>
        )}
        <div className="flex justify-between mt-4">
          <button
            onClick={handlePreviousPage}
            className={`py-2 px-4 rounded-lg transition duration-200 ${
              loading || pagination.page === 1
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
            disabled={loading || pagination.page === 1}
          >
            Previous
          </button>
          <button
            onClick={handleNextPage}
            className={`py-2 px-4 rounded-lg transition duration-200 ${
              loading ||
              pagination.page >=
                Math.ceil(pagination.total / pagination.pageSize)
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
            disabled={
              loading ||
              pagination.page >=
                Math.ceil(pagination.total / pagination.pageSize)
            }
          >
            Next
          </button>
        </div>
        <p className="mt-4 text-center">
          Page {pagination.page} of{" "}
          {Math.ceil(pagination.total / pagination.pageSize)}
        </p>
      </div>
    </div>
  );
};

export default ShareList;
