interface SimpleButtonProps {
  label: string;
  onClick: () => void;
  className?: string;
}

const SimpleButton = ({
  label,
  onClick,
  className = '',
}: SimpleButtonProps) => {
  return (
    <div className={`${className}`}>
      <button
        onClick={onClick}
        className= "bg-background transition-brightness flex w-full items-center justify-center rounded-full border hover:brightness-(--hover-nega-brightness) active:brightness-(--active-nega-brightness)"
        type="button"
      >
        <p className="text-subtitle mx-4 my-1 text-center">
          <span className="text-foreground">{label}</span>
        </p>
      </button>
    </div>
  );
};

export default SimpleButton;
