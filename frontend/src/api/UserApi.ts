import { API_URL } from '@/config';
import axios, { type AxiosResponse } from 'axios';

export const getUserSetting = async (): Promise<AxiosResponse<void>> => {
  const response = await axios.get<void>(`${API_URL}/api/user/setting`, {
    withCredentials: true,
  });

  return response;
};
