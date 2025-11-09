import InactiveHeartIcon from '../assets/heart_inactive.svg?react';
import ActiveHeartIcon from '../assets/heart_active.svg?react';

interface LikeButtonProps {
  isLiked: boolean;
  onClick: () => void;
  className?: string;
}

const LikeButton = ({ isLiked, onClick, className = '' }: LikeButtonProps) => {
  return (
    <>
      <button
        onClick={onClick}
        className={`${className} hover:bg-theme/(--hover-opacity) active:bg-theme/(--active-opacity) flex items-center justify-center rounded-full transition-colors duration-150`}
        type="button"
      >
        {isLiked ? (
          <ActiveHeartIcon className="fill-theme aspect-square w-3/4" />
        ) : (
          <InactiveHeartIcon className="fill-theme aspect-square w-3/4" />
        )}
      </button>
    </>
  );
};

export default LikeButton;
