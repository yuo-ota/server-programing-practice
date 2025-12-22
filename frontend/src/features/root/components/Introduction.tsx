const Introduction = () => {
  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <div className="relative">
          <p className="text-center text-subtitle">
            誰しもが作品を発見してもらえる<br />
            作品公開プラットフォーム<br />
          </p>
          <div className="w-full border-l h-full absolute bottom-0 -left-2 skew-x-14" />
          <div className="w-full border-l h-full absolute bottom-1 -left-3 skew-x-14" />
          <div className="w-full border-r h-full absolute bottom-0 left-2 -skew-x-14" />
          <div className="w-full border-r h-full absolute bottom-1 left-3 -skew-x-14" />
        </div>
        <div className="relative mt-3">
          <h1 className="text-3xl font-bold relative z-20">Find.a[r]t</h1>
          <div className="w-full bg-theme h-2 absolute -bottom-[0.5px] left-0 -skew-x-12" />
        </div>
        <p className="text-start text-subtitle mt-5">
          毎朝7時に届く自分だけの20作品から<br />
          まだ見ぬクリエイターを発掘しよう！
        </p>
      </div>
    </>
  );
};

export default Introduction;
