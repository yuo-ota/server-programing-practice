import type { Meta, StoryObj } from '@storybook/react';
import TabElementGroup from './TabElementGroup';

type T = typeof TabElementGroup;

export default {
  component: TabElementGroup,
  args: {
    tabs: [
      { label: 'テキストA', onClick: () => {} },
      { label: 'テキストB', onClick: () => {} },
    ],
    className: '',
  },
} satisfies Meta<T>;

export const Default: StoryObj<T> = {};
