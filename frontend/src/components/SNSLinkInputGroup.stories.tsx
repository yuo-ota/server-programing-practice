import type { Meta, StoryObj } from '@storybook/react';
import SNSLinkInputGroup from './SNSLinkInputGroup';
import { type ComponentProps } from 'react';
import { SNSInputOptions } from '@/constants/snsLinkInputConstants';

type T = typeof SNSLinkInputGroup;

export default {
  component: SNSLinkInputGroup,
  args: {
    SNSInputOptions: SNSInputOptions,
    setInputValue: () => {},
    groupIndex: 0,
    className: 'w-9/10 h-8',
  },
  render: function Comp(args: ComponentProps<typeof SNSLinkInputGroup>) {
    return (
      <SNSLinkInputGroup
        {...args}
      ></SNSLinkInputGroup>
    );
  },
} satisfies Meta<T>;

export const Default: StoryObj<T> = {};
