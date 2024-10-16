import { AxiosResponse } from "axios";
import { RequestApplicationForm } from "../interfaces/applicationForm";
import axios from "./axiosConfig";

export const handleSubmitLApplicationForm = async (
  requestBody: RequestApplicationForm
): Promise<boolean | void> => {
  try {
    const response: AxiosResponse<boolean> = await axios.put(
      `applications`,
      requestBody,

    );
    return response.data;
  } catch (error) {
    console.error("Error:", error);
  }
};
