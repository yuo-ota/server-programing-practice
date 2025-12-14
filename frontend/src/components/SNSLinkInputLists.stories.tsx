import type { Meta, StoryObj } from '@storybook/react';
import { useEffect, useState, type ComponentProps } from 'react';
import SNSLinkInputLists from './SNSLinkInputLists';

type T = typeof SNSLinkInputLists;

interface SNSLinkInputValue {
  snsId: string;
  value: string;
}

export default {
  component: SNSLinkInputLists,
  args: {
    className: "w-full"
  },
  render: function Comp(args: ComponentProps<typeof SNSLinkInputLists>) {
    const [snsLinkInputs, setSNSLinkInputs] = useState<SNSLinkInputValue[]>([]);

    useEffect(() => {
      console.log(snsLinkInputs);
    }, [snsLinkInputs]);

    return (
      <SNSLinkInputLists
        {...args}
        setSNSLinkInputs={setSNSLinkInputs}
      ></SNSLinkInputLists>
    );
  },
} satisfies Meta<T>;

export const Default: StoryObj<T> = {};
