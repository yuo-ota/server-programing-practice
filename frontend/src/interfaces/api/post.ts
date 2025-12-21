export interface Post {
  user_id: string;
  name: string;
  icon_path: string;
  liked: boolean;
  post_id: string;
  text: string;
  images: Image[];
}

export interface Image {
  path: string;
  alt: string;
}

export const isPost = (data: unknown): data is Post => {
  return (
    typeof data === 'object' &&
    data !== null &&
    'user_id' in data &&
    typeof (data as { user_id: unknown }).user_id === 'string' &&
    'name' in data &&
    typeof (data as { name: unknown }).name === 'string' &&
    'icon_path' in data &&
    typeof (data as { icon_path: unknown }).icon_path === 'string' &&
    'liked' in data &&
    typeof (data as { liked: unknown }).liked === 'boolean' &&
    'post_id' in data &&
    typeof (data as { post_id: unknown }).post_id === 'string' &&
    'text' in data &&
    typeof (data as { text: unknown }).text === 'string' &&
    'images' in data &&
    Array.isArray(data.images) &&
    data.images.every((item: unknown) => {
      return (
        typeof item === 'object' &&
        item !== null &&
        'path' in item &&
        typeof (item as { path: unknown }).path === 'string' &&
        'alt' in item &&
        typeof (item as { alt: unknown }).alt === 'string'
      );
    })
  );
};
