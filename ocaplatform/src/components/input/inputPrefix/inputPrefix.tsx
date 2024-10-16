/* eslint-disable @typescript-eslint/no-explicit-any */
import { AutoComplete, DatePicker, Input, Tooltip } from "antd";
import { DatePickerProps, RangePickerProps } from "antd/es/date-picker";
import TextArea from "antd/es/input/TextArea";
import dayjs from "dayjs";
import _ from "lodash";
import React, { useState } from "react";
import { Option } from "../../../interfaces";
import "./inputPrefix.s.scss";
import InputQuillCustom from "../../inputQuill/inputQuillCustom/inputQuillCustom";

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
            size="large"
            disabled={disabled}
            allowClear={allowClear}
            readOnly={readOnly}
            onClick={onClick}
            prefix={
              <span
                style={{
                  textDecoration: value && "line-through",
                  color: value && "#B42318",
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
            onChange={handleInputChange}
            autoSize={{ minRows: 2, maxRows: 3 }}
            disabled={disabled}
          />
        );
      case "text-area-input":
        return (
          <div className="text-area-input" onClick={onClick}>
            {_.map(value, (item, index) => (
              // <ProtectedDefaultQuill
              //   id={item.id}
              //   value={item.description}
              //   newValue={item.newTask}
              //   isRemove={item.isRemove}
              //   onContentChange={onChangeMultiple}
              // />
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
                      color: (item.isRemove || item.newTask) && "#B42318",
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
                color: disabled ? "#00000040" : value && "#B42318",
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
              placeholder=""
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
                    color: value && "#B42318",
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
          <div className="text-area-input">
            {_.map(listDataMutipleInput, (item, index) => {
              // console.log(item);
              return (
                <InputQuillCustom
                  key={index}
                  id={item.id}
                  className="mutiple-input-quill"
                  disabled={disabled}
                  valuePrefix={item.description}
                  value={item.newTask}
                  onKeyDown={(e) => {
                    if (onKeyDown) {
                      onKeyDown(e, item.id);
                    }
                  }}
                  handleChangeMutiple={handleChangeMutiple}
                />
              );
            })}
          </div>
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
