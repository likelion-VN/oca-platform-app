export interface Option {
  id?: number | number[];
  label: React.ReactNode;
  value: string | number | boolean;
  isDisabled?: boolean;
}
