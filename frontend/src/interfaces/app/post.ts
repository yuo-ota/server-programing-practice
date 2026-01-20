interface image {
  path: string;
  alt: string;
}

interface post {
  userId: string;
  name: string;
  iconPath: string;
  postId: string;
  text: string;
  images: image[];
  liked: boolean;
}

export interface PostProps {
  userIconPath: string;
  userName: string;
  userId: string;
  postId: string;
  postText: string;
  postImagePath: string;
  postImageAlt: string;
  isLiked: boolean;
}

export type Post = post;
