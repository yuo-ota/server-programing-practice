import { useState } from 'react';
import CheckBox from './CheckBox';

interface ReportOption {
  id: string;
  name: string;
  label: string;
  helperText: string;
}

const reportOptions: ReportOption[] = [
  {
    id: 'visibility-settings',
    name: 'visibility-settings',
    label: '不適切な公開制限',
    helperText: '成人向けの内容を含む投稿を、公開制限を行わずに投稿している',
  },
  {
    id: 'hate',
    name: 'hate',
    label: 'ヘイト',
    helperText:
      '中傷、人種差別主義者または性差別主義者に対する固定概念、ヘイト行為への言及、ヘイトの象徴とロゴ',
  },
  {
    id: 'harassment',
    name: 'harassment',
    label: '攻撃的な行為や嫌がらせ',
    helperText:
      '侮辱的発言、望ましくない閲覧注意コンテンツや刺激の強いコンテンツ、特定の人物への嫌がらせや嫌がらせの扇動',
  },
  {
    id: 'violence',
    name: 'violence',
    label: '暴力的な発言',
    helperText:
      '身体的脅迫、危害の願望、暴力の賛美、暴力の扇動、暗号化された暴力の扇動',
  },
  {
    id: 'privacy',
    name: 'privacy',
    label: 'プライバシーの侵害',
    helperText:
      '個人情報を共有している、個人情報を共有/公開すると脅迫している、合意のない私的な画像を共有している',
  },
  {
    id: 'spam',
    name: 'spam',
    label: 'スパムやなりすまし',
    helperText:
      '偽のエンゲージメント、詐欺、偽のアカウント、悪意のあるリンク、他の人になりすましている',
  },
];

interface ReportElementSelectProps {
  className?: string;
}

const ReportElementSelect = ({ className = '' }: ReportElementSelectProps) => {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, checked } = event.target;

    setCheckedItems((prevCheckedItems) => ({
      ...prevCheckedItems,
      [id]: checked,
    }));
  };

  return (
    <div className={`${className} space-y-4 p-10`}>
      <h2 className="text-title text-foreground">問題の種類を教えてください</h2>

      <div className="space-y-4">
        {reportOptions.map((option) => (
          <CheckBox
            key={option.id}
            id={option.id}
            name={option.name}
            label={option.label}
            helperText={option.helperText}
            checked={!!checkedItems[option.id]}
            onChange={handleCheckboxChange}
            className=""
          />
        ))}
      </div>
    </div>
  );
};
export default ReportElementSelect;
