interface socialAccounts{
    name: string;
    identifier: string;
}

interface content{
    description: string;
    path: string;
    alt: string;
}

interface posts {
    postId: string;
    iconPath: string;
    likeCount: number;
    isLiked: boolean;
    content: content;
}

interface likedPosts {
    userId: string;
    name: string;
    postId: string;
    iconPath: string;
    content: content;
}

interface profile {
    name: string;
    iconPath: string;
    headerPath: string;
    introduction: string;
    socialAccounts: socialAccounts[];
    posts: posts[];
    likedPosts: likedPosts[];
}


export type Profile = profile