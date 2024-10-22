/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  AutoComplete,
  DatePicker,
  Input,
  Select,
  SelectProps,
  Tooltip,
} from "antd";
import { DatePickerProps, RangePickerProps } from "antd/es/date-picker";
import TextArea from "antd/es/input/TextArea";
import classNames from "classnames";
import dayjs from "dayjs";
import _ from "lodash";
import React, { useState } from "react";
import { Option } from "../../../interfaces";
import InputQuillCustom from "../../inputQuill/inputQuillCustom/inputQuillCustom";
import "./inputPrefix.s.scss";

interface IPropsInputPrefix {
  value?: any;
  title: string;
  subTitle?: any;
  onChange?: (e: any) => void;
  onChangeMultiple?: (
    e: React.ChangeEvent<HTMLInputElement>,
    id: number
  ) => void;
  onKeyDown?: (e: any, index: number) => void;
  onClick?: () => void;
  valuePrefix?: string;
  disabled?: boolean;
  type: string;
  options?: Option[];
  readOnly?: boolean;
  allowClear?: boolean;
  listDataMutipleInput?: any[];
  idNewTask?: string;
  handleChangeMutiple?: (value: string, id: string) => void;
  handleChangeInputQuill?: (value: string) => void;
  placeholder?: string;
  autoSize?: { minRows: number; maxRows: number };
  filterOption?: (inputValue: string, option: any) => boolean;
  classNameCustom?: string;
  tagRender?: SelectProps["tagRender"];
  labelInValue?: boolean;
}

