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
    <div
      className={`${className} bg-background shadow-md flex justify-center`}
    >
      <div className="max-w-[800px] h-full relative flex w-full items-center justify-center px-2">
        <div className="absolute left-2">{leftElement}</div>
        <div>
          {label && (
            <label className="text-subtitle">{label}</label>
          )}
        </div>
        <div className="absolute right-2">{rightElement}</div>
      </div>
    </div>
  );
};
export default TopBanner;
