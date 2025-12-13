import type { SNSInputOption } from "@/interfaces/app/SNSInputOption";
import type { SNSLinkOption } from "@/interfaces/app/SNSLinkOption";
import SNSLinkInputGroup from "@/components/SNSLinkInputGroup";

const SNSInputOptions: SNSInputOption[] = [
  {
    label: 'X',
    placeholder: 'example',
    prefix: 'https://x.com/',
    id: 'x',
  },
  {
    label: 'Instagram',
    placeholder: 'example',
    prefix: 'https://www.instagram.com/',
    id: 'instagram',
  },
  {
    label: 'pixiv',
    placeholder: 'https://www.pixiv.net/users/example',
    prefix: '',
    id: 'pixiv',
  },
  {
    label: 'skeb',
    placeholder: 'example',
    prefix: 'https://skeb.jp/@',
    id: 'skeb',
  },
  {
    label: 'Bluesky',
    placeholder: 'example',
    prefix: 'https://bsky.app/profile/',
    id: 'bluesky',
  },
];

interface SNSLinkSettingGroupProps {
  inputOptions: SNSInputOption[];
  linkOptions: SNSLinkOption[];
  className?: string;
}

const SNSLinkSettingGroup =({
  inputOptions = SNSInputOptions,
  linkOptions = [],
  className = '',
}: SNSLinkSettingGroupProps) => {
  return (
    <div className={className}>
      {linkOptions.map((linkOption) => (
        <SNSLinkInputGroup
          value={linkOption.value}
          defaultSelectedLabel={linkOption.label}
          SNSInputOptions={inputOptions}
          onChange={}
        />
      ))}
    </div>
  );
}