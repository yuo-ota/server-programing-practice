import type { Meta, StoryObj } from '@storybook/react';
import SettingIcon from '../assets/home.svg?react';
import IconButton from './IconButton';

type T = typeof IconButton;

export default {
  component: IconButton,
  args: {
    onClick: () => {},
    ButtonIcon: <SettingIcon className={`h-10 w-10`} />,
    className: 'w-12 h-12',
  },
} satisfies Meta<T>;

export const Default: StoryObj<T> = {};
