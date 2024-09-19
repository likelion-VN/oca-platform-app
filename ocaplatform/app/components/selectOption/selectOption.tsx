import { Select } from "antd";

import { CaretDown } from "phosphor-react";
import "./selectOption.s.scss";

interface IPropsSelectOption {
  defaultValue: string;
  options: {
    value: string;
    label: string;
  }[];
  onChange: (value: string) => void;
  minWidth: number;
  allowClear?: boolean;
  suffixIcon?: React.ReactNode | null;
}

const SelectOption: React.FC<IPropsSelectOption> = ({
  defaultValue,
  options,
  onChange,
  minWidth,
  allowClear = false,
  suffixIcon = <CaretDown color="#0F172A"/>
}) => {
  return (
    <Select
      allowClear={allowClear}
      defaultValue={defaultValue}
      style={{ width: minWidth }}
      onChange={onChange}
      options={options}
      suffixIcon={suffixIcon}
    />
  );
};

export default SelectOption;
