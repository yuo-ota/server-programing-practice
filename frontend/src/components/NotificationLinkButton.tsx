import { useNavigate } from "react-router-dom";

interface NotificationLinkButtonProps {
  label: string;
  onClick: () => void;
  className?: string;
}

const NotificationLinkButton = ({
  label,
  onClick,
  className = "",
}: NotificationLinkButtonProps) => {
  return (
    <>
      <button
        type="button"
        className={`${className} flex justify-between items-center border rounded-full bg-background px-4 py-2 hover:bg-hover`}
        onClick={onClick}
      >
        <p>{label}</p>
        <p className="rotate-180">←</p>
      </button>
    </>
  );
};

export default NotificationLinkButton;