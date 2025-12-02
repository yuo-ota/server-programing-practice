import { useState } from 'react';
import DotsIcon from '../assets/dots.svg?react';
import IconButton from './IconButton';

interface MenuItem {
  label: string;
  onClick: () => void;
}

interface KebabMenuProps {
  className?: string;
  items: MenuItem[];
}

const KebabMenu = ({className = '', items,}: KebabMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(prev => !prev);

  const handleSelect = (item: MenuItem) => {
    item.onClick();
    setIsOpen(false);
  };

  return (
    <div className={`relative left-30`}>
      {/* IconButtonの部分 */}
      <IconButton
        onClick={toggleMenu}
        className={`${className}`}
        ButtonIcon={<DotsIcon className={"w-5/6, h-5/6"}/>}
      />

      {/* ドロップダウン */}
      {isOpen &&(
        <ul className="bg-background overflow-hidden absolute origin-top-right -translate-x-full top-0 z-10 mt-1 max-h-[calc(2.5rem*7)] overflow-y-auto rounded-lg shadow-lg">
          {items.map((item) =>(
            <li key = {item.label}>
              <button
                onClick={() => handleSelect(item)}
                className="bg-background transition-brightness w-full block px-3 py-2 text-left duration-150 hover:brightness-(--hover-nega-brightness) active:brightness-(--active-nega-brightness)"
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