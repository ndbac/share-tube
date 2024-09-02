"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { shareVideo } from "@/services/axiosService";
import { useRouter } from "next/navigation";
import { useVideoContext } from "@/context/VideoContext";
import ProtectedRoute from "../protectedRoutes";
import { schema, FormData } from "./schema";

export default function Share() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const router = useRouter();
  const { resetPagination } = useVideoContext();

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      await shareVideo(data.youtubeUrl);
      setSuccess("Video shared successfully!");
      resetPagination();
      setTimeout(() => {
        router.push("/");
      }, 1000);
    } catch (error) {
      setError("Failed to share video. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-center">
            Share a YouTube Video
          </h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label className="block text-gray-700">YouTube URL</label>
              <input
                type="url"
                {...register("youtubeUrl")}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              />
              {errors.youtubeUrl && (
                <p className="text-red-500 text-sm">
                  {errors.youtubeUrl.message}
                </p>
              )}
            </div>
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
            {success && (
              <p className="text-green-500 text-sm mb-4">{success}</p>
            )}
            <button
              type="submit"
              className={`w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200 ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={loading}
            >
              {loading ? "Sharing..." : "Share"}
            </button>
          </form>
        </div>
      </div>
    </ProtectedRoute>
  );
}
