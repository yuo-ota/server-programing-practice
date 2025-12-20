import { API_URL } from '@/config';
import axios from 'axios';

interface Content{
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
  content: Content;
}

interface UserLikedPosts{
  userId: string;
  name: string;
  postId: string;
  iconPath: string;
  content: Content;
}


export const getProfile = async (userId : string): Promise<UserProfile> => {
    const response = await axios.get(
        `${API_URL}/api/user/${userId}`,
        { withCredentials: true}
    );

    const data = response.data as any;

    const mapped: UserProfile = {
        name: data.name,
        iconPath: data.icon_path,
        headerPath: data.header_path,
        introduction: data.introduction,
        socialAccounts: (data.social_accounts || []).map((sa: any) => ({
            name: sa.name,
            identifier: sa.identifier,
        })),
        posts: (data.posts || []).map((p: any) => ({
            postId: p.post_id,
            iconPath: p.icon_path,
            likeCount: p.like_count,
            content: {
                description: p.content?.description,
                path: p.content?.path,
                alt: p.content?.alt,
            },
        })),
        likedPosts: (data.liked_posts || []).map((l: any) => ({
            userId: l.user_id,
            name: l.name,
            postId: l.post_id,
            iconPath: l.icon_path,
            content: {
                description: l.content?.description,
                path: l.content?.path,
                alt: l.content?.alt,
            },
        })),
    };

    return mapped;
}