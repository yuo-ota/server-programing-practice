import type { Meta, StoryObj } from '@storybook/react';
import TextInput from './TextInput';

type T = typeof TextInput;

export default {
  component: TextInput,
  args: {
    label: 'テキスト',
    placeholder: 'テキスト',
    error: 'テキスト',
    id: 'テキスト',
    className: '',
  },
} satisfies Meta<T>;

export const Default: StoryObj<T> = {};
