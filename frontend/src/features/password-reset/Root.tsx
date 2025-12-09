import PasswordInputGroup from "./components/PasswordInputGroup";

export const Root = () => {
  return　(
    <>
      <div className="w-full h-full flex flex-col items-center">
      <div className="top-0 bg-red-200 w-full h-32"></div>
        <div className="flex h-full w-full max-w-[500px] flex-col items-center px-8 py-14">
          <PasswordInputGroup />
        </div>
      </div>
    </>
  )
};