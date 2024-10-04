import axios from "axios";
import { apiServiceUrl } from "../constants";

export const handleDeleteFile = async (id: number) => {
  try {
    const response = await axios.delete(`${apiServiceUrl}attachments/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
  }
};
