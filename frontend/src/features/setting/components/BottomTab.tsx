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
      <div className="bg-background shadow-up fixed right-0 bottom-0 left-0 flex h-40 w-full flex-col items-center justify-center gap-3 rounded-t-3xl">
        <TransitionButton
          displayStatus="solid"
          label="設定を保存する"
          onClick={handleSaveButtonClick}
          className="h-11 w-2/3"
        />
        <TransitionButton
          displayStatus="outline"
          label="閉じる"
          onClick={handleCloseButtonClick}
          className="h-11 w-2/3"
        />
      </div>
    </>
  );
};

export default BottomTab;
