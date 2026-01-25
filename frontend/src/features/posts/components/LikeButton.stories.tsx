import type { Meta, StoryObj } from '@storybook/react';
import LikeButton from './LikeButton';

type T = typeof LikeButton;

export default {
  component: LikeButton,
  args: {
    isLiked: false,
    onClick: () => {},
    className: 'w-30 h-30',
  },
} satisfies Meta<T>;

export const Default: StoryObj<T> = {
  args: {
    className: 'w-30 h-30',
  },
};
