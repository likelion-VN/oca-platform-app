import { AxiosResponse } from "axios";
import _ from "lodash";
import { apiServiceUrl } from "../constants";
import { Option } from "../interfaces";
import { AutoCompletedBody } from "../interfaces/home";
import axios from "./axiosConfig";

export const fetchSearchComplete = async (
  searchStr: string,
  page: number,
  pageSize: number
): Promise<Option[]> => {
  try {
    const response: AxiosResponse<AutoCompletedBody> = await axios.get(
      `${apiServiceUrl}job-titles?searchStr=${searchStr}&page=${page}&size=${pageSize}`
    );
    const mappedAutoComplete = _.map(response.data.content, (item) => ({
      label: item.name,
      value: item.name,
    }));
    return mappedAutoComplete;
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
};
