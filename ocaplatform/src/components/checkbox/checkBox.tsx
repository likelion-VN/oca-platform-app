import { Checkbox, Tooltip } from "antd";
import React from "react";

interface ICheckBoxProps {
  tooltipContent: string;
  checkBoxContent: string;
}

const CheckBoxTooltip = ({
  checkBoxContent,
  tooltipContent,
}: ICheckBoxProps) => {
  return (
    <Checkbox>
      <Tooltip placement="right" title={tooltipContent}>
        {checkBoxContent}
      </Tooltip>
    </Checkbox>
  );
};

export default CheckBoxTooltip;
