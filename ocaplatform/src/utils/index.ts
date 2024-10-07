import { Option } from "../interfaces";

const getLabelByValue = (
  options: Option[],
  value: number | string
): any | undefined => {
  const option = options.find((option) => option.value === value);
  return option ? option.label : undefined;
};

export { getLabelByValue };
