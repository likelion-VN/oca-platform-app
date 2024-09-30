import axios, { AxiosResponse } from "axios";
import _ from "lodash";
import { apiServiceUrl } from "../constants";
import { Option } from "../interfaces";
import {
    AutoCompletedBody,
    JobBody,
    JobDetail,
    LocationBody,
    RequestHomePageBody,
} from "../interfaces/home.d";

const fetchAutoComplete = async (
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

const fetchListLocation = async (
  searchStr: string,
  page: number,
  pageSize: number
): Promise<Option[]> => {
  try {
    const formatStr = _.capitalize(_.toLower(_.trim(searchStr)));
    const response: AxiosResponse<LocationBody> = await axios.get(
      `${apiServiceUrl}locations?searchStr=${formatStr}&page=${page}&size=${pageSize}`
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

const fetchListJob = async (
  page: number,
  pageSize: number,
  requestBody: RequestHomePageBody
): Promise<JobBody | void> => {
  try {
    const response: AxiosResponse<JobBody> = await axios.post(
      `${apiServiceUrl}jobs?page=${page}&size=${pageSize}`,
      requestBody,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error:", error);
  }
};

const fetchDetailJob = async (jobId: number): Promise<JobDetail | void> => {
  try {
    const response = await axios.get<JobDetail>(
      `${apiServiceUrl}jobs/${jobId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error:", error);
  }
};

export { fetchAutoComplete, fetchDetailJob, fetchListJob, fetchListLocation };
