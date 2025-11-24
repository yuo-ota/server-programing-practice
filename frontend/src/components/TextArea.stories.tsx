import { useState, type ComponentProps } from 'react';
import type { StoryObj } from '@storybook/react';
import TextArea from './TextArea';

type T = typeof TextArea;

export default {
  args: {
    label: 'テキスト',
    placeholder: 'テキスト',
    limit: 140,
    id: 'テキスト',
    className: '',
    value: '',
  },
  render: function Comp(args: ComponentProps<typeof TextArea>) {
    const [value, setValue] = useState(args.value ?? '');

    return (
      <TextArea
        {...args}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      ></TextArea>
    );
  },
};

export const Default: StoryObj<T> = {};
