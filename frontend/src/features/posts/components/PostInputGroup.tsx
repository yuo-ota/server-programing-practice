import React, { useEffect, useRef, useState } from 'react';
import AddIcon from '../assets/add.svg?react';

interface PostInputGroupProps {
  className?: string;
}

const PostInputGroup = ({ className = '' }: PostInputGroupProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [image, setImage] = useState<{ id: string; file: File; url: string } | null>(null);
  const [error, setError] = useState<string | null>('画像を選択してください。');

  const openFileDialog = () => inputRef.current?.click();

  const MAX_FILE_SIZE = 10 * 1024 * 1024;
  const allowedExts = ['png', 'jpg', 'jpeg', 'jpe', 'gif', 'webp', 'svg'];

  const getExtension = (fileName: string) => {
    const idx = fileName.lastIndexOf('.');
    return idx === -1 ? '' : fileName.slice(idx + 1).toLowerCase();
  };

  const isAllowedExt = (file: File) => {
    const ext = getExtension(file.name);
    return allowedExts.includes(ext);
  };

  const handleFiles = (fileList: FileList | null) => {
    setError(null);
    if (!fileList || fileList.length === 0) return;

    const file = fileList[0];

    if (!isAllowedExt(file)) {
      setError('対応していないファイル形式です。');
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      setError('ファイルサイズは 10MB 以下にしてください。');
      return;
    }

    const url = URL.createObjectURL(file);

    setImage((prev) => {
      if (prev) URL.revokeObjectURL(prev.url);
      return { id: `${Date.now()}-${Math.random()}`, file, url };
    });
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFiles(e.target.files);
    e.currentTarget.value = '';
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    handleFiles(e.dataTransfer.files);
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const removeImage = () => {
    setImage((prev) => {
      if (prev) URL.revokeObjectURL(prev.url);
      return null;
    });
  };

  useEffect(() => {
    return () => {
      if (image) URL.revokeObjectURL(image.url);
    };
  }, [image]);

  return (
    <>
      <div className={`${className} flex flex-col`}>
        <div className="flex">
          <button
            id="dropZone"
            type="button"
            onClick={openFileDialog}
            onDrop={onDrop}
            onDragOver={onDragOver}
            className="w-80 h-72 bg-background border border-dashed border-annotation flex items-center justify-center active:bg-foreground/(--active-opacity) transition-colors duration-150 overflow-hidden relative"
          >
            <input
              ref={inputRef}
              type="file"
              id="imageInput"
              accept=".png,.jpg,.jpeg,.jpe,.gif,.webp,.svg"
              style={{ display: 'none' }}
              onChange={onInputChange}
            />

            {image ? (
              <>
                <img src={image.url} alt={image.file.name} className="w-full h-full object-scale-down" />
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeImage();
                    setError('画像を選択してください。');
                  }}
                  className="absolute top-1 right-1 bg-black/60 text-white rounded-full w-6 h-6 flex items-center justify-center"
                  aria-label={`画像 ${image.file.name} を削除`}
                >
                  ×
                </button>
              </>
            ) : (
              <AddIcon className="w-1/4 h-1/4 fill-placeholder" />
            )}
          </button>
        </div>

        {error && <p className="mt-2 text-error text-subparagraph">{error}</p>}
      </div>
    </>
  );
};

export default PostInputGroup;
