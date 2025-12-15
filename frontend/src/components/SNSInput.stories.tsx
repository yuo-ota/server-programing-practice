import type { Meta, StoryObj } from '@storybook/react';
import SNSInput from './SNSInput';
import { type ComponentProps } from 'react';
import { initSNSInputValues } from '@/constants/snsInputConstants';

type T = typeof SNSInput;

export default {
  component: SNSInput,
  args: {
    ...initSNSInputValues,
    setInputValue: () => {},
    groupIndex: 0,
  },
  render: function Comp(args: ComponentProps<typeof SNSInput>) {
    return <SNSInput {...args}></SNSInput>;
  },
} satisfies Meta<T>;

export const Default: StoryObj<T> = {};
