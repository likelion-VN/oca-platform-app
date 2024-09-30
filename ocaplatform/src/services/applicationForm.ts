import axios, { AxiosResponse } from "axios";
import { apiServiceUrl } from "../constants";
import { RequestApplicationForm } from "../interfaces/applicationForm";

const putLApplicationForm = async (
  requestBody: RequestApplicationForm
): Promise<boolean | void> => {
  try {
    const response: AxiosResponse<boolean> = await axios.put(
      `${apiServiceUrl}applications`,
      requestBody,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error:", error);
  }
};

const handleUploadFile = async (file: any) => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    const respone = await axios.put(`${apiServiceUrl}attachments`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return respone.data;
  } catch (error) {
    console.error(error);
  }
};

export { handleUploadFile, putLApplicationForm };

