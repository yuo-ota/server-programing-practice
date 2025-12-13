import { API_URL } from '@/config';
import axios from 'axios';

export const setting = async (formData: FormData): Promise<void> => {
  await axios.patch<void>(`${API_URL}/api/user`, formData, {
    withCredentials: true,
  });
};
