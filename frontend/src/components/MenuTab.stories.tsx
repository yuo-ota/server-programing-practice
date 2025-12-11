import type { Meta, StoryObj } from '@storybook/react';
import MenuTab from './MenuTab.tsx';

type T = typeof MenuTab;

export default {
  component: MenuTab,
  args: {
    displayStatus: 'normal',
    className: '',
  },
} satisfies Meta<T>;

export const Default: StoryObj<T> = {};