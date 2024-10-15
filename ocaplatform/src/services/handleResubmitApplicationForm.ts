import { AxiosResponse } from "axios";
import { RequestApplicationForm } from "../interfaces/applicationForm";
import axios from "./axiosConfig";

export const handleResubmitLApplicationForm = async (
  applicationId: number,
  requestBody: RequestApplicationForm
): Promise<boolean | void> => {
  try {
    const response: AxiosResponse<boolean> = await axios.post(
      `applications/${applicationId}/resubmit`,
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
