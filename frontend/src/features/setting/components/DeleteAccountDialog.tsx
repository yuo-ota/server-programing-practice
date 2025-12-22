import TransitionButton from '@/components/TransitionButton';
import { useCallback, useEffect, useRef } from 'react';

interface DialogProps {
  isOpen: boolean;
  onButtonClick: () => void;
  onClose?: () => void;
  questionText: string;
  leftText: string;
  rightText: string;
  className?: string;
}

const DeleteAccountDialog = ({
  isOpen,
  onButtonClick,
  onClose,
  questionText,
  leftText,
  rightText,
  className = '',
}: DialogProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect((): void => {
    const dialogElement = dialogRef.current;
    if (!dialogElement) return;

    if (isOpen) {
      if (dialogElement.hasAttribute('open')) {
        return;
      }
      dialogElement.showModal();
    } else {
      if (!dialogElement.hasAttribute('open')) {
        return;
      }
      dialogElement.close();
    }
  }, [isOpen]);

  const onCloseDialog = useCallback((): void => {
    onClose?.();
  }, [onClose]);

  const handleClickContent = useCallback(
    (event: React.MouseEvent<HTMLDivElement>): void => {
      event.stopPropagation();
    },
    []
  );

  return (
    <>
      <dialog
        ref={dialogRef}
        className={`m-auto w-full max-w-md rounded-lg bg-white p-6 shadow-lg ${className}`}
        onClick={onCloseDialog}
      >
        <div onClick={handleClickContent}>{questionText}</div>
        <div className="flex justify-between">
          <TransitionButton
            displayStatus='attention'
            label={leftText}
            onClick={onButtonClick}
            className="mt-4 w-20 h-8"
          />
          <TransitionButton
            displayStatus='outline'
            label={rightText}
            onClick={onCloseDialog}
            className="mt-4 w-20 h-8"
          />
          </div>
      </dialog>
    </>
  );
};

export default DeleteAccountDialog;
