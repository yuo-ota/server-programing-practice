export const getUserId = () => {
  try {
    const settingData = localStorage.getItem('settingData');
    if (settingData) {
      const parsedData = JSON.parse(settingData);
      return parsedData.user_id as string;
    }
    return '';
  } catch {
    return '';
  }
};
