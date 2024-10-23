import { AxiosResponse } from "axios";
import { RequestSendEmail } from "../interfaces/applicationForm";
import axios from "./axiosConfig";

export const handleSendEmail = async (
  applicationId: string,
  requestBody: RequestSendEmail
): Promise<boolean | void> => {
  try {
    const response: AxiosResponse<boolean> = await axios.post(
      `applications/${applicationId}/send-email`,
      requestBody,
    );
    return response.data;
  } catch (error) {
    console.error("Error:", error);
  }
};
