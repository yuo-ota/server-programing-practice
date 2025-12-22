import type { SNSInputOption } from '@/interfaces/app/snsInput';

export const snsInputOptions: SNSInputOption[] = [
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
    id: 'Instagram',
  },
  {
    label: 'Pixiv',
    placeholder: 'https://www.pixiv.net/users/example',
    prefix: '',
    id: 'Pixiv',
  },
  {
    label: 'Skeb',
    placeholder: 'example',
    prefix: 'https://skeb.jp/@',
    id: 'Skeb',
  },
  {
    label: 'Bluesky',
    placeholder: 'example',
    prefix: 'https://bsky.app/profile/',
    id: 'Bluesky',
  },
];

export const initSNSInputValues = {
  snsInputOptions: snsInputOptions,
  className: 'w-9/10 h-11',
};
