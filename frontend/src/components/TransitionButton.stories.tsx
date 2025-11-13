import type { Meta, StoryObj } from '@storybook/react';
import TransitionButton from './TransitionButton';

type T = typeof TransitionButton;

export default {
  component: TransitionButton,
  args: {
    displayStatus: 'solid',
    label: 'テキスト',
    onClick: () => {},
    className: 'w-32 h-16',
  },
} satisfies Meta<T>;

export const Default: StoryObj<T> = {};
