import ReportElementSelect from '@/components/ReportElementSelect';
import TextArea from '@/components/TextArea';

interface ReportInputGroupProps {
  checkedItems: Record<string, boolean>;
  setCheckedItems: React.Dispatch<
    React.SetStateAction<Record<string, boolean>>
  >;
  reason: string;
  setReason: (reason: string) => void;
  setHasError: (hasError: boolean) => void;
}

const ReportInputGroup = ({
  reason,
  setReason,
  checkedItems,
  setCheckedItems,
  setHasError,
}: ReportInputGroupProps) => {
  return (
    <>
      <ReportElementSelect
        title={'問題の種類を教えてください。'}
        reportOptions={[
          {
            id: 'inappropriate-profile',
            name: 'inappropriate-profile',
            label: '不適切な名前やプロフィール',
            helperText:
              '不適切な名前、プロフィール画像、自己紹介文、リンク、その他のプロフィール情報',
          },
          {
            id: 'spam',
            name: 'spam',
            label: 'スパムやなりすまし',
            helperText:
              '偽のエンゲージメント、詐欺、偽のアカウント、悪意のあるリンク、他の人になりすましている',
          },
          {
            id: 'promote-crime',
            name: 'promote-crime',
            label: '犯罪行為の助長',
            helperText: '自傷行為、テロ行為、その他の違法行為',
          },
        ]}
        checkedItems={checkedItems}
        setCheckedItems={setCheckedItems}
        className="w-full border-t border-b px-8 py-4"
      />
      <TextArea
        label={'備考欄（任意）'}
        placeholder={''}
        id={'post-report-reason'}
        value={reason}
        onChange={(e) => setReason(e.target.value)}
        limit={200}
        setHasError={setHasError}
        className="w-full px-8 py-4"
      />
    </>
  );
};

export default ReportInputGroup;
