import type { Meta, StoryObj } from '@storybook/react';
import RadioButton from './RadioButton';

type T = typeof RadioButton;

export default {
  component: RadioButton,
  args: {
    id: 'テキスト',
    name: 'テキスト',
    label: 'テキスト',
    checked: true,
    className: '',
  },
} satisfies Meta<T>;

export const Default: StoryObj<T> = {};
