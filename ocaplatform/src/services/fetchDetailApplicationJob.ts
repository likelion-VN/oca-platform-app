import axios from "axios";
import { apiServiceUrl } from "../constants";
import { JobApplicationDetail } from "../interfaces/application";

export const fetchApplicationDetailJob = async (
  applicationId: number
): Promise<JobApplicationDetail | void> => {
  try {
    const response = await axios.get<JobApplicationDetail>(
      `${apiServiceUrl}applications/${applicationId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error:", error);
  }
};
