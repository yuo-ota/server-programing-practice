import { useState } from "react";
import ExpansionIcon from "../assets/expansion.svg?react";

interface SelectBoxProps {
  displayStatus: 'normal' | 'unrounded-right'
  label: string;
  options: string[];
  onSelect: (value: string) => void;
  className?: string;
}

const SelectBox = ({ displayStatus, label, options, onSelect, className = "" }: SelectBoxProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(label);

  const handleSelect = (value: string) => {
    setSelected(value);
    onSelect(value);
    setIsOpen(false);
  };

  return (
    <div className={`${className} relative inline-block min-w-20 min-h-11`}>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className={`bg-background border-foreground border w-full px-3 py-2 flex items-center justify-between transition-brightness duration-150 hover:brightness-(--hover-nega-brightness) active:brightness-(--active-nega-brightness)
          ${displayStatus === 'unrounded-right' ? "rounded-l-lg" : "rounded-lg"}`}
        type="button"
      >
        <span className={`text-subtitle ${selected === label ? "text-placeholder":"text-foreground"}`}>{selected}</span>
        <ExpansionIcon
          className={`h-4 w-4 transition-transform duration-200 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>

      {isOpen && (
        <ul className="bg-background border border-foreground absolute left-0 mt-1 w-full rounded-lg shadow-lg overflow-hidden z-10 overflow-y-auto max-h-[calc(2.5rem*7)]">
          {options.map((opt) => (
            <li key={opt}>
              <button
                onClick={() => handleSelect(opt)}
                className={`bg-background block w-full text-left px-3 py-2 transition-brightness duration-150 hover:brightness-(--hover-nega-brightness) active:brightness-(--active-nega-brightness) ${
                  selected === opt ? "text-inactive" : ""
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