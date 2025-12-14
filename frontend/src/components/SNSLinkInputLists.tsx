import { useState } from "react";
import type { SNSLinkInputGroupValue, SNSLinkInputValue } from "@/interfaces/app/snsInputOption";
import { initSNSLinkInputValues } from "@/constants/snsLinkInputConstants";
import TransitionButton from "./TransitionButton";
import SNSLinkInputGroup from "./SNSLinkInputGroup";

interface SNSLinkInputListsProps {
  setSNSLinkInputs: React.Dispatch<
    React.SetStateAction<SNSLinkInputValue[]>
  >;
  className?: string;
}

const SNSLinkInputLists = ({ setSNSLinkInputs, className = '' }: SNSLinkInputListsProps) => {
  const [snsInputGroups, setSNSInputGroups] = useState<SNSLinkInputGroupValue[]>([initSNSLinkInputValues]);

  /**
   * 各SNSリンク入力欄の値を設定する
   * @param snsId
   * @param value
   * @param groupIndex
   */
  const setInputValue = (snsId: string, value: string, groupIndex: number) => {
    const newValue: SNSLinkInputValue = { snsId, value };
    setSNSLinkInputs(prev => {
      const next = [...prev];

      next[groupIndex] = {
        ...(next[groupIndex] ?? {}),
        ...newValue,
      };

      return next;
    });
  }

  /**
   * リンク入力欄を追加する
   */
  const handleAddLink = () => {
    setSNSInputGroups(prev => [
      ...prev,
      initSNSLinkInputValues
    ]);
  }

  return (
    <>
      <div className={`${className} flex flex-col items-center`}>
        <div className="flex flex-col gap-2.5 mb-2.5">
          {snsInputGroups.map((group, index) => (
            <SNSLinkInputGroup
              {...group}
              setInputValue={setInputValue}
              groupIndex={index}            />
          ))}
        </div>
        <TransitionButton
          displayStatus={"outline"}
          label={"リンクを追加"}
          onClick={handleAddLink}
          className="w-56 h-8"
        />
      </div>
    </>
  );
};

export default SNSLinkInputLists;