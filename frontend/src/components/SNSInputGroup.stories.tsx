import type { Meta, StoryObj } from '@storybook/react';
import { useState, type ComponentProps } from 'react';
import SNSInputGroup from './SNSInputGroup';
import type { SNSInputValue } from '@/interfaces/app/snsInput_1';

type T = typeof SNSInputGroup;

export default {
  component: SNSInputGroup,
  args: {
    className: 'w-full',
  },
  render: function Comp(args: ComponentProps<typeof SNSInputGroup>) {
    const [, setSNSInputs] = useState<SNSInputValue[]>([]);

    return (
      <SNSInputGroup {...args} setSNSInputs={setSNSInputs}></SNSInputGroup>
    );
  },
} satisfies Meta<T>;

export const Default: StoryObj<T> = {};
