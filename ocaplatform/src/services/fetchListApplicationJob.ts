import axios, { AxiosResponse } from "axios";
import { apiServiceUrl } from "../constants";
import { JobApplicationBody } from "../interfaces/application";

export const fetchListApplicationJob = async (
  page: number,
  pageSize: number,
  requestBody: { statusId: number }
): Promise<JobApplicationBody | void> => {
  try {
    const response: AxiosResponse<JobApplicationBody> = await axios.post(
      `${apiServiceUrl}applications?page=${page}&size=${pageSize}`,
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
