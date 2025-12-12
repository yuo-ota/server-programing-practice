/**
 * パスワードの形式チェック
 * @param password
 * @returns
 */
export const checkPasswordFormat = (password: string): boolean => {
  const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).+$/;
  return passwordRegex.test(password);
};

/**
 * メールアドレスの形式チェック
 * @param email
 * @returns
 */
export const checkEmailFormat = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};
