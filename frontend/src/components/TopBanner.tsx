import BannerButton from './BannerButton';
import IconButton from './IconButton';
import SettingIcon from '../assets/allowLeft.svg?react';

interface TopBannerProps {
  displayStatus: 'normal' | 'new_tab';
  label?: string;
  isAbleReturn?: boolean;
  bannerButoonStatus: 'solid' | 'attention';
  bannerButoonLabel?: string;
  onClick: () => void;
  className?: string;
}

const TopBanner = ({
  displayStatus,
  label = '',
  isAbleReturn,
  bannerButoonStatus,
  bannerButoonLabel = '',
  onClick,
  className = '',
}: TopBannerProps) => {
  return (
    <div
      className={`${className} flex w-full items-center justify-between shadow-md`}
    >
      <div className="pl-2">
        {displayStatus === 'normal'
          ? isAbleReturn && (
              <IconButton
                onClick={onClick}
                ButtonIcon={<SettingIcon className={`h-5 w-5`} />}
                className=""
              />
            )
          : displayStatus === 'new_tab' && (
              <BannerButton
                displayStatus="cancel"
                label="キャンセル"
                onClick={onClick}
                className=""
              />
            )}
      </div>
      <div className="">
        {displayStatus === 'normal' && (
          <label className="text-subtitle">{label}</label>
        )}
      </div>
      <div className="pr-2">
        {displayStatus === 'new_tab' && (
          <BannerButton
            displayStatus={bannerButoonStatus}
            label={bannerButoonLabel}
            onClick={onClick}
            className=""
          />
        )}
      </div>
    </div>
  );
};
export default TopBanner;
