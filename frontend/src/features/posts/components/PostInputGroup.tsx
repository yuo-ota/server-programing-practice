interface PostInputGroupProps {
  // text: string;
  // images: object[];
  className?: string;
}

const PostInputGroup = ({
  // text,
  // images,
  className = '',
}: PostInputGroupProps) => {
  return (
    <>
      <div className={`${className} flex w-full flex-col items-center px-4 pt-6`}>
        <div className="flex">
          <button id="dropZone" className="w-full h-48 bg-gray-300 border border-gray-600 rounded-md flex items-center justify-center active:bg-gray-400 transition-colors duration-150">
            <input type="file" id="pdfInput" accept="application/pdf" style={{ display: 'none' }} />
            <span className="text-xl font-jpn truncate">PDFの資料をドラッグもしくは、ここをクリックして選択してください。</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default PostInputGroup;
