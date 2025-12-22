import { API_URL } from '@/config';
import axios, { type AxiosResponse } from 'axios';

export const createPost = async (formData: FormData): Promise<void> => {
  await axios.post<void>(`${API_URL}/api/post`, formData, {
    withCredentials: true,
  });
};

export const deletePost = async (postId: string): Promise<void> => {
  await axios.delete<void>(`${API_URL}/api/post/${postId}` , {
    withCredentials: true,
  });
};

export const getPost = async (postId: string): Promise<AxiosResponse<void>> => {
  const response = await axios.get<void>(`${API_URL}/api/post/${postId}`, {
    withCredentials: true,
  });
  return response;
};

export const getTodayPost = async (
  date: string
): Promise<AxiosResponse<void>> => {
  const response = await axios.get<void>(`${API_URL}/api/post?date=${date}`, {
    withCredentials: true,
  });
  return response;
};
