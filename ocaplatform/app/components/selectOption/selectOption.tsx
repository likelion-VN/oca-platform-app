import { Select } from "antd";

import { BaseOptionType } from "antd/es/select";
import { CaretDown } from "phosphor-react";
import "./selectOption.s.scss";

interface IPropsSelectOption {
  defaultValue?: string;
  options: BaseOptionType[];
  onChange: (value: string) => void;
  minWidth: number;
  allowClear?: boolean;
  suffixIcon?: React.ReactNode | null;
  placeholder?: React.ReactNode;
}

const SelectOption: React.FC<IPropsSelectOption> = ({
  defaultValue,
  options,
  onChange,
  minWidth,
  allowClear = false,
  suffixIcon = <CaretDown color="#0F172A"/>,
  placeholder,
}) => {
  return (
    <Select
      allowClear={allowClear}
      defaultValue={defaultValue}
      style={{ width: minWidth }}
      onChange={onChange}
      options={options}
      suffixIcon={suffixIcon}
      placeholder={placeholder}
    />
  );
};

export default SelectOption;
