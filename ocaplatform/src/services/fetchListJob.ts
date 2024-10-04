import axios, { AxiosResponse } from "axios";
import { apiServiceUrl } from "../constants";
import { JobBody, RequestHomePageBody } from "../interfaces/home";

export const fetchListJob = async (
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
