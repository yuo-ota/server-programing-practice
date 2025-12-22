import { API_URL } from '@/config';
import axios from 'axios';
import type { Profile } from '@/interfaces/app/profile';



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
  liked: boolean;
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

export const getProfile = async (userId: string): Promise<Profile> => {
  const response = await axios.get<UserProfileResponse>(
    `${API_URL}/api/user/${userId}`,
    {
      withCredentials: true,
    }
  );

  const data = response.data;

  const profile: Profile = {
    name: data.name,
    iconPath: data.icon_path,
    headerPath: data.header_path,
    introduction: data.introduction ?? '',
    socialAccounts: (data.social_accounts || []).map((s) => ({
      name: s.name,
      identifier: s.identifier,
    })),
    posts: (data.posts || []).map((p) => ({
      postId: p.post_id,
      iconPath: p.icon_path,
      likeCount: p.like_count,
      isLiked: p.liked,
      content: {
        description: p.content.description,
        path: p.content.path,
        alt: p.content.alt,
      },
    })),

    likedPosts: (data.liked_posts || []).map((lp) => ({
      userId: lp.user_id,
      name: lp.name,
      postId: lp.post_id,
      iconPath: lp.icon_path,
      content: {
        description: lp.content.description,
        path: lp.content.path,
        alt: lp.content.alt,
      },
    })),
  };

  return profile;
};
