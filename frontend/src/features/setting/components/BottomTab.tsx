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
      <div className="bg-background shadow-up fixed bottom-0 inset-x-0 items-center justify-center rounded-t-3xl ">
        <div className="py-8 w-full gap-3 flex flex-col items-center justify-center px-8">
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
