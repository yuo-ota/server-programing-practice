import type { Meta, StoryObj } from '@storybook/react';
import NotificationLinkButton from './NotificationLinkButton';

type T = typeof NotificationLinkButton;

export default {
  component: NotificationLinkButton,
  args: {
    label: '投稿へジャンプ',
    onClick: () => {},
    className: 'w-[350px] h-[38px]',
  },
} satisfies Meta<T>;

export const Default: StoryObj<T> = {};
