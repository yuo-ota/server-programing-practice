import type { Meta, StoryObj } from '@storybook/react';
import TopBanner from './TopBanner';
import BannerButton from './BannerButton';

type T = typeof TopBanner;

export default {
  component: TopBanner,
  args: {
    leftElement: <BannerButton
                    displayStatus="cancel"
                    label="キャンセル"
                    onClick={() => {console.log("Pressed cancel");}}
                    className=""
                  />,
    rightElement: <BannerButton
                      displayStatus="solid"
                      label="保存"
                      onClick={() => {console.log("Pressed save");}}
                      className=""
                    />,
    label: '初期登録',
    className: 'w-full h-16',
  },
} satisfies Meta<T>;

export const Default: StoryObj<T> = {};
