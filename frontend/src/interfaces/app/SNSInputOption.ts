export interface SNSInputOption {
  label: string;
  placeholder: string;
  prefix: string;
  id: string;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
}
