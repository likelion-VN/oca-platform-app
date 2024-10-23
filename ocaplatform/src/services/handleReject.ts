import { AxiosResponse } from "axios";
import axios from "./axiosConfig";

export const handleReject = async (
  applicationId: string
): Promise<boolean | void> => {
  try {
    const response: AxiosResponse<boolean> = await axios.post(
      `applications/${applicationId}/reject`
    );
    return response.data;
  } catch (error) {
    console.error("Error:", error);
  }
};
