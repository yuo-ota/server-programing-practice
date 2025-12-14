import type { SNSInputOption } from "@/interfaces/app/SNSInputOption";
import SNSLinkInputGroup from "./SNSLinkInputGroup";
import TransitionButton from "./TransitionButton";
import { SNSInputOptions } from "@/constants/SNSLinkInputConstants";
import { useState } from "react";

interface SNSLinkInputGroupProps {
  SNSInputOptions: SNSInputOption[];
  className?: string;
}

interface SNSLinkInputValue {
  snsId: string;
  value: string;
}

interface SNSLinkInputListsProps {
  setSNSLinkInputs: React.Dispatch<
    React.SetStateAction<SNSLinkInputValue[]>
  >;
  className?: string;
}

const SNSLinkInputLists = ({ setSNSLinkInputs, className = '' }: SNSLinkInputListsProps) => {
  const [snsInputGroups, setSNSInputGroups] = useState<SNSLinkInputGroupProps[]>([{
    SNSInputOptions: SNSInputOptions,
    className: 'w-9/10 h-11'
  }]);

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

  const handleAddLink = () => {
    setSNSInputGroups(prev => [
      ...prev,
      {
        SNSInputOptions: SNSInputOptions,
        className: 'w-9/10 h-11'
      }
    ]);
  }

  return (
    <>
      <div className={`${className} flex flex-col items-center`}>
        <div className="flex flex-col gap-2.5 mb-2.5">
          {snsInputGroups.map((group, index) => (
            <SNSLinkInputGroup
              key={index}
              {...group}
              setInputValue={setInputValue}
              groupIndex={index}
            />
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