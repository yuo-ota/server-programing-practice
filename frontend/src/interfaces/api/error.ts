export interface ErrorResponse {
  code: string;
  message: string;
}

export const isErrorResponse = (data: unknown): data is ErrorResponse => {
  return (
    typeof data === 'object' &&
    data !== null &&
    'code' in data &&
    typeof data.code === 'string' &&
    'message' in data &&
    typeof data.message === 'string'
  );
};
