export const REPORT_POST_CATEGORIES_LIST = [
  '不適切な公開制限',
  'ヘイト',
  '攻撃的な行為や嫌がらせ',
  '暴力的な発言',
  'プライバシーの侵害',
  'スパムやなりすまし',
  'その他',
] as const;

export const REPORT_USER_CATEGORIES_LIST = [
  '不適切な名前やプロフィール',
  'スパムやなりすまし',
  '犯罪行為の助長',
  'その他',
] as const;

export type ReportPostCategory = (typeof REPORT_POST_CATEGORIES_LIST)[number];

export const REPORT_POST_MAP = {
  'visibility-settings': '不適切な公開制限',
  hate: 'ヘイト',
  harassment: '攻撃的な行為や嫌がらせ',
  violence: '暴力的な発言',
  privacy: 'プライバシーの侵害',
  spam: 'スパムやなりすまし',
};

export const REPORT_USER_MAP = {
  'inappropriate-profile': '不適切な名前やプロフィール',
  spam: 'スパムやなりすまし',
  'promote-crime': '犯罪行為の助長',
};
