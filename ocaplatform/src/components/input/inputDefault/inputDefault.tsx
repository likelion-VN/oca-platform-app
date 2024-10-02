/* eslint-disable @typescript-eslint/no-explicit-any */
import { Input } from "antd";
import TextArea from "antd/es/input/TextArea";
import classNames from "classnames";
import React from "react";
import "./inputDefault.s.scss";

interface IPropsInputDefault {
  value?: any;
  title?: string;
  subTitle?: string;
  onChange?: (e: any) => void;
  disabled?: boolean;
  type: string;
  optional?: boolean;
  placeholder?: string;
  addonBefore?: string;
  errorMsg?: string;
}

const InputDefault: React.FC<IPropsInputDefault> = ({
  value,
  title,
  optional,
  onChange,
  disabled = false,
  type,
  placeholder,
  addonBefore,
  errorMsg,
}) => {
  const handleInputChange = (e: any) => {
    if (onChange) {
      onChange(e);
    }
  };

  const renderInput = (type: string) => {
    switch (type) {
      case "input":
        return (
          <>
            <Input
              addonBefore={addonBefore}
              value={value}
              onChange={handleInputChange}
              size="large"
              disabled={disabled}
              allowClear
              placeholder={placeholder}
              status={errorMsg && "error"}
            />
            {errorMsg && <span className="msg-error">{errorMsg}</span>}
          </>
        );
      case "text-area":
        return (
          <TextArea
            value={value}
            onChange={handleInputChange}
            autoSize={{ minRows: 4, maxRows: 4 }}
            disabled={disabled}
            placeholder={placeholder}
            allowClear
          />
        );
      default:
        return <></>;
    }
  };

  return (
    <div className="input-default">
      <div className={classNames("title", optional && "optional")}>{title}</div>
      {renderInput(type)}
    </div>
  );
};

export default InputDefault;
