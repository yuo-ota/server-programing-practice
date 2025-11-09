import type { Meta, StoryObj } from '@storybook/react';
import BannerButton from './BannerButton';

type T = typeof BannerButton;

export default {
  component: BannerButton,
  args: {
    displayStatus: "solid",
    label: "テキスト" ,
    onClick: () => {},
    className: '',
  },
} satisfies Meta<T>;

export const Default: StoryObj<T> = {
};