import axios from "axios";
import { apiServiceUrl } from "../constants";

export const handleUploadFile = async (file: any) => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    const response = await axios.put(`${apiServiceUrl}attachments`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
