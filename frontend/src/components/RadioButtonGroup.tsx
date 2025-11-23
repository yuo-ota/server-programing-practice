import { useState } from 'react';
import RadioButton from './RadioButton';

interface RadioButtonGroupProps {
  groupName: string;
  options: string[];
  initialValue: string;
  onChange?: (newValue: string) => void;
  className?: string;
}

const RadioButtonGroup = ({
  groupName,
  options,
  initialValue,
  onChange,
  className = '',
}: RadioButtonGroupProps) => {
  const [selectedValue, setSelectedValue] = useState(initialValue);

  const handleChange = (label: string) => {
    setSelectedValue(label);

    if (onChange) {
      onChange(label);
    }
  };

  return (
    <div className={`${className} flex`}>
      {options.map((label, index) => {
        const uniqueId = `${groupName}-${index}`;
        const isChecked = selectedValue === label;

        return (
          <RadioButton
            key={uniqueId}
            id={uniqueId}
            name={groupName}
            label={label}
            checked={isChecked}
            onChange={() => handleChange(label)}
          />
        );
      })}
    </div>
  );
};
export default RadioButtonGroup;
