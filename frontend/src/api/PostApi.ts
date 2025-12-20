import { API_URL } from '@/config';
import axios from 'axios';

export const createPost = async (formData: FormData): Promise<void> => {
  await axios.post<void>(`${API_URL}/api/post`, formData, {
    withCredentials: true,
  });
};
