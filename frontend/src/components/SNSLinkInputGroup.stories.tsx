import type { Meta, StoryObj } from '@storybook/react';
import SNSLinkInputGroup from './SNSLinkInputGroup';
import type { SNSInputOption } from '../interfaces/app/SNSInputOption';

type T = typeof SNSLinkInputGroup;
const SNSInputOptions: SNSInputOption[] = [
  {
    label: 'X',
    placeholder: 'example',
    prefix: 'https://x.com/',
    id: 'x',
  },
  {
    label: 'Instagram',
    placeholder: 'example',
    prefix: 'https://www.instagram.com/',
    id: 'instagram',
  },
  {
    label: 'pixiv',
    placeholder: 'https://www.pixiv.net/users/example',
    prefix: '',
    id: 'pixiv',
  },
  {
    label: 'skeb',
    placeholder: 'example',
    prefix: 'https://skeb.jp/@',
    id: 'skeb',
  },
  {
    label: 'Bluesky',
    placeholder: 'example',
    prefix: 'https://bsky.app/profile/',
    id: 'bluesky',
  },
];

export default {
  component: SNSLinkInputGroup,
  args: {
    SNSInputOptions: SNSInputOptions,
    value: '',
    className: 'w-9/10 h-8',
  },
} satisfies Meta<T>;

export const Default: StoryObj<T> = {};
