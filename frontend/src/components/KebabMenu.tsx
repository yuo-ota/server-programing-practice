import { useState } from 'react';
import DotsIcon from '../assets/dots.svg?react';
import IconButton from './IconButton';

interface MenuItem {
  label: string;
  onClick: () => void;
  itemsClassName?: string;
}

interface KebabMenuProps {
  className?: string;
  items: MenuItem[];
}

const KebabMenu = ({ className = '', items }: KebabMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`relative ${className}`}>
      {/* トリガー */}
      <IconButton
        onClick={() => setIsOpen((v) => !v)}
        className="w-12 h-12"
        ButtonIcon={<DotsIcon className="w-1/2 h-1/2"/>}
      />

      {/* メニュー */}
      {isOpen && (
        <ul className="absolute right-0 mt-2 min-w-[160px] rounded-lg bg-background shadow-lg">
          {items.map((item) => (
            <li key={item.label}>
              <button
                onClick={() => {
                  item.onClick();
                  setIsOpen(false);
                }}
                className={`${item.itemsClassName} block w-full px-4 py-2 text-left hover:bg-muted`}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default KebabMenu;
