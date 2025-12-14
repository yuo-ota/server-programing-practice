import type { SNSInputOption } from "@/interfaces/app/snsInputOption";

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

export const initSNSLinkInputValues = {
  snsInputOptions: snsInputOptions,
  className: 'w-9/10 h-11'
};