import { JobDetail } from "../interfaces/home";
import { http } from "./config";

export const fetchDetailJob = async (
  jobId: number
): Promise<JobDetail | void> => {
  try {
    const response = await http.get<JobDetail>(
      `jobs/${jobId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error:", error);
  }
};
