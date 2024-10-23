import { TimezoneOption } from "../interfaces";
import axios from "./axiosConfig";

export const fetchTimezones = async (): Promise<TimezoneOption[] | void> => {
  try {
    const response = await axios.get("timezones");
    const timezones = response.data;

    const timezoneData = timezones.map((timezone: TimezoneOption) => {
      return {
        id: timezone.id,
        value: `(GMT${timezone.utcOffsetSdt}/${timezone.utfOffsetDst}) ${timezone.tzIdentifier}`,
        label: `(GMT${timezone.utcOffsetSdt}/${timezone.utfOffsetDst}) ${timezone.tzIdentifier}`,
      };
    });

    return timezoneData;
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
};
