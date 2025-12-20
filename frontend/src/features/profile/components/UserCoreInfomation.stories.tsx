import type { Meta, StoryObj } from '@storybook/react';
import UserCoreInfomation from './UserCoreInfomation';
import UserIcon from '@/assets/UserIconDefault.svg?react';

type T = typeof UserCoreInfomation;

export default {
  component: UserCoreInfomation,
  args: {
    name: 'ユーザーネーム',
    userId: 'ユーザーID',
    icon: <UserIcon className="h-full w-full" />,
    className: '',
  },
} satisfies Meta<T>;

export const Default: StoryObj<T> = {};
