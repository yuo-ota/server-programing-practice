import type { Meta, StoryObj } from '@storybook/react';
import UserIcon from '@/assets/UserIconDefault.svg?react';
import Post from './Post';

type T = typeof Post;

export default {
  component: Post,
  args: {
    icon: <UserIcon />,
    userName: 'ユーザー名ユーザー名ユーザー名ユーザー名',
    text: 'サンプルテキスト',
    images: {
      imagePath: 'https://images.hitpaw.com/topics/video-tips/16-9.jpg',
      alt: 'Sample image'
    }
  },
} satisfies Meta<T>;

export const Default: StoryObj<T> = {
};