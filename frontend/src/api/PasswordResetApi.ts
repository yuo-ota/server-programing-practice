import { API_URL } from '@/config';
import axios from 'axios';

export const passwordReset = async (email: string): Promise<void> => {
  await axios.post<void>(`${API_URL}/api/password-reset`, {
    email_address: email,
  });
};
