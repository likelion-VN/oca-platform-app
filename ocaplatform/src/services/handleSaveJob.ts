import axios from "./axiosConfig";

export const handleSaveJob = async (jobId: number) => {
  try {
    const response = await axios.post(`jobs/${jobId}/mark`);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
  }
};