const InputPrefix: React.FC<IPropsInputPrefix> = ({
  value,
  title,
  subTitle = "",
  onChange,
  onChangeMultiple,
  onKeyDown,
  onClick,
  valuePrefix,
  disabled = false,
  type,
  options,
  readOnly = false,
  allowClear = false,
  listDataMutipleInput,
  handleChangeMutiple,
  handleChangeInputQuill,
  placeholder,
  autoSize,
  filterOption,
  classNameCustom,
  tagRender,
}) => {
  const [open, setOpen] = useState<boolean>(false);

  const handleDivClick = () => {
    if (onClick) {
      onClick();
    } else {
      setOpen(true);
    }
  };

  const disabledDate: RangePickerProps["disabledDate"] = (current) => {
    return current && current < dayjs().endOf("day");
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (onChange) {
      onChange(e);
    }
  };

  const handleInputChangeMutiple = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    if (onChangeMultiple) {
      onChangeMultiple(e, index);
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (onKeyDown) {
      onKeyDown(e, index);
    }
  };

  const handleDateChange: DatePickerProps["onChange"] = (date) => {
    if (onChange) {
      onChange(date);
    }
  };

  const handleSelectChange = (value: string | null) => {
    if (onChange) {
      onChange(value);
    }
  };

  const renderInput = (type: string) => {
    switch (type) {
      case "input":
        return (
          <Input
            value={value}
            onChange={handleInputChange}
            placeholder={placeholder}
            size="large"
            disabled={disabled}
            allowClear={allowClear}
            readOnly={readOnly}
            onClick={onClick}
            prefix={
              <span
                style={{
                  textDecoration: value && "line-through",
                  color: value && "#8F8F8F",
                }}
              >
                {valuePrefix}
              </span>
            }
          />
        );
      case "text-area":
        return (
          <TextArea
            value={
              _.isArray(value)
                ? _.map(value, (item) => item.description).join("\n")
                : value
            }
            placeholder={placeholder}
            onChange={handleInputChange}
            autoSize={autoSize ? autoSize : { minRows: 2, maxRows: 3 }}
            disabled={disabled}
          />
        );
      case "text-area-input":
        return (
          <div className="text-area-input" onClick={onClick}>
            {_.map(value, (item, index) => (
              <Input
                key={index}
                allowClear={allowClear}
                value={item.newTask}
                placeholder=""
                onChange={(e) => handleInputChangeMutiple(e, item.id)}
                onKeyDown={(e) => handleKeyDown(e, item.id)}
                readOnly={readOnly}
                disabled={disabled}
                prefix={
                  <span
                    style={{
                      textDecoration:
                        (item.isRemove || item.newTask) && "line-through",
                      color: (item.isRemove || item.newTask) && "#8F8F8F",
                    }}
                  >
                    {item.description}
                  </span>
                }
              />
            ))}
          </div>
        );
      case "date":
        return (
          <div
            style={{ position: "relative", width: "100%" }}
            onClick={handleDivClick}
          >
            {/* Prefix */}
            <span
              style={{
                fontFamily: "Inter",
                fontWeight: 400,
                fontSize: 14,
                position: "absolute",
                left: 10,
                top: "50%",
                transform: "translateY(-50%)",
                textDecoration: value && "line-through",
                color: disabled ? "#00000040" : value && "#8F8F8F",
                cursor: disabled ? "not-allowed" : "none",
                zIndex: 2,
              }}
            >
              {valuePrefix}
            </span>
            {/* DatePicker */}
            <DatePicker
              open={onClick ? false : open}
              onOpenChange={(status: boolean) => setOpen(status)}
              disabledDate={disabledDate}
              size="large"
              format="MM/DD/YYYY"
              disabled={disabled}
              style={{
                width: "100%",
                paddingLeft: "93px",
                borderRadius: "4px",
                height: "40px",
              }}
              value={value ? dayjs(value) : null}
              placeholder={placeholder}
              onChange={handleDateChange}
              allowClear={allowClear}
            />
          </div>
        );
      case "select":
        return (
          <AutoComplete
            onClick={onClick}
            className="auto-completed-custom"
            style={{ width: "100%", fontWeight: 400 }}
            onSelect={handleSelectChange}
            options={_.map(options, (option) => ({
              label: option.label,
              value: option.label,
              disabled: valuePrefix === option.label,
            }))}
            disabled={readOnly}
            value={value}
            allowClear={allowClear}
            onClear={() => handleSelectChange(null)}
            size="large"
          >
            <Input
              size="large"
              placeholder=""
              readOnly={readOnly}
              prefix={
                <span
                  style={{
                    textDecoration: value && "line-through",
                    color: value && "#8F8F8F",
                  }}
                >
                  {valuePrefix}
                </span>
              }
            />
          </AutoComplete>
        );
      case "input-quill":
        return (
          <InputQuillCustom
            value={value}
            disabled={disabled}
            valuePrefix={valuePrefix}
            onChange={handleChangeInputQuill}
          />
        );
      case "mutiple-input-quill":
        return (
          <div
            className={classNames(
              "text-area-input",
              disabled && "text-area-input-disabled"
            )}
          >
            {_.map(listDataMutipleInput, (item, index) => {
              return (
                <InputQuillCustom
                  key={index}
                  id={item?.taskId}
                  className="mutiple-input-quill"
                  disabled={disabled}
                  valuePrefix={item?.description}
                  value={item?.newTask}
                  onKeyDown={(e) => {
                    if (onKeyDown) {
                      onKeyDown(e, item?.taskId);
                    }
                  }}
                  handleChangeMutiple={handleChangeMutiple}
                />
              );
            })}
          </div>
        );
      case "select-normal":
        return (
          <Select
            className="select-normal-field"
            onChange={onChange}
            options={options}
            placeholder={placeholder}
          />
        );
      case "select-mutiple":
        return (
          <Select
            mode="multiple"
            className={`select-mutiple-field ${classNameCustom}`}
            allowClear
            tagRender={tagRender}
            style={{ width: "100%" }}
            placeholder={placeholder}
            options={options}
            filterOption={filterOption}
            onChange={onChange}
          />
        );
      default:
        return <></>;
    }
  };

  return (
    <div className="input-prefix">
      <div className="title">
        {title}
        <span>
          <Tooltip
            title="If you want to make a revised offer, please make adjustments here."
            placement="right"
          >
            {subTitle}
          </Tooltip>
        </span>
      </div>
      {renderInput(type)}
    </div>
  );
};

export default InputPrefix;
