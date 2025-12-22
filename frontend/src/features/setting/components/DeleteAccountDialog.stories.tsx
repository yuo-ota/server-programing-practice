import type { Meta, StoryObj } from '@storybook/react';
import DeleteAccountDialog from './DeleteAccountDialog';

type T = typeof DeleteAccountDialog;

export default {
  component: DeleteAccountDialog,
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
