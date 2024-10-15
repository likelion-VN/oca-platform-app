import axios, { AxiosResponse } from "axios";
import { apiServiceUrl } from "../constants";
import { RequestApplicationForm } from "../interfaces/applicationForm";
import { http } from "./config";

export const handleSubmitLApplicationForm = async (
  requestBody: RequestApplicationForm
): Promise<boolean | void> => {
  try {
    const response: AxiosResponse<boolean> = await http.put(
      `applications`,
      requestBody,

    );
    return response.data;
  } catch (error) {
    console.error("Error:", error);
  }
};
