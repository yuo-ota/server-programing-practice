import { useEffect, useState } from 'react';
import type {
  SNSInputGroupValue,
  SNSInputValue,
} from '@/interfaces/app/snsInput';
import { initSNSInputValues } from '@/constants/snsInputConstants';
import TransitionButton from './TransitionButton';
import SNSInput from './SNSInput';

interface SNSInputGroupProps {
  setSNSInputs: React.Dispatch<React.SetStateAction<SNSInputValue[]>>;
  SNSInputs?: SNSInputValue[];
  className?: string;
}

const SNSInputGroup = ({
  setSNSInputs,
  SNSInputs = [],
  className = '',
}: SNSInputGroupProps) => {
  const [snsInputValues, setSNSInputValues] = useState<SNSInputGroupValue[]>([
    initSNSInputValues,
  ]);

  useEffect(() => {
    const desired = Math.max(1, SNSInputs.length);
    setSNSInputValues((prev) => {
      if (prev.length === desired) return prev;
      if (prev.length < desired) {
        return [
          ...prev,
          ...Array(desired - prev.length).fill(initSNSInputValues),
        ];
      }
      return prev.slice(0, desired);
    });
  }, [SNSInputs]);

  /**
   * 各SNSリンク入力欄の値を設定する
   * @param snsId
   * @param value
   * @param inputIndex
   */
  const setInputValue = (snsId: string, value: string, inputIndex: number) => {
    const newValue: SNSInputValue = {
      platform_id: undefined,
      identifier: value,
      snsId,
      value,
    };
    setSNSInputs((prev) => {
      const next = [...prev];

      // 存在しないインデックスなら空の要素を埋める
      if (!next[inputIndex]) {
        next[inputIndex] = {
          platform_id: undefined,
          identifier: '',
          snsId: '',
          value: '',
        };
      }

      next[inputIndex] = {
        ...(next[inputIndex] ?? {}),
        ...newValue,
      };

      return next as SNSInputValue[];
    });
  };

  /**
   * リンク入力欄を追加する
   */
  const handleAddLink = () => {
    setSNSInputValues((prev) => [...prev, initSNSInputValues]);
    setSNSInputs((prev) => [
      ...prev,
      { platform_id: undefined, identifier: '', snsId: '', value: '' },
    ]);
  };

  return (
    <>
      <div className={`${className} flex w-full flex-col items-center`}>
        <div className="mb-2.5 flex w-full flex-col gap-2.5">
          {snsInputValues.map((snsInputValue, index) => (
            <SNSInput
              {...snsInputValue}
              value={SNSInputs?.[index]?.value}
              snsId={SNSInputs?.[index]?.snsId}
              setInputValue={setInputValue}
              groupIndex={index}
              key={`SNSInput-${index}`}
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
