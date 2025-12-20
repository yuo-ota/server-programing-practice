import { useState } from 'react';
import ExpansionIcon from '../assets/expansion.svg?react';

interface SelectBoxProps {
  displayStatus: 'normal' | 'unrounded-right';
  label: string;
  options: string[];
  value?: string;
  onSelect: (value: string) => void;
  className?: string;
}

const SelectBox = ({
  displayStatus,
  label,
  options,
  value,
  onSelect,
  className = '',
}: SelectBoxProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const selectedDisplayValue = value || label;

  const handleSelect = (newValue: string) => {
    onSelect(newValue);
    setIsOpen(false);
  };

  return (
    <div className={`${className} relative inline-block min-h-11 min-w-20`}>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className={`bg-background border-foreground transition-brightness flex h-full w-full items-center justify-between border px-3 py-2 duration-150 hover:brightness-(--hover-nega-brightness) active:brightness-(--active-nega-brightness) ${displayStatus === 'unrounded-right' ? 'rounded-l-lg' : 'rounded-lg'}`}
        type="button"
      >
        <span
          className={`text-body truncate ${selectedDisplayValue === label ? 'text-placeholder' : 'text-foreground'}`}
        >
          {selectedDisplayValue}
        </span>
        <ExpansionIcon
          className={`h-4 w-4 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : 'rotate-0'
          }`}
        />
      </button>

      {isOpen && (
        <ul className="bg-background border-foreground absolute left-0 z-10 mt-1 max-h-[calc(2.5rem*7)] overflow-hidden overflow-y-auto rounded-lg border shadow-lg">
          {options.map((opt) => (
            <li key={opt}>
              <button
                onClick={() => handleSelect(opt)}
                className={`bg-background transition-brightness block w-full px-3 py-2 text-left duration-150 hover:brightness-(--hover-nega-brightness) active:brightness-(--active-nega-brightness) ${
                  selectedDisplayValue === opt ? 'text-inactive' : ''
                }`}
              >
                {opt}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SelectBox;
