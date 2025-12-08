import { API_URL } from '@/config';
import axios from 'axios';

export const login = async (email_address: string, password: string): Promise<void> => {
  await axios.post<void>(`${API_URL}/api/login`, {
    email_address,
    password,
  },
  { withCredentials: true });
};
