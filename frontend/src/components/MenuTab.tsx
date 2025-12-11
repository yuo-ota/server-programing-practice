import HomeIcon from '../assets/home.svg?react';
import NotificationIcon from '../assets/notification.svg?react';
import UserIcon from '../assets/UserIconDefault.svg?react';
import reportIcon from '../assets/report.svg?react';
import IconButton from './IconButton';

interface MenuTabProps {
  className?: string;
  displayStatus: 'normal' | 'admin';
}

const MenuTab = ({ className = '', displayStatus }: MenuTabProps) => {
  const menuItems =
    displayStatus === 'admin'
      ? [reportIcon] // admin の場合
      : [HomeIcon, NotificationIcon, UserIcon]; // normal の場合

  return (
    <>
      <div
        className={`${className} flex h-17 w-full items-center justify-around`}
      >
        {menuItems.map((Icon, i) => (
          <IconButton
            key={i}
            onClick={() => {}}
            className="h-12 w-12"
            ButtonIcon={<Icon />}
          />
        ))}
      </div>
    </>
  );
};

export default MenuTab;
