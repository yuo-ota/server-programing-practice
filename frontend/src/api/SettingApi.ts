import { API_URL } from '@/config';
import axios, { type AxiosResponse } from 'axios';

export const setting = async (formData: FormData): Promise<void> => {
  await axios.patch<void>(`${API_URL}/api/user`, formData, {
    withCredentials: true,
  });
};

export const checkUserId = async (
  userId: string
): Promise<AxiosResponse<unknown>> => {
  const response = await axios.get<unknown>(
    `${API_URL}/api/user/check-id/${userId}`,
    {
      withCredentials: true,
    }
  );
  return response;
};
