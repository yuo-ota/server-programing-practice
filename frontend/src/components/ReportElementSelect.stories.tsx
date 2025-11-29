import type { Meta, StoryObj } from '@storybook/react';
import ReportElementSelect from './ReportElementSelect';

type T = typeof ReportElementSelect;

export default {
  component: ReportElementSelect,
  args: {
    className: '',
  },
} satisfies Meta<T>;

export const Default: StoryObj<T> = {};
