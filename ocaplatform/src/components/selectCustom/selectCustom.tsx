import { Checkbox, Radio, RadioChangeEvent, Select } from "antd";
import classNames from "classnames";
import _ from "lodash";
import { CaretDown } from "phosphor-react";
import { useState } from "react";
import "./selectCustom.s.scss";

interface OptionItem {
  value: number | string;
  label: string;
  isDisabled?: boolean;
}

interface IPropsSelectCustom {
  className?: string;
  options: OptionItem[];
  onChange?: (array: string[]) => void;
  onChangeRadio?: (value: string | null) => void;
  placeholder?: string;
  value: string;
  type: string;
}

const SelectCustom: React.FC<IPropsSelectCustom> = ({
  onChange,
  onChangeRadio,
  className,
  placeholder,
  options,
  value,
  type,
}) => {
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const [selectedValue, setSelectedValue] = useState<string | null>(null);

  const isCheckbox = type === "checkbox";

  const handleChange = (selectedValues: string[]) => {
    setSelectedValues(selectedValues);
  };

  const handleChangeRadio = (event: RadioChangeEvent) => {
    setSelectedValue(event.target.value);
  };

  const handleClear = () => {
    if (isCheckbox) {
      setSelectedValues([]);
      if (onChange) {
        onChange([]);
      }
    } else {
      setSelectedValue(null);
      if (onChangeRadio) {
        onChangeRadio(null);
      }
    }
  };

  const handleOnDropdownVisibleChange = (focusOn: boolean) => {
    if (!focusOn) {
      if (isCheckbox && onChange) {
        onChange(selectedValues);
      } else if (!isCheckbox && onChangeRadio) {
        onChangeRadio(selectedValue);
      }
    }
  };

  const renderRadioOptions = () => (
    <div className="custom-radio-list">
      <Radio.Group onChange={handleChangeRadio} value={selectedValue}>
        {options.map((option, index) => (
          <Radio key={index} className="custom-radio" value={option.value}>
            {option.label}
          </Radio>
        ))}
      </Radio.Group>
    </div>
  );

  const renderCheckboxOptions = () => (
    <div className="custom-checkbox-list">
      <Checkbox.Group onChange={handleChange} value={selectedValues}>
        {options.map((option, index) => (
          <Checkbox
            key={index}
            value={option.value}
            disabled={option.isDisabled}
          >
            {option.label}
          </Checkbox>
        ))}
      </Checkbox.Group>
    </div>
  );

  const renderDropdown = () => {
    if (isCheckbox) {
      return renderCheckboxOptions();
    }
    return renderRadioOptions();
  };

  return (
    <Select
      className={classNames(
        className,
        (!_.isEmpty(selectedValues) || selectedValue) && "has-value"
      )}
      placeholder={placeholder}
      value={value}
      allowClear={!_.isEmpty(selectedValues) || !!selectedValue}
      dropdownRender={() => renderDropdown()}
      showSearch={false}
      suffixIcon={<CaretDown color="#0F172A" />}
      placement="bottomLeft"
      onDropdownVisibleChange={handleOnDropdownVisibleChange}
      onClear={handleClear}
    />
  );
};

export default SelectCustom;
