import axios, { AxiosResponse } from "axios";
import { apiServiceUrl } from "../constants";
import { JobApplicationBody } from "../interfaces/application";
import { http } from "./config";

export const fetchListApplicationJob = async (
  page: number,
  pageSize: number,
  requestBody: { statusId: number }
): Promise<JobApplicationBody | void> => {
  try {
    const response: AxiosResponse<JobApplicationBody> = await http.post(
      `applications?page=${page}&size=${pageSize}`,
      requestBody,

    );
    return response.data;
  } catch (error) {
    console.error("Error:", error);
  }
};
