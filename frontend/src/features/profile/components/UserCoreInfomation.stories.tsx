import type { Meta, StoryObj } from '@storybook/react';
import UserCoreInformation from './UserCoreInformation';
import UserIcon from '@/assets/UserIconDefault.svg?react';

type T = typeof UserCoreInformation;

export default {
  component: UserCoreInformation,
  args: {
    name: 'ユーザーネーム',
    userId: 'ユーザーID',
    icon: <UserIcon className="h-full w-full" />,
    className: '',
  },
} satisfies Meta<T>;

export const Default: StoryObj<T> = {};
