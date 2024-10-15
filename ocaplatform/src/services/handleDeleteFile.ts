import axios from "./axiosConfig";

export const handleDeleteFile = async (id: number) => {
  try {
    const response = await axios.delete(`attachments/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
  }
};
