import { API_URL } from '@/config';
import axios from 'axios';

interface Content {
  description: string;
  path: string;
  alt: string;
}

interface UserProfile {
  name: string;
  iconPath: string;
  headerPath: string;
  introduction: string;
  socialAccounts: SocialAccounts[];
  posts: UserPosts[];
  likedPosts: UserLikedPosts[];
}

interface SocialAccounts {
  name: string;
  identifier: string;
}

interface UserPosts {
  postId: string;
  iconPath: string;
  likeCount: number;
  isLiked: boolean;
  content: Content;
}

interface UserLikedPosts {
  userId: string;
  name: string;
  postId: string;
  iconPath: string;
  content: Content;
}

interface ContentResponse {
  description: string;
  path: string;
  alt: string;
}

interface SocialAccountResponse {
  name: string;
  identifier: string;
}

interface PostResponse {
  post_id: string;
  icon_path: string;
  like_count: number;
  is_Liked: boolean;
  content: ContentResponse;
}

interface LikedPostResponse {
  user_id: string;
  name: string;
  post_id: string;
  icon_path: string;
  content: ContentResponse;
}

interface UserProfileResponse {
  name: string;
  icon_path: string;
  header_path: string;
  introduction: string;
  social_accounts: SocialAccountResponse[];
  posts: PostResponse[];
  liked_posts: LikedPostResponse[];
}

export const getProfile = async (userId: string): Promise<UserProfile> => {
  const response = await axios.get<UserProfileResponse>(
    `${API_URL}/api/user/${userId}`,
    {
      withCredentials: true,
    }
  );

  const data = response.data;

  const mapped: UserProfile = {
    name: data.name,
    iconPath: data.icon_path,
    headerPath: data.header_path,
    introduction: data.introduction,
    socialAccounts: (data.social_accounts ?? []).map((sa) => ({
      name: sa.name,
      identifier: sa.identifier,
    })),
    posts: (data.posts ?? []).map((p) => ({
      postId: p.post_id,
      iconPath: p.icon_path,
      likeCount: p.like_count,
      isLiked: p.is_Liked,
      content: {
        description: p.content.description,
        path: p.content.path,
        alt: p.content.alt,
      },
    })),
    likedPosts: (data.liked_posts ?? []).map((l) => ({
      userId: l.user_id,
      name: l.name,
      postId: l.post_id,
      iconPath: l.icon_path,
      content: {
        description: l.content.description,
        path: l.content.path,
        alt: l.content.alt,
      },
    })),
  };

  return mapped;
};
