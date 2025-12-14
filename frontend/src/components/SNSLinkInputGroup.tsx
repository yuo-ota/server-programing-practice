import { useState } from 'react';
import type { SNSInputOption } from '../interfaces/app/SNSInputOption';
import SelectBox from './SelectBox';
import TextInput from './TextInput';

interface SNSLinkInputGroupProps {
  SNSInputOptions: SNSInputOption[];
  groupIndex: number;
  setInputValue: (sns: string, value: string, groupIndex: number) => void;
  className?: string;
}

const SNSLinkInputGroup = ({
  SNSInputOptions,
  groupIndex,
  setInputValue,
  className = '',
}: SNSLinkInputGroupProps) => {
  const [activeIndex, setActiveIndex] = useState(-1);
  const [value, setValue] = useState('');

  const handleSelect = (value: string) => {
    const selectedIndex: number = SNSInputOptions.findIndex(
      (option) => option.label === value
    );
    setActiveIndex(selectedIndex !== -1 ? selectedIndex : 0);
  };

  const isOptionSelected = activeIndex !== -1;

  const activeOption =
    isOptionSelected && SNSInputOptions.length > activeIndex
      ? SNSInputOptions[activeIndex]
      : {
          placeholder: '', // 未選択時のプレースホルダー
          prefix: '',
          id: 'sns-link-input', // 未選択時のID
        };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (activeIndex === -1) {
      return;
    }
    setValue(e.target.value);
    setInputValue(SNSInputOptions[activeIndex].id, e.target.value, groupIndex);
  }

  return (
    <div className={`${className} flex`}>
      <SelectBox
        displayStatus="unrounded-right"
        label=""
        options={SNSInputOptions.map((option) => option.label)}
        onSelect={handleSelect}
        className="h-full w-24"
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
        className="-left-[2px] h-full w-80"
      />
    </div>
  );
};
export default SNSLinkInputGroup;
