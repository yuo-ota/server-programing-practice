export interface ErrorResponse {
  code: number;
  message: string;
}

export const isErrorResponse = (data: unknown): data is ErrorResponse => {
  return (
    typeof data === 'object' &&
    data !== null &&
    'code' in data &&
    typeof data.code === 'number' &&
    'message' in data &&
    typeof data.message === 'string'
  );
};
