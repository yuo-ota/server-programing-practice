import type { Meta, StoryObj } from '@storybook/react';
import CheckBox from './CheckBox';

type T = typeof CheckBox;

export default {
  component: CheckBox,
  args: {
    id: 'テキスト',
    name: 'テキスト',
    label: 'テキスト',
    checked: false,
    helperText: 'テキスト',
    className: '',
  },
} satisfies Meta<T>;

export const Default: StoryObj<T> = {};
