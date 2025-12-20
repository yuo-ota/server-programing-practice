import { useEffect, useState } from 'react';
import type { SNSInputOption } from '../interfaces/app/snsInput';
import SelectBox from './SelectBox';
import TextInput from './TextInput';

interface SNSInputProps {
  snsInputOptions: SNSInputOption[];
  groupIndex: number;
  value?: string;
  snsId?: string;
  setInputValue: (snsId: string, value: string, groupIndex: number) => void;
  className?: string;
}

const SNSInput = ({
  snsInputOptions,
  groupIndex,
  value: propValue = '',
  snsId: propSnsId,
  setInputValue,
  className = '',
}: SNSInputProps) => {
  const [activeIndex, setActiveIndex] = useState(-1);
  const [value, setValue] = useState('');

  useEffect(() => {
    setValue(propValue);

    const index = propSnsId
      ? snsInputOptions.findIndex((opt) => opt.id === propSnsId)
      : -1;
    setActiveIndex(index !== -1 ? index : -1);
  }, [propValue, propSnsId, snsInputOptions]);

  const handleSelect = (selectedLabel: string) => {
    const selectedIndex: number = snsInputOptions.findIndex(
      (option) => option.label === selectedLabel
    );
    setActiveIndex(selectedIndex !== -1 ? selectedIndex : -1);
    if (selectedIndex !== -1) {
      setInputValue(snsInputOptions[selectedIndex].id, value, groupIndex);
    } else {
      setInputValue('', '', groupIndex);
    }
  };

  const isOptionSelected = activeIndex !== -1;

  const activeOption =
    isOptionSelected && snsInputOptions.length > activeIndex
      ? snsInputOptions[activeIndex]
      : {
          label: '',
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
        value={activeOption.label || ''}
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
