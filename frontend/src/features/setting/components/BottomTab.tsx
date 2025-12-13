import TransitionButton from "@/components/TransitionButton";

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
      <div className="fixed bottom-0 left-0 right-0 w-full rounded-t-3xl shadow-md flex flex-col items-center justify-center bg-foreground gap-3 pt-10 pb-6">
        <TransitionButton
          displayStatus="solid"
          label="設定を保存する"
          onClick={handleSaveButtonClick}
          className="w-2/3 h-11"
        />
        <TransitionButton
          displayStatus="outline"
          label="閉じる"
          onClick={handleCloseButtonClick}
          className="w-2/3 h-11"
        />
      </div>
    </>
  );
};

export default BottomTab;
