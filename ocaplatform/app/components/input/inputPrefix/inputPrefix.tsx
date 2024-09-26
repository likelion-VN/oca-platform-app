/* eslint-disable @typescript-eslint/no-explicit-any */
import { Option } from "@/app/interface/home";
import { AutoComplete, DatePicker, Input, Tooltip } from "antd";
import { RangePickerProps } from "antd/es/date-picker";
import TextArea from "antd/es/input/TextArea";
import dayjs from "dayjs";
import _ from "lodash";
import React from "react";
import "./inputPrefix.s.scss";

interface IPropsInputPrefix {
  value?: any;
  title: string;
  subTitle?: string;
  onChange?: (e: any) => void;
  valuePrefix?: string;
  disabled?: boolean;
  type: string;
  options?: Option[];
  readOnly?: boolean;
}

const InputPrefix: React.FC<IPropsInputPrefix> = ({
  value,
  title,
  subTitle = "",
  onChange,
  valuePrefix,
  disabled = false,
  type,
  options,
}) => {

  const disabledDate: RangePickerProps["disabledDate"] = (current) => {
    return current && current < dayjs().endOf("day");
  };

  const handleInputChange = (e: any) => {
    if (onChange) {
      onChange(e);
    }
  };

  const handleDateChange = (date: dayjs.Dayjs | null) => {
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
            className="custom-number-input"
            value={value}
            onChange={handleInputChange}
            size="large"
            disabled={disabled}
            allowClear
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
            value={_.isArray(value)
                ? _.map(value, (item) => item.description).join("\n")
                : value}
            onChange={handleInputChange}
            autoSize={{ minRows: 2, maxRows: 3 }}
            disabled={disabled}
          />
        );
      case "date":
        return (
          <div style={{ position: "relative", width: "100%" }}>
            {/* Prefix */}
            <span
              style={{
                fontFamily: "Inter",
                fontWeight: 400,
                position: "absolute",
                left: 10,
                top: "50%",
                transform: "translateY(-50%)",
                textDecoration: value && "line-through",
                color: value && "#B42318",
                zIndex: 2,
              }}
            >
              {valuePrefix}
            </span>
            {/* DatePicker */}
            <DatePicker
              disabledDate={disabledDate}
              size="large"
              format="MM/DD/YYYY"
              style={{
                width: "100%",
                paddingLeft: "104px",
                borderRadius: "4px",
              }}
              placeholder=""
              onChange={handleDateChange}
            />
          </div>
        );
      case "select":
        return (
          <AutoComplete
            className="auto-completed-custom"
            style={{ width: "100%", fontWeight: 400 }}
            onSelect={handleSelectChange}
            options={_.map(options, (option) => ({
              label: option.label,
              value: option.label,
              disabled: valuePrefix === option.label,
            }))}
            value={value}
            allowClear
            onClear={() => handleSelectChange(null)}
            size="large"
          >
            <Input
              size="large"
              placeholder=""
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
      default:
        return <></>;
    }
  };

  return (
    <div className="input-custom">
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
