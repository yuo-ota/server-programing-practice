import { useState, type ComponentProps } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import TextInput from './TextInput';

type T = typeof TextInput;

export default {
  component: TextInput,
  args: {
    displayStatus: 'unrounded-left',
    label: 'テキスト',
    placeholder: 'テキスト',
    prefix: 'unchi',
    error: 'テキスト',
    id: 'テキスト',
    value: '',
    className: '',
  },
  render: function Comp(args: ComponentProps<typeof TextInput>) {
    const [value, setValue] = useState(args.value ?? '');

    return (
      <TextInput
        {...args}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      ></TextInput>
    );
  },
} satisfies Meta<T>;

export const Default: StoryObj<T> = {};
