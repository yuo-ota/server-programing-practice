import { API_URL } from '@/config';
import type { AxiosResponse } from 'axios';
import axios from 'axios';

export const getNotifications = async (): Promise<AxiosResponse<void>> => {
  const response = await axios.get<void>(`${API_URL}/api/notification`, {
    withCredentials: true,
  });

  return response;
};
