import { AxiosResponse } from "axios";
import axios from "./axiosConfig";

export const handleCallPhone = async (
  applicationId: string
): Promise<boolean | void> => {
  try {
    const response: AxiosResponse<boolean> = await axios.post(
      `applications/${applicationId}/call-phone`
    );
    return response.data;
  } catch (error) {
    console.error("Error:", error);
  }
};
