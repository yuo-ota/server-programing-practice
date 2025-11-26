import { useState } from 'react';

interface TabElementProps {
  label: string;
  className?: string;
}

const TabElement = ({ label, className = '' }: TabElementProps) => {
  const [selected, setSelected] = useState(false);
  return (
    <>
      <button
        onClick={() => setSelected((prev) => !prev)}
        className={`${className} border-b-4 ${selected ? 'border-theme' : 'border-transparent'} bg-background flex items-center justify-center hover:brightness-(--hover-nega-brightness) active:brightness-(--active-nega-brightness)`}
        type="button"
      >
        <p className={``}>{label}</p>
      </button>
    </>
  );
};

export default TabElement;
