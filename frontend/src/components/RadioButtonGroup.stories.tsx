import type { Meta, StoryObj } from '@storybook/react';
import RadioButtonGroup from './RadioButtonGroup';

type T = typeof RadioButtonGroup;

export default {
  component: RadioButtonGroup,
  args: {
    groupName: 'テキスト',
    options: ['テキストA', 'テキストB'],
    initialValue: 'テキストA',
    className: 'gap-10',
  },
} satisfies Meta<T>;

export const Default: StoryObj<T> = {};
