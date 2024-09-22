import axios, { AxiosResponse } from "axios";
import _ from "lodash";
import { apiServiceUrl } from "../constants";
import {
  JobBody,
  JobDetail,
  RequestHomePageBody,
  State,
  StateOption,
} from "../interface/home.d";

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

const fetchListStates = async (): Promise<StateOption[]> => {
  try {
    const response = await axios.get<State[]>(
      `${apiServiceUrl}countries/1/states`
    );
    const mappedStates = _.map(response.data, (state) => ({
      label: state.name,
      value: state.name,
    }));
    return mappedStates;
  } catch (error) {
    console.error("Error:", error);
    return [];
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

export { fetchDetailJob, fetchListJob, fetchListStates };

