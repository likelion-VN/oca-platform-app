import axios from "axios";
import { CountryOption } from "../interfaces";

export const fetchCountries = async (): Promise<CountryOption[] | void> => {
  try {
    const response = await axios.get("https://restcountries.com/v3.1/all");
    const countries = response.data;

    const countryData = countries.map((country: any) => {
      return {
        name: country.name.common,
        phoneCode:
          country.idd.root +
          (country.idd.suffixes ? country.idd.suffixes[0] : ""),
        flag: country.flags.png,
        countryCode: country.cca2,
      };
    });

    countryData.sort((a: CountryOption, b: CountryOption) =>
      a.name.localeCompare(b.name)
    );

    return countryData;
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
};
