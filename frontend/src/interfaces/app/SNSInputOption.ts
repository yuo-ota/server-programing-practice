export interface SNSInputOption {
  label: string;
  placeholder: string;
  prefix: string;
  id: string;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
}

export interface SNSLinkInputValue {
  snsId: string;
  value: string;
}

export interface SNSLinkInputGroupValue {
  snsInputOptions: SNSInputOption[];
  className?: string;
}