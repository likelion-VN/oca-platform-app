import { JobApplicationDetail } from "../interfaces/application";
import axios from "./axiosConfig";

export const fetchApplicationDetailJob = async (
  applicationId: number
): Promise<JobApplicationDetail | void> => {
  try {
    const response = await axios.get<JobApplicationDetail>(
      `applications/${applicationId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error:", error);
  }
};
