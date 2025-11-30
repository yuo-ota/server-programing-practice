import type { Meta, StoryObj } from '@storybook/react';
import TabElementGroup from './TabElementGroup';

type T = typeof TabElementGroup;

export default {
  component: TabElementGroup,
  args: {
    tabs: ['テキストA', 'テキストB'],
    className: '',
  },
} satisfies Meta<T>;

export const Default: StoryObj<T> = {};
