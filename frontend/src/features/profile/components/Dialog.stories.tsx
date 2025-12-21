import type { Meta, StoryObj } from '@storybook/react';
import Dialog from './Dialog';

type T = typeof Dialog;

export default {
  component: Dialog,
  args: {
    isOpen: false,
    onClose: undefined,
    text: 'This is a dialog',
    className: '',
  },
} satisfies Meta<T>;

export const Default: StoryObj<T> = {};
