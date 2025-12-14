import { type ReactNode } from 'react';

interface MenuTabProps {
  className?: string;
  buttons: ReactNode[];
}

const MenuTab = ({ className = '', buttons , }: MenuTabProps) => {

  return (
      <div
        className={`${className} flex h-17 w-full items-center justify-around`}
      >
        {buttons.map((item, i) => (
          <div key={`menuItems-${i}`}>
            {item}
          </div>
        ))}
      </div>
  );
};

export default MenuTab;
