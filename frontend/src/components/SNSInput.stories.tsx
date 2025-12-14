import type { Meta, StoryObj } from '@storybook/react';
import SNSInputGroup from './SNSInput';
import { type ComponentProps } from 'react';
import { initSNSInputValues } from '@/constants/snsInputConstants';

type T = typeof SNSInputGroup;

export default {
  component: SNSInputGroup,
  args: {
    ...initSNSInputValues,
    setInputValue: () => {},
    groupIndex: 0,
  },
  render: function Comp(args: ComponentProps<typeof SNSInputGroup>) {
    return <SNSInputGroup {...args}></SNSInputGroup>;
  },
} satisfies Meta<T>;

export const Default: StoryObj<T> = {};
