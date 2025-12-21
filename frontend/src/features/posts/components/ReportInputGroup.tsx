import ReportElementSelect from "@/components/ReportElementSelect";
import TextArea from "@/components/TextArea";

interface ReportInputGroupProps {
  checkedItems: Record<string, boolean>;
  setCheckedItems: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
  reason: string;
  setReason: (reason: string) => void;
  setHasError: (hasError: boolean) => void;
}

const ReportInputGroup = ({ reason, setReason, checkedItems, setCheckedItems, setHasError }: ReportInputGroupProps) => {
  
  return (
    <>
      <ReportElementSelect
        title={"問題の種類を教えてください。"}
        reportOptions={[
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
          }
        ]}
        checkedItems={checkedItems}
        setCheckedItems={setCheckedItems}
        className="w-full border-t border-b py-4 px-8"
      />
      <TextArea
        label={"備考欄（任意）"}
        placeholder={""}
        id={"post-report-reason"}
        value={reason}
        onChange={(e) => setReason(e.target.value)}
        limit={200}
        setHasError={setHasError}
        className="py-4 px-8 w-full"
      />
    </>
  );
};

export default ReportInputGroup;