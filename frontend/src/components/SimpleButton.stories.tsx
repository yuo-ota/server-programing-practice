import type { Meta, StoryObj } from '@storybook/react';
import SimpleButton from './SimpleButton';

type T = typeof SimpleButton;

export default {
  component: SimpleButton,
  args: {
    label: 'テキスト',
    onClick: () => {},
    className: '',
  },
} satisfies Meta<T>;

export const Default: StoryObj<T> = {};
