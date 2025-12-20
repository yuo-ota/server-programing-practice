export type SocialAccount = {
  name: string;
  identifier: string;
};

export type SettingData = {
  display_id: string;
  name: string;
  icon_path: string;
  header_path: string;
  introduction: string | null;
  birthday: string;
  show_adult_content: boolean;
  social_accounts: SocialAccount[];
};

const isObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null;

const isSocialAccount = (value: unknown): value is SocialAccount => {
  if (!isObject(value)) return false;

  return typeof value.name === 'string' && typeof value.identifier === 'string';
};

export const isSettingData = (value: unknown): value is SettingData => {
  if (!isObject(value)) return false;

  return (
    typeof value.display_id === 'string' &&
    typeof value.name === 'string' &&
    typeof value.icon_path === 'string' &&
    typeof value.header_path === 'string' &&
    (typeof value.introduction === 'string' || value.introduction === null) &&
    typeof value.birthday === 'string' &&
    typeof value.show_adult_content === 'boolean' &&
    Array.isArray(value.social_accounts) &&
    value.social_accounts.every(isSocialAccount)
  );
};
