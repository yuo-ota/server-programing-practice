import BottomTab from "./components/BottomTab";
import SettingItemGroup from "./components/SettingItemGroup";

const Root = () => {
  return (
    <>
      <div className="flex h-full w-full max-w-[500px] flex-col items-center justify-between px-8 py-14">
        <SettingItemGroup />
        <BottomTab />
      </div>
    </>
  )
};

export default Root;