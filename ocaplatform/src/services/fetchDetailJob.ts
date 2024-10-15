import { JobDetail } from "../interfaces/home";
import axios from "./axiosConfig";

export const fetchDetailJob = async (
  jobId: number
): Promise<JobDetail | void> => {
  try {
    const response = await axios.get<JobDetail>(`jobs/${jobId}`);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
  }
};
