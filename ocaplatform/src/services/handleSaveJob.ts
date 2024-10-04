import axios from "axios";
import { apiServiceUrl } from "../constants";

export const handleSaveJob = async (jobId: number) => {
  try {
    const response = await axios.post(`${apiServiceUrl}jobs/${jobId}/mark`);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
  }
};
