import dayjs from "dayjs";
import _ from "lodash";

const keyFormatter = (keys: string) => {
  return _.map(_.split(keys, ","), _.trim);
};

const formatDate = (date: string) => {
  return dayjs(date).format("MM/DD/YYYY");
};

export { formatDate, keyFormatter };
