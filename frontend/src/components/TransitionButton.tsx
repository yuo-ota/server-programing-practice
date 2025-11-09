interface TransitionButtonProps {
  displayStatus: 'solid' | 'outline' | 'disabled-solid' | 'attention';
  label: string;
  onClick: () => void;
  className?: string;
}

const TransitionButton = ({
  displayStatus,
  label,
  onClick,
  className = '',
}: TransitionButtonProps) => {
  return (
    <>
      {displayStatus === 'solid' ? (
        <button
          onClick={onClick}
          className={`${className} bg-theme transition-brightness flex items-center justify-center rounded-full shadow-md duration-150 hover:brightness-(--hover-nega-brightness) active:brightness-(--active-nega-brightness)`}
          type="button"
        >
          <p className="text-subtitle text-center">
            <span className="text-background">{label}</span>
          </p>
        </button>
      ) : displayStatus === 'outline' ? (
        <button
          onClick={onClick}
          className={`${className} bg-background border-theme hover:bg-theme/(--hover-opacity) active:bg-theme/(--active-opacity) flex items-center justify-center rounded-full border shadow-md transition-colors duration-150`}
          type="button"
        >
          <p className="text-subtitle text-center">
            <span className="text-foreground">{label}</span>
          </p>
        </button>
      ) : displayStatus === 'disabled-solid' ? (
        <button
          className={`${className} bg-disabled transition-brightness flex items-center justify-center rounded-full shadow-md duration-150`}
          type="button"
        >
          <p className="text-subtitle text-center">
            <span className="text-background">{label}</span>
          </p>
        </button>
      ) : (
        displayStatus === 'attention' && (
          <button
            onClick={onClick}
            className={`${className} bg-background border-error hover:bg-error/(--hover-opacity) active:bg-error/(--active-opacity) flex items-center justify-center rounded-full border shadow-md transition-colors duration-150`}
            type="button"
          >
            <p className="text-subtitle text-center">
              <span className="text-error">{label}</span>
            </p>
          </button>
        )
      )}
    </>
  );
};

export default TransitionButton;
