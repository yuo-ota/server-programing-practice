import { useState } from 'react';
import type { SNSInputOption } from '../interfaces/app/SNSInputOption';
import SelectBox from './SelectBox';
import TextInput from './TextInput';

interface SNSLinkInputGroupProps {
  SNSInputOptions: SNSInputOption[];
  value: string;
  defaultSelectedLabel?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

const SNSLinkInputGroup = ({
  SNSInputOptions,
  value,
  defaultSelectedLabel,
  onChange,
  className = '',
}: SNSLinkInputGroupProps) => {
  const [selectedLabel, setSelectedLabel] = useState(defaultSelectedLabel || '');

  const activeIndex = selectedLabel
    ? SNSInputOptions.findIndex(option => option.label === selectedLabel)
    : -1;

  const handleSelect = (newLabel: string) => {
    setSelectedLabel(newLabel);
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

  return (
    <div className={`${className} flex`}>
      <SelectBox
        displayStatus="unrounded-right"
        label=""
        options={SNSInputOptions.map((option) => option.label)}
        value={selectedLabel}
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
        onChange={onChange}
        className="-left-[2px] h-full w-80"
      />
    </div>
  );
};
export default SNSLinkInputGroup;
