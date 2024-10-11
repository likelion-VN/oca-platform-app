import axios from "axios";
import { apiServiceUrl } from "../constants";

export const handleCancelApplication = async (applicationId: number) => {
  try {
    const response = await axios.post(`${apiServiceUrl}applications/${applicationId}/cancel`);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
  }
};
