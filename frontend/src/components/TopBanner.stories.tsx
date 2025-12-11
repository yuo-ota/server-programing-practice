import type { Meta, StoryObj } from '@storybook/react';
import TopBanner from './TopBanner';

type T = typeof TopBanner;

export default {
  component: TopBanner,
  args: {
    displayStatus: 'normal',
    label: 'テキスト',
    isAbleReturn: true,
    bannerButoonStatus: 'solid',
    bannerButoonLabel: 'テキスト',
    className: 'h-16',
  },
} satisfies Meta<T>;

export const Default: StoryObj<T> = {};
