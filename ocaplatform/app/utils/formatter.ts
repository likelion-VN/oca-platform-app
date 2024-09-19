import dayjs from 'dayjs';
import _ from 'lodash';

const keyFormatter = (keys: string) => {
    return _.map(_.split(keys, ','), _.trim);
}

const calculateDaysDiff = (date: string) => {
    const targetDate = dayjs(date);
    const currentDate = dayjs();
  
    const diffInDays = currentDate.diff(targetDate, 'day');

    return `${diffInDays}d`;
  }

export { calculateDaysDiff, keyFormatter };

