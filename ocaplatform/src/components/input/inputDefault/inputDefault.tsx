/* eslint-disable @typescript-eslint/no-explicit-any */
import { SearchOutlined } from "@ant-design/icons";
import { DatePicker, Input, Select, TimePicker } from "antd";
import { RangePickerProps } from "antd/es/date-picker";
import TextArea from "antd/es/input/TextArea";
import classNames from "classnames";
import dayjs from "dayjs";
import _ from "lodash";
import React, { useState } from "react";
import "./inputDefault.s.scss";

const { Option } = Select;

interface IPropsInputDefault {
  value?: any;
  valueSelect?: any;
  title?: string;
  subTitle?: string;
  onChange?: (e: any) => void;
  onChangeSelect?: (e: any) => void;
  onClick?: () => void;
  disabled?: boolean;
  type: string;
  optional?: boolean;
  placeholder?: string;
  addonBefore?: string;
  errorMsg?: string;
  allowClear?: boolean;
  readonly?: boolean;
  option?: any[];
  maxLength?: number;
  showCount?: boolean;
  maxRows?: number;
  showSearch?: boolean;
}

const InputDefault: React.FC<IPropsInputDefault> = ({
  value,
  valueSelect,
  title,
  optional,
  onChange,
  onChangeSelect,
  onClick,
  disabled = false,
  type,
  placeholder,
  addonBefore,
  errorMsg,
  allowClear = false,
  readonly = false,
  option = [],
  maxLength,
  showCount = false,
  maxRows = 4,
  showSearch = false,
}) => {
  const [searchValue, setSearchValue] = useState("");

  const disabledDate: RangePickerProps["disabledDate"] = (current) => {
    return current && current < dayjs().endOf("day");
  };

  const handleInputChange = (value: any) => {
    if (onChange) {
      onChange(value);
    }
  };

  const handleSelectChange = (code: any) => {
    if (onChangeSelect) {
      onChangeSelect(code);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const renderInput = (type: string) => {
    switch (type) {
      case "input":
        return (
          <>
            <Input
              onClick={onClick}
              addonBefore={addonBefore}
              value={value}
              onChange={handleInputChange}
              size="large"
              disabled={disabled}
              allowClear={allowClear}
              placeholder={placeholder}
              status={errorMsg && "error"}
              readOnly={readonly}
            />
            {errorMsg && <span className="msg-error">{errorMsg}</span>}
          </>
        );
      case "text-area":
        return (
          <TextArea
            onClick={onClick}
            value={value}
            onChange={handleInputChange}
            autoSize={{ minRows: maxRows, maxRows: maxRows }}
            disabled={disabled}
            placeholder={placeholder}
            allowClear={allowClear}
            readOnly={readonly}
            maxLength={maxLength}
            showCount={showCount}
            style={{ resize: "none" }}
          />
        );
      case "phone-number":
        const filteredCountries = _.filter(option, (country) =>
          country.name.toLowerCase().includes(searchValue.toLowerCase())
        );
        return (
          <>
            <Input.Group className="phone-number-input" compact>
              <Select
                className="select-country"
                disabled={disabled}
                value={{
                  value: valueSelect?.phoneCode,
                  label: (
                    <img
                      src={valueSelect?.flag}
                      alt="flag"
                      style={{ width: "24px", height: "16px" }}
                    />
                  ),
                }}
                onChange={handleSelectChange}
                style={{ width: "65px" }}
                dropdownStyle={{ width: "300px" }}
                dropdownRender={(menu) => (
                  <div className="menu-select">
                    <Input
                      className="search-select"
                      prefix={<SearchOutlined />}
                      placeholder="Search"
                      onChange={handleSearchChange}
                      variant="borderless"
                    />
                    {menu}
                  </div>
                )}
              >
                {_.map(filteredCountries, (country) => (
                  <Option key={country.phoneCode} value={country.phoneCode}>
                    <img
                      src={country.flag}
                      alt={country.name}
                      style={{
                        width: "24px",
                        height: "16px",
                        marginRight: "8px",
                      }}
                    />
                    {country.name}{" "}
                    <span className="phone-code">({country.phoneCode})</span>
                  </Option>
                ))}
              </Select>
              <Input
                onClick={onClick}
                prefix={valueSelect?.phoneCode}
                style={{ width: "calc(100% - 65px)" }}
                placeholder="(000) 000-0000"
                value={value}
                onChange={handleInputChange}
                disabled={disabled}
                allowClear={allowClear}
                readOnly={readonly}
              />
            </Input.Group>
            {errorMsg && <span className="msg-error">{errorMsg}</span>}
          </>
        );
      case "date-picker":
        return (
          <DatePicker
            value={value}
            onChange={handleInputChange}
            format="MM/DD/YYYY"
            disabled={disabled}
            placeholder={placeholder}
            allowClear={allowClear}
            readOnly={readonly}
            disabledDate={disabledDate}
            style={{ width: "100%", height: "40px", borderRadius: "4px" }}
            showTime={false}
          />
        );
      case "time-picker":
        return (
          <TimePicker
            value={value}
            onChange={handleInputChange}
            format="HH:mm"
            disabled={disabled}
            placeholder={placeholder}
            allowClear={allowClear}
            readOnly={readonly}
            style={{ width: "100%", height: "40px", borderRadius: "4px" }}
          />
        );
      case "select":
        return (
          <Select
            value={value}
            onChange={handleSelectChange}
            disabled={disabled}
            allowClear={allowClear}
            placeholder={placeholder}
            showSearch={showSearch}
            style={{ width: "100%", height: "40px", borderRadius: "4px" }}
          >
            {_.map(option, (item) => (
              <Option key={item.value} value={item.value}>
                {item.label}
              </Option>
            ))}
          </Select>
        );
      default:
        return <></>;
    }
  };

  return (
    <div className="input-default">
      <div className={classNames("title-input", optional && "optional")}>
        {title}
      </div>
      {renderInput(type)}
    </div>
  );
};

export default InputDefault;
