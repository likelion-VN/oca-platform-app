import axios from "axios";
import { apiServiceUrl } from "../constants";
import { JobDetail } from "../interfaces/home";

export const fetchDetailJob = async (
  jobId: number
): Promise<JobDetail | void> => {
  try {
    const response = await axios.get<JobDetail>(
      `${apiServiceUrl}jobs/${jobId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error:", error);
  }
};
