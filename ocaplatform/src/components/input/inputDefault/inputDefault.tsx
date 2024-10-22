/* eslint-disable @typescript-eslint/no-explicit-any */
import { SearchOutlined } from "@ant-design/icons";
import { Input, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import classNames from "classnames";
import _ from "lodash";
import React, { useState } from "react";
import "./inputDefault.s.scss";

const { Option } = Select;

interface IPropsInputDefault {
  value?: any;
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
  listData?: any[];
}

const InputDefault: React.FC<IPropsInputDefault> = ({
  value,
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
  listData = [],
}) => {
  const [searchValue, setSearchValue] = useState("");

  const handleInputChange = (e: any) => {
    if (onChange) {
      onChange(e);
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
            autoSize={{ minRows: 4, maxRows: 4 }}
            disabled={disabled}
            placeholder={placeholder}
            allowClear={allowClear}
            readOnly={readonly}
          />
        );
      case "phone-number":
        const filteredCountries = _.filter(listData, (country) =>
          country.name.toLowerCase().includes(searchValue.toLowerCase())
        );
        return (
          <>
            <Input.Group compact>
              <Select
                className="select-country"
                disabled={disabled}
                value={{
                  value: value?.phoneCode,
                  label: (
                      <img
                        src={value?.flag}
                        alt="flag"
                        style={{ width: "24px", height: '16px', }}
                      />
                  ),
                }}
                onChange={handleSelectChange}
                style={{ width: "14%" }}
                dropdownStyle={{ width: '300px'}}
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
                        style={{ width: "24px", height: '16px', marginRight: "8px" }}
                      />
                      {country.name} <span className="phone-code">({country.phoneCode})</span>
                  </Option>
                ))}
              </Select>
              <Input
                prefix={value.phoneCode}
                style={{ width: "86%" }}
                placeholder='(000) 000-0000'
                value={value?.phoneNumber}
                onChange={handleInputChange}
                disabled={disabled}
                allowClear={allowClear}
                readOnly={readonly}
              />
            </Input.Group>
            {errorMsg && <span className="msg-error">{errorMsg}</span>}
          </>
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
