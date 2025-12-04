import type { Meta, StoryObj } from '@storybook/react';
import KebabMenu from './KebabMenu';

type T = typeof KebabMenu;

export default {
  component: KebabMenu,
  args: {
    items: [
      { label: 'テキスト1', onClick: () => {} },
      { label: 'テキスト2', onClick: () => {} },
      { label: 'テキスト3', onClick: () => {} },
    ],
    className: 'w-12 h-12 ml-12',
  },
} satisfies Meta<T>;

export const Default: StoryObj<T> = {};
