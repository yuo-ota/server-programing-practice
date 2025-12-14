import { type ReactNode } from 'react';

interface IconButtonProps {
  onClick: () => void;
  className?: string;
  ButtonIcon: ReactNode;
}

const IconButton = ({
  onClick,
  ButtonIcon,
  className = '',
}: IconButtonProps) => {
  return (
    <>
      <button
        onClick={onClick}
        className={`${className} bg-background transition-brightness flex items-center justify-center rounded-full duration-150 hover:brightness-(--hover-nega-brightness) active:brightness-(--active-nega-brightness)`}
        type="button"
      >
        {ButtonIcon}
      </button>
    </>
  );
};

export default IconButton;
