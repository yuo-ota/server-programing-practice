import type { Meta, StoryObj } from '@storybook/react';
import IconButton from './IconButton';

type T = typeof IconButton;

export default {
  component: IconButton,
  args: {
    displayStatus: 'home',
    onClick: () => {},
    className: '',
  },
} satisfies Meta<T>;

export const Default: StoryObj<T> = {
};