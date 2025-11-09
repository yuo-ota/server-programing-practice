import CloseIcon from '../assets/close.svg?react' ;

interface BannerButtonProps {
  displayStatus: "solid"| "cancel"| "attention";
  label: string;
  onClick: () => void;
  className?: string;
}

const BannerButton = ({displayStatus ,label ,onClick, className = '' }: BannerButtonProps) => {
  return (
    <>
      <button
        onClick={onClick}
        className={`${className} rounded-full flex justify-center items-center `}
        style={{
          backgroundColor:
            displayStatus === "solid"
            ? "var(--color-theme)"
            : "var(--color-background)",
          borderColor:
            displayStatus === "attention"
            ? "var(--color-error)"
            : "var(--color-background)",
          borderWidth:
            displayStatus === "attention" ? 1 : 0,
        }}
        type='button'
      >
        {displayStatus === "solid"?(
          <p className="text-center mx-2.5 my-1">
            <span className="text-background">{label}</span>
          </p>
        ) : displayStatus === "cancel"?(
          <p className="mx-2.5 my-1 flex justify-center items-center gap-0.5">
            <CloseIcon/>
            <span className="text-foreground inline-block">{label}</span>
          </p>
        ) : displayStatus === "attention"&&(
          <p className="text-center mx-2.5 my-1">
            <span className="text-error">{label}</span>
          </p>
        )}
      </button>
    </>
  );
};

export default BannerButton;