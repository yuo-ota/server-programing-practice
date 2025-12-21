import { API_URL } from '@/config';
import axios, { type AxiosResponse } from 'axios';
import type { CheckUserIdResponse } from '@/interfaces/api/setting';

export const setting = async (formData: FormData): Promise<void> => {
  await axios.patch<void>(`${API_URL}/api/user`, formData, {
    withCredentials: true,
  });
};

export const checkUserId = async (
  userId: string
): Promise<AxiosResponse<CheckUserIdResponse>> => {
  const response = await axios.get<CheckUserIdResponse>(
    `${API_URL}/api/user/check-id/${userId}`,
    {
      withCredentials: true,
    }
  );
  return response;
};
