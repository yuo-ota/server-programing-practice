import { isValidElement, type ReactNode } from 'react';

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

  const hasIconClass =
  isValidElement(ButtonIcon) &&
  typeof (ButtonIcon.props as {className?: string }).className === "string" &&
  (ButtonIcon.props as { className?: string }).className!.trim() !== "";

  return (
    <>
      <button
        onClick={onClick}
        className={`${className} bg-background transition-brightness flex items-center justify-center rounded-full duration-150 hover:brightness-(--hover-nega-brightness) active:brightness-(--active-nega-brightness)`}
        type="button"
      >
        <div
        className={`flex items-center justify-center ${
          hasIconClass ? "" : "w-[80%] h-[80%]"}`}>
          {ButtonIcon}
        </div>
      </button>
    </>
  );
};

export default IconButton;
