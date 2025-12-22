import type { Meta, StoryObj } from '@storybook/react';
import SelectBox from './SelectBox';

type T = typeof SelectBox;

export default {
  component: SelectBox,
  args: {
    displayStatus: 'normal',
    label: 'test',
    options: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
    onSelect: () => {},
    className: 'w-30',
  },
} satisfies Meta<T>;

export const Default: StoryObj<T> = {};
