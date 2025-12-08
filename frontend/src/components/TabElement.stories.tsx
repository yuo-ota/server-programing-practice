import type { Meta, StoryObj } from '@storybook/react';
import TabElement from './TabElement';

type T = typeof TabElement;

export default {
  component: TabElement,
  args: {
    label: 'test',
    selected: false,
    onClick: () => {},
    className: 'w-24 h-11',
  },
} satisfies Meta<T>;

export const Default: StoryObj<T> = {};
