interface TabElementProps {
  label: string;
  selected: boolean;
  onClick: () => void;
  className?: string;
}

const TabElement = ({
  label,
  selected,
  onClick,
  className = '',
}: TabElementProps) => {
  return (
    <>
      <button
        onClick={onClick}
        className={`${className} border-b-4 ${selected ? 'border-theme' : 'border-transparent'} bg-background flex min-h-11 max-w-48 items-center justify-center hover:brightness-(--hover-nega-brightness) active:brightness-(--active-nega-brightness)`}
        type="button"
      >
        <p className="text-subtitle">{label}</p>
      </button>
    </>
  );
};

export default TabElement;
