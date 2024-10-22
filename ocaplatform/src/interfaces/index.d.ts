export interface Option {
  id?: number | number[];
  label: React.ReactNode;
  value: string | number | boolean;
  isDisabled?: boolean;
}

export interface CountryOption {
  name: string;
  phoneCode: string;
  flag: string;
  timezone: string[];
}
