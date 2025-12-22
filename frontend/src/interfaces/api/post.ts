import { type Post } from '@/interfaces/app/post';

interface images {
  path: string;
  alt: string;
}

export interface post {
  user_id: string;
  name: string;
  icon_path: string;
  post_id: string;
  text: string;
  images: images[];
  liked: boolean;
}

export const mapPost = (apiPost: post): Post => {
  return {
    userId: apiPost.user_id,
    name: apiPost.name,
    iconPath: apiPost.icon_path,
    postId: apiPost.post_id,
    text: apiPost.text,
    images: apiPost.images.map((image: { path: string; alt: string }) => ({
      path: image.path,
      alt: image.alt,
    })),
    liked: apiPost.liked,
  };
};

export const isPostArray = (data: unknown): data is post[] => {
  return (
    Array.isArray(data) &&
    data.every(
      (item) =>
        typeof item === 'object' &&
        item !== null &&
        'user_id' in item &&
        typeof (item as { user_id: unknown }).user_id === 'string' &&
        'name' in item &&
        typeof (item as { name: unknown }).name === 'string' &&
        'icon_path' in item &&
        typeof (item as { icon_path: unknown }).icon_path === 'string' &&
        'post_id' in item &&
        typeof (item as { post_id: unknown }).post_id === 'string' &&
        'text' in item &&
        typeof (item as { text: unknown }).text === 'string' &&
        'images' in item &&
        Array.isArray((item as { images: unknown }).images) &&
        isImagesArray((item as { images: unknown }).images) &&
        'liked' in item &&
        typeof (item as { liked: unknown }).liked === 'boolean'
    )
  );
};

export const isPost = (data: unknown): data is post => {
  return (
    typeof data === 'object' &&
    data !== null &&
    'user_id' in data &&
    typeof (data as { user_id: unknown }).user_id === 'string' &&
    'name' in data &&
    typeof (data as { name: unknown }).name === 'string' &&
    'icon_path' in data &&
    typeof (data as { icon_path: unknown }).icon_path === 'string' &&
    'post_id' in data &&
    typeof (data as { post_id: unknown }).post_id === 'string' &&
    'text' in data &&
    typeof (data as { text: unknown }).text === 'string' &&
    'images' in data &&
    Array.isArray((data as { images: unknown }).images) &&
    isImagesArray((data as { images: unknown }).images) &&
    'liked' in data &&
    typeof (data as { liked: unknown }).liked === 'boolean'
  );
};

const isImagesArray = (
  data: unknown
): data is { path: string; alt: string }[] => {
  return (
    Array.isArray(data) &&
    data.every(
      (item) =>
        typeof item === 'object' &&
        item !== null &&
        'path' in item &&
        typeof (item as { path: unknown }).path === 'string' &&
        'alt' in item &&
        typeof (item as { alt: unknown }).alt === 'string'
    )
  );
};
