export const getUserId = () => {
  const settingData = localStorage.getItem('settingData');
  if (settingData) {
    const parsedData = JSON.parse(settingData);
    return parsedData.user_id as string;
  }
  return '';
};