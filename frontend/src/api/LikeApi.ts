import { API_URL } from "@/config";
import axios from "axios";

export const like = async (postId: string): Promise<void> => {
  await axios.post<void>(`${API_URL}/api/like/${postId}`, null, {
    withCredentials: true,
  });
};

export const unlike = async (postId: string): Promise<void> => {
  await axios.delete<void>(`${API_URL}/api/like/${postId}`, {
    withCredentials: true,
  });
};