import { like, unlike } from '@/api/LikeApi';

export const setLike = (postId: string) => {
  return like(postId);
};
export const removeLike = (postId: string) => {
  return unlike(postId);
};
