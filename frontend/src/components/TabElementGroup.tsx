import { useState } from 'react';
import TabElement from './TabElement';
interface Tabs {
  label: string;
  onClick: () => void;
}

interface TabElementGroupProps {
  tabs: Tabs[];
  className?: string;
  defaultIndex?: number;
}

const TabElementGroup = ({
  tabs,
  className = '',
  defaultIndex,
}: TabElementGroupProps) => {
  const [selectedIndex, setSelectedIndex] = useState(defaultIndex ?? 0);

  const handleSelect = (index: number) => {
    setSelectedIndex(index);
  };

  return (
    <div
      className={`grid w-full auto-cols-fr grid-flow-col place-items-center gap-x-4 ${className}`}
    >
      {tabs.map((tab, index) => (
        <TabElement
          key={tab.label}
          label={tab.label}
          selected={selectedIndex === index}
          onClick={() => {
            handleSelect(index);
            tab.onClick();
          }}
          className="w-24 flex-1"
        />
      ))}
    </div>
  );
};

export default TabElementGroup;
