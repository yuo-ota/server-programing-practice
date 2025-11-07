import HeartIcon from "../assets/heart.svg?react";

interface LikeButtonProps {
  isLiked: boolean;
  onClick: () => void;
  className?: string;
}

const LikeButton = ({ isLiked, onClick, className="" }: LikeButtonProps) => {
  return (
    <>
      <button
        onClick={onClick}
        className={className}
        type="button"
      >
        <HeartIcon
          className="w-30 h-30 stroke-1"
          style={{ fill: isLiked ? "red" : "none", stroke: isLiked ? "red" : "black" }}
        />
      </button>
    </>
  );
};

export default LikeButton;
