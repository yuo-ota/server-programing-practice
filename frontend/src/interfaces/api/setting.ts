export interface setting {
  user_id: string;
  name: string;
  birthday: string;
  show_adult_contents: string;
}

export interface CheckUserIdResponse {
  available: boolean;
}

export const isCheckUserIdResponse = (
  data: unknown
): data is CheckUserIdResponse => {
  return (
    typeof data === 'object' &&
    data !== null &&
    'available' in data &&
    typeof data.available === 'boolean'
  );
}