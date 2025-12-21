import { like, unlike } from '@/api/LikeApi';

export const setLike = (postId: string): void => {
  like(postId);
};

export const removeLike = (postId: string): void => {
  unlike(postId);
};
