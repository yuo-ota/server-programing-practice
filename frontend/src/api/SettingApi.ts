import { API_URL } from '@/config';
import axios, { type AxiosResponse } from 'axios';

export const setting = async (formData: FormData): Promise<void> => {
  await axios.patch<void>(`${API_URL}/api/user`, formData, {
    withCredentials: true,
  });
};

export const checkUserId = async (userId: string): Promise<AxiosResponse<void>> => {
  const response = await axios.get<void>(
    `${API_URL}/api/users/check-id/${userId}`, {
      withCredentials: true,
    });
  return response;
}
