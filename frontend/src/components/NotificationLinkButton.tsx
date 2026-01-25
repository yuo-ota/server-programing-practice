interface NotificationLinkButtonProps {
  label: string;
  onClick: () => void;
  className?: string;
}

const NotificationLinkButton = ({
  label,
  onClick,
  className = '',
}: NotificationLinkButtonProps) => {
  return (
    <>
      <button
        type="button"
        className={`${className} bg-background hover:bg-hover flex items-center justify-between rounded-full border px-4 py-2`}
        onClick={onClick}
      >
        <p>{label}</p>
        <p className="rotate-180">←</p>
      </button>
    </>
  );
};

export default NotificationLinkButton;
