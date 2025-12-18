import { type ReactNode } from 'react';

interface IconButtonProps {
  disabled?: boolean;
  onClick: () => void;
  className?: string;
  ButtonIcon: ReactNode;
}

const IconButton = ({
  disabled = false,
  onClick,
  ButtonIcon,
  className = '',
}: IconButtonProps) => {
  const handleClick = () => {
    if (disabled) return;
    onClick();
  };

  return (
    <>
      <button
        onClick={handleClick}
        className={`${className} bg-background transition-brightness flex items-center justify-center rounded-full duration-150 ${disabled ? 'cursor-not-allowed opacity-50' : 'hover:brightness-(--hover-nega-brightness) active:brightness-(--active-nega-brightness)'}`}
        type="button"
      >
        {ButtonIcon}
      </button>
    </>
  );
};

export default IconButton;
