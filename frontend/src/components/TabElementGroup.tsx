import { useState } from 'react';
import TabElement from './TabElement';

interface TabElementGroupProps {
  tabs: string[];
  className?: string;
  onChange?: (index: number) => void;
}

const TabElementGroup = ({
  tabs,
  className = '',
  onChange,
}: TabElementGroupProps) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleSelect = (index: number) => {
    setSelectedIndex(index);
    onChange?.(index);
  };

  return (
    <div
      className={`grid w-full grid-cols-2 place-items-center gap-x-4 ${className}`}
    >
      {tabs.map((label, index) => (
        <TabElement
          key={label}
          label={label}
          selected={selectedIndex === index}
          onClick={() => handleSelect(index)}
          className="w-24 flex-1"
        />
      ))}
    </div>
  );
};

export default TabElementGroup;
