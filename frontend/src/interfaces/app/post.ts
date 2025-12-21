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

export type Post = post;