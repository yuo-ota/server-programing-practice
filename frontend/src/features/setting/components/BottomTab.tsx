import TransitionButton from '@/components/TransitionButton';

interface BottomTabProps {
  handleSaveButtonClick: () => void;
  handleCloseButtonClick: () => void;
}

const BottomTab = ({
  handleSaveButtonClick,
  handleCloseButtonClick,
}: BottomTabProps) => {
  return (
    <>
      <div className="bg-background shadow-up fixed inset-x-0 bottom-0 items-center justify-center rounded-t-3xl">
        <div className="flex w-full flex-col items-center justify-center gap-3 px-8 py-8">
          <TransitionButton
            displayStatus="solid"
            label="設定を保存する"
            onClick={handleSaveButtonClick}
            className="h-11 w-full"
          />
          <TransitionButton
            displayStatus="outline"
            label="閉じる"
            onClick={handleCloseButtonClick}
            className="h-11 w-full"
          />
        </div>
      </div>
    </>
  );
};

export default BottomTab;
