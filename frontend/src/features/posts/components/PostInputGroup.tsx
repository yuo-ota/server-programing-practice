import React, { useRef } from 'react';
import AddIcon from '../assets/add.svg?react';
import TextInput from '@/components/TextInput';
import RadioButtonGroup from '@/components/RadioButtonGroup';

interface ImageType {
  id: string;
  file: File;
  url: string;
}

interface PostInputGroupProps {
  className?: string;
  title: string;
  onTitleChange: (value: string) => void;
  visibility: string;
  onVisibilityChange: (value: string) => void;
  image: ImageType | null;
  onImageChange: (file: File | null) => void;
  error?: string | null;
  titleMaxLength?: number;
  titleError?: string | null;
}

const PostInputGroup = ({
  className = '',
  title,
  onTitleChange,
  visibility,
  onVisibilityChange,
  image,
  onImageChange,
  error = null,
  titleMaxLength,
  titleError = null,
}: PostInputGroupProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const openFileDialog = () => inputRef.current?.click();

  const handleFiles = (fileList: FileList | null) => {
    if (!fileList || fileList.length === 0) return;
    const file = fileList[0];
    onImageChange(file);
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
    onImageChange(null);
  };

  return (
    <>
      <div className={`${className} relative flex flex-col gap-6`}>
        <div className="flex flex-col">
          <div className="flex">
            <button
              id="dropZone"
              type="button"
              onClick={openFileDialog}
              onDrop={onDrop}
              onDragOver={onDragOver}
              className="bg-background border-annotation active:bg-foreground/(--active-opacity) relative flex h-72 w-80 items-center justify-center overflow-hidden border border-dashed transition-colors duration-150"
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
                  <img
                    src={image.url}
                    alt={image.file.name}
                    className="h-full w-full object-scale-down"
                  />
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeImage();
                    }}
                    className="absolute top-1 right-1 flex h-6 w-6 items-center justify-center rounded-full bg-black/60 text-white"
                    aria-label={`画像 ${image.file.name} を削除`}
                  >
                    ×
                  </button>
                </>
              ) : (
                <AddIcon className="fill-placeholder h-1/4 w-1/4" />
              )}
            </button>
          </div>
          <div className="mt-2 min-h-5">
            {error && <p className="text-error text-subparagraph">{error}</p>}
          </div>
        </div>
        <div>
          {typeof titleMaxLength === 'number' && (
            <div className="absolute right-6 mt-1">
              <p
                className={`text-subparagraph ${titleError ? 'text-error' : 'text-annotation'}`}
              >
                {`${title.length} / ${titleMaxLength}`}
              </p>
            </div>
          )}
          <TextInput
            displayStatus="normal"
            label="タイトル"
            placeholder="タイトルを入力してください"
            prefix=""
            isUnroundedLeft={false}
            id="post-title-input"
            value={title}
            onChange={(e) => onTitleChange(e.target.value)}
            error={titleError ?? undefined}
            className="h-[88.5px]"
          />
        </div>
        <div className="flex flex-col gap-2.5">
          <label className="text-foreground text-subtitle">公開範囲</label>
          <RadioButtonGroup
            groupName={'post-visibility'}
            options={['全年齢', '成人向け']}
            value={visibility}
            onSelect={onVisibilityChange}
            className="gap-12"
          />
        </div>
      </div>
    </>
  );
};

export default PostInputGroup;
