import axios from "./axiosConfig";

export const handleCancelApplication = async (applicationId: number) => {
  try {
    const response = await axios.post(`applications/${applicationId}/cancel`);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
  }
};
