import { IVideoShare } from '@/types';
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const register = async (
  name: string,
  email: string,
  password: string
) => {
  const response = await axiosInstance.post("/user/register", {
    name,
    email,
    password,
  });
  return response.data;
};

export const login = async (email: string, password: string) => {
  const response = await axiosInstance.post("/user/login", {
    email,
    password,
  });
  return response.data;
};

export const refreshToken = async (refreshToken: string) => {
  const response = await axiosInstance.post(
    "/user/refresh-token",
    {
      refreshToken,
    }
  );
  return response.data;
};

export const fetchSharedVideos = async (page: number, pageSize: number) => {
  const response = await axiosInstance.get<IVideoShare[]>('/share/filter', {
    params: {
      page,
      pageSize,
    },
  });

  return {
    data: response.data,
    pagination: {
      page: parseInt(response.headers['x-pagination-page'], 10),
      pageSize: parseInt(response.headers['x-pagination-page-size'], 10),
      total: parseInt(response.headers['x-pagination-total'], 10),
    },
  };
};

export const shareVideo = async (youtubeUrl: string) => {
  const response = await axiosInstance.post('/share', { youtubeUrl });
  return response.data;
};
