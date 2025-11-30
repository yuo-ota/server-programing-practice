import { useState } from 'react';
import type { SNSInputOption } from '../interfaces/app/SNSInputOption';
import SelectBox from './SelectBox';
import TextInput from './TextInput';

interface SNSLinkInputGroupProps {
  SNSInputOptions: SNSInputOption[];
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

const SNSLinkInputGroup = ({
  SNSInputOptions,
  value,
  onChange,
  className = '',
}: SNSLinkInputGroupProps) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleSelect = (value: string) => {
    const selectedIndex: number = SNSInputOptions.findIndex(
      (option) => option.label === value
    );
    setActiveIndex(selectedIndex !== -1 ? selectedIndex : 0);
  };

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
        displayStatus="unrounded-left"
        label=""
        placeholder={SNSInputOptions[activeIndex].placeholder}
        prefix={SNSInputOptions[activeIndex].prefix}
        id={SNSInputOptions[activeIndex].id}
        value={value}
        onChange={onChange}
        className="-left-[2px] h-full w-80"
      />
    </div>
  );
};
export default SNSLinkInputGroup;
