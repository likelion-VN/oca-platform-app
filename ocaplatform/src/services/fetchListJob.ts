import { AxiosResponse } from "axios";
import { JobBody, RequestHomePageBody } from "../interfaces/home";
import axios from "./axiosConfig";

export const fetchListJob = async (
  page: number,
  pageSize: number,
  requestBody: RequestHomePageBody
): Promise<JobBody | void> => {
  try {
    const response: AxiosResponse<JobBody> = await axios.post(
      `jobs?page=${page}&size=${pageSize}`,
      requestBody,

    );
    return response.data;
  } catch (error) {
    console.error("Error:", error);
  }
};
