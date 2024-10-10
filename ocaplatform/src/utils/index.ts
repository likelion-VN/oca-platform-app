import dayjs from "dayjs";
import { Option } from "../interfaces";

const getLabelByValue = (
  options: Option[],
  value: number | string
): any | undefined => {
  const option = options.find((option) => option.value === value);
  return option ? option.label : undefined;
};

const calculateDaysDiff = (date: string, isFullDay = false) => {
  const targetDate = dayjs(date);
  const currentDate = dayjs();

  const diffInDays = currentDate.diff(targetDate, "day");

  if (diffInDays < 1) {
    return "Today";
  } else {
    if (isFullDay) {
      return `${diffInDays} ${diffInDays > 1 ? 'days' : 'day'} ago`;
    } else {
      return `${diffInDays}d`;
    }
  }
};

export { calculateDaysDiff, getLabelByValue };

