import HomeIcon from '../assets/home.svg?react';
import NotificationIcon from '../assets/notification.svg?react';
import UserIcon from '../assets/userIconDefault.svg?react';
import SettingIcon from '../assets/setting.svg?react';
import PostIcon from '../assets/post.svg?react';
import ReportIcon from '../assets/report.svg?react';

interface IconButtonProps {
    displayStatus: 'home' | 'notification' | 'userIcon' | 'setting' | 'post' | 'report' ;
    onClick: () => void;
    className?: string;
}

const IconButton = ({displayStatus, onClick, className = '',}: IconButtonProps) => {
  return (
    <>
    {displayStatus === 'home' ?(
      <button
        onClick={onClick}
        className={`${className}  h-12 w-12 bg-background flex items-center justify-center rounded-full transition-brightness duration-150 hover:brightness-(--hover-nega-brightness) active:brightness-(--active-nega-brightness)`}
        type="button"
      >
        <HomeIcon className="h-10 w-10"/>
      </button>
    ) : displayStatus === 'notification' ?(
      <button
        onClick={onClick}
        className={`${className} h-12 w-12 bg-background flex items-center justify-center rounded-full transition-brightness duration-150 hover:brightness-(--hover-nega-brightness) active:brightness-(--active-nega-brightness)`}
        type="button"
      >
        <NotificationIcon className="h-10 w-10"/>
      </button>
    ) : displayStatus === 'userIcon' ?(
      <button
        onClick={onClick}
        className={`${className} h-10 w-10 bg-background flex items-center justify-center rounded-full transition-brightness duration-150 hover:brightness-(--hover-nega-brightness) active:brightness-(--active-nega-brightness)`}
        type="button"
      >
        <UserIcon className="h-10 w-10"/>
      </button>
    ) : displayStatus === 'setting' ?(
      <button
        onClick={onClick}
        className={`${className} h-15 w-15 bg-background flex items-center justify-center rounded-full transition-brightness duration-150 hover:brightness-(--hover-nega-brightness) active:brightness-(--active-nega-brightness)`}
        type="button"
      >
        <SettingIcon className=" h-11 w-11 "/>
      </button>
    ) : displayStatus === 'post' ?(
      <button
        onClick={onClick}
        className={`${className} h-12 w-12 bg-background flex items-center justify-center rounded-full transition-brightness duration-150 hover:brightness-(--hover-nega-brightness) active:brightness-(--active-nega-brightness)`}
        type="button"
      >
        <PostIcon className="h-12 w-12 "/>
      </button>
    ) : (displayStatus === 'report' && (
      <button
        onClick={onClick}
        className={`${className} h-12 w-12 bg-background flex items-center justify-center rounded-full transition-brightness duration-150 hover:brightness-(--hover-nega-brightness) active:brightness-(--active-nega-brightness)`}
        type="button"
      >
        <ReportIcon className="h-8 w-8"/>
      </button>
    ))}
    </>
  )
}

export default IconButton;