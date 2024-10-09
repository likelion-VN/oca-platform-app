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
  onClick?: () => void;
  disabled?: boolean;
  type: string;
  optional?: boolean;
  placeholder?: string;
  addonBefore?: string;
  errorMsg?: string;
  allowClear?: boolean;
  readonly?: boolean;
}

const InputDefault: React.FC<IPropsInputDefault> = ({
  value,
  title,
  optional,
  onChange,
  onClick,
  disabled = false,
  type,
  placeholder,
  addonBefore,
  errorMsg,
  allowClear = false,
  readonly = false,
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
