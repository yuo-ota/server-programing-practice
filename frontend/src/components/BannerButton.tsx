import CloseIcon from '../assets/close.svg?react';

interface BannerButtonProps {
  displayStatus: 'solid' | 'cancel' | 'attention';
  label: string;
  onClick: () => void;
  className?: string;
}

const BannerButton = ({
  displayStatus,
  label,
  onClick,
  className = '',
}: BannerButtonProps) => {
  return (
    <>
      {displayStatus === 'solid' ? (
        <button
          onClick={onClick}
          className={`${className} bg-theme transition-brightness flex min-w-24 items-center justify-center rounded-full shadow-md duration-150 hover:brightness-(--hover-nega-brightness) active:brightness-(--active-nega-brightness)`}
          type="button"
        >
          <p className="text-subtitle mx-4 my-1 text-center">
            <span className="text-background">{label}</span>
          </p>
        </button>
      ) : displayStatus === 'cancel' ? (
        <button
          onClick={onClick}
          className={`${className} bg-background transition-brightness flex min-w-24 items-center justify-center rounded-full duration-150 hover:brightness-(--hover-nega-brightness) active:brightness-(--active-nega-brightness)`}
          type="button"
        >
          <p className="mx-4 my-1 flex items-center justify-center gap-1">
            <CloseIcon className="inline-block" />
            <span className="text-foreground text-subtitle relative -top-[1px]">
              {label}
            </span>
          </p>
        </button>
      ) : (
        displayStatus === 'attention' && (
          <button
            onClick={onClick}
            className={`${className} bg-background border-error hover:bg-error/(--hover-opacity) active:bg-error/(--active-opacity) flex min-w-24 items-center justify-center rounded-full border shadow-md transition-colors duration-150`}
            type="button"
          >
            <p className="text-subtitle mx-4 my-1 text-center">
              <span className="text-error">{label}</span>
            </p>
          </button>
        )
      )}
    </>
  );
};

export default BannerButton;
