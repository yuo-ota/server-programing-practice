import { API_URL } from '@/config';
import axios from 'axios';

export const createReport = async (
  reporteePost: string,
  reportTypes: string[],
  reason: string
): Promise<void> => {
  await axios.post<void>(
    `${API_URL}/api/report`,
    {
      reportee_post: reporteePost,
      report_type: reportTypes,
      detail: reason,
    },
    { withCredentials: true }
  );
};
