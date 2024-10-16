import { AxiosResponse } from "axios";
import { JobApplicationBody } from "../interfaces/application";
import axios from "./axiosConfig";

export const fetchListApplicationJob = async (
  page: number,
  pageSize: number,
  requestBody: { statusId: number }
): Promise<JobApplicationBody | void> => {
  try {
    const response: AxiosResponse<JobApplicationBody> = await axios.post(
      `applications?page=${page}&size=${pageSize}`,
      requestBody,

    );
    return response.data;
  } catch (error) {
    console.error("Error:", error);
  }
};
