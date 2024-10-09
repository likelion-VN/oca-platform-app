import axios, { AxiosResponse } from "axios";
import { apiServiceUrl } from "../constants";
import { RequestApplicationForm } from "../interfaces/applicationForm";

export const handleResubmitLApplicationForm = async (
  applicationId: number,
  requestBody: RequestApplicationForm
): Promise<boolean | void> => {
  try {
    const response: AxiosResponse<boolean> = await axios.post(
      `${apiServiceUrl}applications/${applicationId}/resubmit`,
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
