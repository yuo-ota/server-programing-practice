import {type Profile} from '@/interfaces/app/profile';

interface SocialAccounts {
  name: string;
  identifier: string;
}

export interface profile {
  name: string;
  iconPath: string;
  headerPath: string;
  introduction: string;
  socialAccounts: SocialAccounts[];
  posts: post[];
  likedPosts: likedPost[];
}

interface content {
  description: string;
  path: string;
  alt: string;
}

interface BasePost {
  postId: string;
  iconPath: string;
  content: content;
}

interface post extends BasePost {
  likeCount: number;
  isLiked: boolean;
}

interface likedPost extends BasePost {
  userId: string;
  name: string;
}

export const mapProfile = (response: profile): Profile => {
  return {
    name: response.name,
    iconPath: response.iconPath,
    headerPath: response.headerPath,
    introduction: response.introduction,
    socialAccounts: response.socialAccounts.map((socialAccount: { name: string; identifier: string;}) => ({
      name: socialAccount.name,
      identifier: socialAccount.identifier,
    })),
    posts: response.posts.map((post: { postId: string; iconPath: string; likeCount: number; isLiked: boolean; content: content}) => ({
      postId: post.postId,
      iconPath: post.iconPath,
      likeCount: post.likeCount,
      isLiked: post.isLiked,
      content: post.content
    })),
    likedPosts: response.likedPosts.map((likedPost: {userId: string; name: string; postId: string; iconPath: string; content: content}) => ({
      userId: likedPost.userId,
      name: likedPost.name,
      postId: likedPost.postId,
      iconPath: likedPost.iconPath,
      content: likedPost.content
    }))

  }
}

export const isProfile = (data: unknown): data is Profile => {
  return (
    typeof data === 'object' &&
    data !== null &&
    'name' in data &&
    typeof (data as { name: unknown }).name === 'string' &&
    'icon_path' in data &&
    typeof (data as { icon_path: unknown }).icon_path === 'string' &&
    'header_path' in data &&
    typeof (data as { header_path: unknown }).header_path === 'string' &&
    'introduction' in data &&
    (typeof (data as { introduction: unknown }).introduction === 'string' ||
      (data as { introduction: unknown }).introduction === null) &&
    'social_accounts' in data &&
    Array.isArray((data as { social_accounts: unknown }).social_accounts) &&
    isSocialAccountArray(
      (data as { social_accounts: unknown }).social_accounts
    ) &&
    'posts' in data &&
    Array.isArray((data as { posts: unknown }).posts) &&
    isPostArray((data as { posts: unknown }).posts) &&
    'liked_posts' in data &&
    Array.isArray((data as { liked_posts: unknown }).liked_posts) &&
    isLikedPostArray((data as { liked_posts: unknown }).liked_posts)
  );
};

const isSocialAccountArray = (data: unknown): data is SocialAccounts[] => {
  return (
    Array.isArray(data) &&
    data.every(
      (item: unknown) =>
        typeof item === 'object' &&
        item !== null &&
        'name' in item &&
        typeof (item as { name: unknown }).name === 'string' &&
        'identifier' in item &&
        typeof (item as { identifier: unknown }).identifier === 'string'
    )
  );
};

const isBasePost = (data: unknown): data is BasePost => {
  return (
    typeof data === 'object' &&
    data !== null &&
    'post_id' in data &&
    typeof (data as { post_id: unknown }).post_id === 'string' &&
    'icon_path' in data &&
    typeof (data as { icon_path: unknown }).icon_path === 'string' &&
    'content' in data &&
    typeof (data as { content: unknown }).content === 'object' &&
    (data as { content: unknown }).content !== null &&
    isContent((data as { content: unknown }).content)
  );
};

const isPostArray = (data: unknown): data is post[] => {
  return (
    Array.isArray(data) &&
    data.every(
      (item: unknown) =>
        typeof item === 'object' &&
        item !== null &&
        isBasePost(item) &&
        'like_count' in item &&
        typeof (item as { like_count: unknown }).like_count === 'number' &&
        'is_liked' in item &&
        typeof (item as { is_liked: unknown }).is_liked === 'boolean'
    )
  );
};

const isLikedPostArray = (data: unknown): data is likedPost[] => {
  return (
    Array.isArray(data) &&
    data.every(
      (item: unknown) =>
        typeof item === 'object' &&
        item !== null &&
        isBasePost(item) &&
        'user_id' in item &&
        typeof (item as { user_id: unknown }).user_id === 'string' &&
        'name' in item &&
        typeof (item as { name: unknown }).name === 'string'
    )
  );
};

const isContent = (data: unknown): data is content => {
  return (
    typeof data === 'object' &&
    data !== null &&
    'description' in data &&
    typeof (data as { description: unknown }).description === 'string' &&
    'path' in data &&
    typeof (data as { path: unknown }).path === 'string' &&
    'alt' in data &&
    typeof (data as { alt: unknown }).alt === 'string'
  );
};
