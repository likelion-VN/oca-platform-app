import dayjs from "dayjs";
import _ from "lodash";

const keyFormatter = (keys: string) => {
  return _.map(_.split(keys, ","), _.trim);
};

const formatDate = (date: string) => {
  return dayjs(date).format("MM/DD/YYYY");
};

const maskEmail = (email: string) => {
  const [localPart, domain] = email.split('@');
  
  const maskedLocalPart = '*'.repeat(localPart.length);
  
  const formattedEmail = `${maskedLocalPart}@${domain}`;
  
  return formattedEmail;
}

export { formatDate, keyFormatter, maskEmail };
