import { CountryOption } from "../interfaces";
import axios from "./axiosConfig";

export const fetchCountries = async (): Promise<CountryOption[] | void> => {
  try {
    const response = await axios.get("https://restcountries.com/v3.1/all");
    const countries = response.data;

    const countryData = countries.map((country: any) => {
      const timeZones = country.timezones || [];

      const formattedTimeZones = timeZones.map((tz: string) => {
        const offset = tz.replace("UTC", "GMT");

        return `(${offset}) ${
          country.capital ? country.capital[0] : country.name.common
        }`;
      });
      return {
        name: country.name.common,
        phoneCode:
          country.idd.root +
          (country.idd.suffixes ? country.idd.suffixes[0] : ""),
        flag: country.flags.png,
        timezone: formattedTimeZones,
      };
    });

    return countryData;
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
};
