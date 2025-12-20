import { isSettingData, type SettingData } from '@/interfaces/api/userSetting';

export const getUserId = () => {
  const settingData = localStorage.getItem('settingData');

  if (settingData) {
    try {
      const parsed: unknown = JSON.parse(settingData);

      if (isSettingData(parsed)) {
        const userId = parsed.display_id;
        return userId;
      }
      throw new Error('Invalid setting data format');
    } catch {
      return '';
    }
  }
  return '';
};
