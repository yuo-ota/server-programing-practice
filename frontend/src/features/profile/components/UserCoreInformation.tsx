import type { ReactNode } from 'react';

interface UserCoreInformationProps {
  icon: ReactNode;
  name: string;
  userId: string;
  className?: string;
}

const UserCoreInformation = ({
  icon,
  name,
  userId,
  className = '',
}: UserCoreInformationProps) => {
  return (
    <>
      <div className={`${className} flex items-center gap-2.5`}>
        <div className="flex h-[75px] w-[75px] items-center justify-center rounded-full">
          {icon}
        </div>
        <div className={`flex flex-col`}>
          <span className="text-foreground text-title">{name}</span>
          <span className="text-foreground text-body">@{userId}</span>
        </div>
      </div>
    </>
  );
};

export default UserCoreInformation;
