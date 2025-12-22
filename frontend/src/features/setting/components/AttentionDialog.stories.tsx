import type { Meta, StoryObj } from '@storybook/react';
import AttentionDialog from './AttentionDialog';

type T = typeof AttentionDialog;

export default {
  component: AttentionDialog,
  args: {
    isOpen: false,
    onClose: undefined,
    questionText: 'This is a dialog',
    leftText: 'Delete',
    rightText: 'Cancel',
    className: '',
  },
} satisfies Meta<T>;

export const Default: StoryObj<T> = {};
