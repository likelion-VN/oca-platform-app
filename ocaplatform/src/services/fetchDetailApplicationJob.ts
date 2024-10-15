import axios from "axios";
import { apiServiceUrl } from "../constants";
import { JobApplicationDetail } from "../interfaces/application";
import { http } from "./config";

export const fetchApplicationDetailJob = async (
  applicationId: number
): Promise<JobApplicationDetail | void> => {
  try {
    const response = await http.get<JobApplicationDetail>(
      `applications/${applicationId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error:", error);
  }
};
