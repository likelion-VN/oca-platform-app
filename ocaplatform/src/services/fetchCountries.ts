import axios from "./axiosConfig";

export const fetchCountries = async (): Promise<any | void> => {
  try {
    const response = await axios.get("https://restcountries.com/v3.1/all");
    const countries = response.data;

    const countryData = countries.map((country: any) => ({
      name: country.name.common,
      phoneCode:
        country.idd.root +
        (country.idd.suffixes ? country.idd.suffixes[0] : ""),
      flag: country.flags.png,
    }));

    return countryData;
  } catch (error) {
    console.error("Error:", error);
  }
};
