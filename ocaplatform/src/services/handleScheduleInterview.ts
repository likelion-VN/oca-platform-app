import { AxiosResponse } from "axios";
import { RequestScheduleInterview } from "../interfaces/applicationForm";
import axios from "./axiosConfig";

export const handleScheduleInterview = async (
  applicationId: string,
  requestBody: RequestScheduleInterview
): Promise<boolean | void> => {
  try {
    const response: AxiosResponse<boolean> = await axios.post(
      `applications/${applicationId}/schedule-interview`,
      requestBody,
    );
    return response.data;
  } catch (error) {
    console.error("Error:", error);
  }
};
