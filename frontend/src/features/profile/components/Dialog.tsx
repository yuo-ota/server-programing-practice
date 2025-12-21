import SimpleButton from '@/components/SimpleButton';
import { useCallback, useEffect, useRef } from 'react';

interface DialogProps {
  isOpen: boolean;
  onButtonClick?: () => void;
  onClose?: () => void;
  text: string;
  className?: string;
}

const Dialog = ({
  isOpen,
  onButtonClick,
  onClose,
  text,
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
        <div onClick={handleClickContent}>{text}</div>
        <SimpleButton
          label="リンク先を開く"
          onClick={onButtonClick!}
          className="mt-4"
        />
        <SimpleButton label="閉じる" onClick={onCloseDialog} className="mt-4" />
      </dialog>
    </>
  );
};

export default Dialog;
