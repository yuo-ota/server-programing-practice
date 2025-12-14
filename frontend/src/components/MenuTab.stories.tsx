import type { Meta, StoryObj } from '@storybook/react';
import MenuTab from './MenuTab.tsx';
import HomeIcon from '../assets/home.svg?react';
import NotificationIcon from '../assets/notification.svg?react';
import UserIcon from '../assets/UserIconDefault.svg?react';
import reportIcon from '../assets/report.svg?react';
import IconButton from './IconButton';

type T = typeof MenuTab;

export default {
  component: MenuTab,
  args: {
    buttons: [
      <IconButton
        onClick={() => {}}
        className='h-12 w-12'
        ButtonIcon={<HomeIcon className='h-[80%] w-[80%]'/>}
      />,
      <IconButton
        onClick={() => {}}
        className='h-12 w-12'
        ButtonIcon={<NotificationIcon className='h-[80%] w-[80%]'/>}
      />,
      <IconButton
        onClick={() => {}}
        className='h-12 w-12'
        ButtonIcon={<UserIcon className='h-[80%] w-[80%]'/>}
      />
    ],
    className: '',
  },
} satisfies Meta<T>;

export const Default: StoryObj<T> = {};
