import dayjs from "dayjs";
import _ from "lodash";

const keyFormatter = (keys: string) => {
  return _.map(_.split(keys, ","), _.trim);
};

const calculateDaysDiff = (date: string, isFullDay = false) => {
  const targetDate = dayjs(date);
  const currentDate = dayjs();

  const diffInDays = currentDate.diff(targetDate, "day");

  if (diffInDays < 1) {
    return "Today";
  } else {
    if (isFullDay) {
      return `${diffInDays}${diffInDays > 1 ? 'days' : 'day'} ago`;
    } else {
      return `${diffInDays}d`;
    }
  }
};

const formatDate = (date: string) => {
  return dayjs(date).format("MM/DD/YYYY");
};

export { calculateDaysDiff, formatDate, keyFormatter };
