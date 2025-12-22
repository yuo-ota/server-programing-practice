const Introduction = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <div className="relative">
          <p className="text-subtitle text-center">
            誰しもが作品を発見してもらえる
            <br />
            作品公開プラットフォーム
            <br />
          </p>
          <div className="absolute bottom-0 -left-2 h-full w-full skew-x-14 border-l" />
          <div className="absolute bottom-1 -left-3 h-full w-full skew-x-14 border-l" />
          <div className="absolute bottom-0 left-2 h-full w-full -skew-x-14 border-r" />
          <div className="absolute bottom-1 left-3 h-full w-full -skew-x-14 border-r" />
        </div>
        <div className="relative mt-3">
          <h1 className="relative z-20 text-3xl font-bold">Find.a[r]t</h1>
          <div className="bg-theme absolute -bottom-[0.5px] left-0 h-2 w-full -skew-x-12" />
        </div>
        <p className="text-subtitle mt-5 text-start">
          毎朝7時に届く自分だけの20作品から
          <br />
          まだ見ぬクリエイターを発掘しよう！
        </p>
      </div>
    </>
  );
};

export default Introduction;
