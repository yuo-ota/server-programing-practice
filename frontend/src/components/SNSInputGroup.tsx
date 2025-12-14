import { useState } from 'react';
import type {
  SNSInputGroupValue,
  SNSInputValue,
} from '@/interfaces/app/snsInput';
import { initSNSInputValues } from '@/constants/snsInputConstants';
import TransitionButton from './TransitionButton';
import SNSInput from './SNSInput';

interface SNSInputGroupProps {
  setSNSInputs: React.Dispatch<React.SetStateAction<SNSInputValue[]>>;
  className?: string;
}

const SNSInputGroup = ({
  setSNSInputs,
  className = '',
}: SNSInputGroupProps) => {
  const [snsInputValues, setSNSInputValues] = useState<SNSInputGroupValue[]>([
    initSNSInputValues,
  ]);

  /**
   * 各SNSリンク入力欄の値を設定する
   * @param snsId
   * @param value
   * @param inputIndex
   */
  const setInputValue = (snsId: string, value: string, inputIndex: number) => {
    const newValue: SNSInputValue = { snsId, value };
    setSNSInputs((prev) => {
      const next = [...prev];

      next[inputIndex] = {
        ...(next[inputIndex] ?? {}),
        ...newValue,
      };

      return next;
    });
  };

  /**
   * リンク入力欄を追加する
   */
  const handleAddLink = () => {
    setSNSInputValues((prev) => [...prev, initSNSInputValues]);
  };

  return (
    <>
      <div className={`${className} flex flex-col items-center`}>
        <div className="mb-2.5 flex flex-col gap-2.5">
          {snsInputValues.map((snsInputValue, index) => (
            <SNSInput
              {...snsInputValue}
              setInputValue={setInputValue}
              groupIndex={index}
            />
          ))}
        </div>
        <TransitionButton
          displayStatus={'outline'}
          label={'リンクを追加'}
          onClick={handleAddLink}
          className="h-8 w-56"
        />
      </div>
    </>
  );
};

export default SNSInputGroup;
