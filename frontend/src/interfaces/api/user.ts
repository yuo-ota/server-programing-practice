interface SocialAccounts {
  name: string;
  identifier: string;
}

export interface Profile {
  name: string;
  iconPath: string;
  headerPath: string;
  introduction: string;
  socialAccounts: SocialAccounts[];
  posts: Post[];
  likedPosts: LikedPost[];
}

interface Content {
  description: string;
  path: string;
  alt: string;
}

interface BasePost {
  postId: string;
  iconPath: string;
  content: Content;
}

interface Post extends BasePost {
  likeCount: number;
  isLiked: boolean;
}

interface LikedPost extends BasePost {
  userId: string;
  name: string;
}

export const isProfile = (data: unknown): data is Profile => {
  return (
    typeof data === 'object' &&
    data !== null &&
    'name' in data &&
    typeof (data as { name: unknown }).name === 'string' &&
    'iconPath' in data &&
    typeof (data as { iconPath: unknown }).iconPath === 'string' &&
    'headerPath' in data &&
    typeof (data as { headerPath: unknown }).headerPath === 'string' &&
    'introduction' in data &&
    typeof (data as { introduction: unknown }).introduction === 'string' &&
    'socialAccounts' in data &&
    typeof (data as { socialAccounts: unknown }).socialAccounts === 'object' &&
    (data as { socialAccounts: unknown }).socialAccounts !== null &&
    isSocialAccountArray(
      (data as { socialAccounts: unknown }).socialAccounts
    ) &&
    'posts' in data &&
    typeof (data as { posts: unknown }).posts === 'object' &&
    (data as { posts: unknown }).posts !== null &&
    isPostArray((data as { posts: unknown }).posts) &&
    'likedPosts' in data &&
    typeof (data as { likedPosts: unknown }).likedPosts === 'object' &&
    (data as { likedPosts: unknown }).likedPosts !== null &&
    isLikedPostArray((data as { likedPosts: unknown }).likedPosts)
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
    'postId' in data &&
    typeof (data as { postId: unknown }).postId === 'string' &&
    'iconPath' in data &&
    typeof (data as { iconPath: unknown }).iconPath === 'string' &&
    'content' in data &&
    typeof (data as { content: unknown }).content === 'object' &&
    (data as { content: unknown }).content !== null &&
    isContent((data as { content: unknown }).content)
  );
};

const isPostArray = (data: unknown): data is Post[] => {
  return (
    Array.isArray(data) &&
    data.every(
      (item: unknown) =>
        typeof item === 'object' &&
        item !== null &&
        isBasePost(item) &&
        'likeCount' in item &&
        typeof (item as { likeCount: unknown }).likeCount === 'number' &&
        'isLiked' in item &&
        typeof (item as { isLiked: unknown }).isLiked === 'boolean'
    )
  );
};

const isLikedPostArray = (data: unknown): data is LikedPost[] => {
  return (
    Array.isArray(data) &&
    data.every(
      (item: unknown) =>
        typeof item === 'object' &&
        item !== null &&
        isBasePost(item) &&
        'userId' in item &&
        typeof (item as { userId: unknown }).userId === 'string' &&
        'name' in item &&
        typeof (item as { name: unknown }).name === 'string'
    )
  );
};

const isContent = (data: unknown): data is Content => {
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
