import type React from 'react';

interface TopBannerProps {
  leftElement?: React.ReactNode;
  rightElement?: React.ReactNode;
  label?: string;
  className?: string;
}

const TopBanner = ({
  leftElement,
  rightElement,
  label = '',
  className = '',
}: TopBannerProps) => {
  return (
    <div className={`${className} bg-background flex justify-center shadow-md`}>
      <div className="relative flex h-full w-full max-w-[800px] items-center justify-center px-2">
        <div className="absolute left-2">{leftElement}</div>
        <div>{label && <label className="text-subtitle">{label}</label>}</div>
        <div className="absolute right-2">{rightElement}</div>
      </div>
    </div>
  );
};
export default TopBanner;
