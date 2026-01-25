export interface SNSInputOption {
  label: string;
  placeholder: string;
  prefix: string;
  id: string;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
}

export interface SNSInputValue {
  platform_id: number | undefined;
  identifier: string;
  snsId: string;
  value: string;
}

export interface SNSInputGroupValue {
  snsInputOptions: SNSInputOption[];
  className?: string;
}
