import axios, { AxiosResponse } from "axios";
import { apiServiceUrl } from "../constants";
import { JobBody, RequestHomePageBody } from "../interfaces/home";
import { http } from "./config";

export const fetchListJob = async (
  page: number,
  pageSize: number,
  requestBody: RequestHomePageBody
): Promise<JobBody | void> => {
  try {
    const response: AxiosResponse<JobBody> = await http.post(
      `jobs?page=${page}&size=${pageSize}`,
      requestBody,

    );
    return response.data;
  } catch (error) {
    console.error("Error:", error);
  }
};
