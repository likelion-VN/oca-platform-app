import axios from "./axiosConfig";

export const handleUploadFile = async (file: any) => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    const response = await axios.put(`attachments`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error:", error);
  }
};
