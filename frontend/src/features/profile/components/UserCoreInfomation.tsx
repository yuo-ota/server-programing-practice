import type { ReactNode } from "react";

interface UserCoreInfomationProps {
    icon: ReactNode;
    name: string;
    userId: string;
    className?: string;
}

const UserCoreInfomation = ({icon, name, userId, className = '',}: UserCoreInfomationProps) =>{
  return(
    <>
    <div className={`${className} flex items-center gap-2.5`}>
      <div className="flex items-center justify-center rounded-full w-[75px] h-[75px]">
        {icon}
      </div>
      <div className={`flex flex-col `}>
      <span className="text-foreground text-title">{name}</span>
      <span className="text-foreground text-body">@{userId}</span>
      </div>
    </div>
    </>
  );
};

export default UserCoreInfomation;