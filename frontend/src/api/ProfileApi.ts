import { API_URL } from '@/config';
import axios from 'axios';

interface UserProfile {
  name: string;
  icon_path?: string;
  header_path?: string;
  social_accounts: {
    platform_id: number;
    identifier: string;
  }
}

export const getProfile = async (userId : string): Promise<UserProfile> => {
    const response = await axios.get<UserProfile>(
        `${API_URL}/api/user/${userId}`,
        { withCredentials: true}
    );

    return response.data;
}