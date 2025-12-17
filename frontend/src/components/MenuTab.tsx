import { type ReactNode } from 'react';

interface MenuTabProps {
  className?: string;
  buttons: ReactNode[];
}

const MenuTab = ({ className = '', buttons }: MenuTabProps) => {
  return (
    <div className={`${className} bg-background flex justify-center shadow-md`}>
      <div className="relative flex h-full w-full max-w-[800px] items-center justify-around px-2">
        {buttons.map((item, i) => (
          <div key={`menuItems-${i}`}>{item}</div>
        ))}
      </div>
    </div>
  );
};

export default MenuTab;
