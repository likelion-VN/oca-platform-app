import { AxiosResponse } from "axios";
import _ from "lodash";
import { Option } from "../interfaces";
import { LocationBody } from "../interfaces/home";
import axios from "./axiosConfig";

export const fetchListLocation = async (
  searchStr: string,
  page: number,
  pageSize: number
): Promise<Option[]> => {
  try {
    const formatStr = _.capitalize(_.toLower(_.trim(searchStr)));
    const response: AxiosResponse<LocationBody> = await axios.get(
      `locations?searchStr=${formatStr}&page=${page}&size=${pageSize}`
    );
    const mappedLocation = _.map(response.data.content, (item) => ({
      label: `${item.city}, ${item.state}`,
      value: `${item.city}, ${item.state}`,
      id: [item.cityId, item.stateId],
    }));
    return mappedLocation;
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
};
