import { useState } from 'react';
import type { SNSInputOption } from '../interfaces/app/snsInput';
import SelectBox from './SelectBox';
import TextInput from './TextInput';

interface SNSInputProps {
  snsInputOptions: SNSInputOption[];
  groupIndex: number;
  setInputValue: (snsId: string, value: string, groupIndex: number) => void;
  className?: string;
}

const SNSInput = ({
  snsInputOptions,
  groupIndex,
  setInputValue,
  className = '',
}: SNSInputProps) => {
  const [activeIndex, setActiveIndex] = useState(-1);
  const [value, setValue] = useState('');

  const handleSelect = (value: string) => {
    const selectedIndex: number = snsInputOptions.findIndex(
      (option) => option.label === value
    );
    setActiveIndex(selectedIndex !== -1 ? selectedIndex : 0);
  };

  const isOptionSelected = activeIndex !== -1;

  const activeOption =
    isOptionSelected && snsInputOptions.length > activeIndex
      ? snsInputOptions[activeIndex]
      : {
          placeholder: '', // 未選択時のプレースホルダー
          prefix: '',
          id: 'sns-input', // 未選択時のID
        };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (activeIndex === -1) {
      return;
    }
    setValue(e.target.value);
    setInputValue(snsInputOptions[activeIndex].id, e.target.value, groupIndex);
  };

  return (
    <div className={`${className} flex w-full`}>
      <SelectBox
        displayStatus="unrounded-right"
        label=""
        options={snsInputOptions.map((option) => option.label)}
        onSelect={handleSelect}
        className="h-full w-24 flex-none"
      />
      <TextInput
        displayStatus={isOptionSelected ? 'normal' : 'disabled'}
        label=""
        placeholder={activeOption.placeholder}
        prefix={activeOption.prefix}
        isUnroundedLeft
        id={activeOption.id}
        value={value}
        onChange={handleInputChange}
        isSNSInput={true}
        className="-left-[2px] h-full flex-1"
      />
    </div>
  );
};
export default SNSInput;
