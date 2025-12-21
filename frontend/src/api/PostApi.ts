import { API_URL } from '@/config';
import type { AxiosResponse } from 'axios';
import axios from 'axios';



export const createPost = async (formData: FormData): Promise<void> => {
  await axios.post<void>(`${API_URL}/api/post`, formData, {
    withCredentials: true,
  });
};

export const getPosts = async (date: string): Promise<AxiosResponse<void>> => {
  const response = await axios.get<void>(`${API_URL}/api/post?date=${date}`, {
    withCredentials: true,
  });
  return response;
}