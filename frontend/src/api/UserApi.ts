import { API_URL } from '@/config';
import axios, { type AxiosResponse } from 'axios';

export const getUserSetting = async (): Promise<AxiosResponse<void>> => {
  const response = await axios.get<void>(`${API_URL}/api/user/setting`, {
    withCredentials: true,
  });

  return response;
};

export const createUser = async (token: string, name: string, userId: string, birthday: string, showAdultContent: boolean, socialAccounts: { name: string; identifier: string }[]): Promise<void> => {
  await axios.post<void>(`${API_URL}/api/user`, {
    token,
    name,
    user_id: userId,
    birthday,
    show_adult_contents: showAdultContent,
    social_accounts: socialAccounts
  }, {
    withCredentials: true,
  });
};
