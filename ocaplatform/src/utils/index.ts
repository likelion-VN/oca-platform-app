import dayjs from "dayjs";
import { jwtDecode } from "jwt-decode";
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
      return `${diffInDays} ${diffInDays > 1 ? "days" : "day"} ago`;
    } else {
      return `${diffInDays}d`;
    }
  }
};

const getCookieValue = (name: string): string | null => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);

  if (parts.length === 2) {
    return decodeURIComponent(parts.pop()?.split(';').shift() || '');
  }

  return null;
};

const isTokenExpired = (token: string) => {
  if (!token) return true;

  try {
    const decoded = jwtDecode(token);
    const currentTime = Math.floor(Date.now() / 1000);
    return decoded.exp ? decoded.exp < currentTime : true;
  } catch (error) {
    console.error("Error decoding token:", error);
    return true;
  }
};

export { calculateDaysDiff, getCookieValue, getLabelByValue, isTokenExpired };

