import RadioButton from './RadioButton';

interface RadioButtonGroupProps {
  groupName: string;
  options: string[];
  value: string;
  disabled?: boolean;
  onSelect: (newValue: string) => void;
  className?: string;
}

const RadioButtonGroup = ({
  groupName,
  options,
  value,
  disabled = false,
  onSelect,
  className = '',
}: RadioButtonGroupProps) => {
  const handleChange = (label: string) => {
    if (onSelect) {
      onSelect(label);
    }
  };

  return (
    <div className={`${className} flex`}>
      {options.map((label, index) => {
        const uniqueId = `${groupName}-${index}`;
        const isChecked = value === label;

        return (
          <RadioButton
            key={uniqueId}
            id={uniqueId}
            name={groupName}
            label={label}
            checked={isChecked}
            disabled={disabled}
            onChange={() => {
              if (!disabled) {
                handleChange(label);
              }
            }}
          />
        );
      })}
    </div>
  );
};
export default RadioButtonGroup;
