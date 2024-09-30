import _ from "lodash";
import moment from "moment";

const keyFormatter = (keys: string) => {
  return _.map(_.split(keys, ","), _.trim);
};

const calculateDaysDiff = (date: string) => {
  const targetDate = moment(date);
  const currentDate = moment();

  const diffInDays = currentDate.diff(targetDate, "day");

  if (diffInDays < 1) {
    return "Today";
  } else {
    return `${diffInDays}d`;
  }
};

const formatDate = (date: string) => {
  return moment(date).format("MM/DD/YYYY");
};

export { calculateDaysDiff, formatDate, keyFormatter };
