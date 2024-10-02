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

const handleDownloadFile = async (id: number) => {
  try {
    const response = await axios.get(`${apiServiceUrl}attachments/${id}`, {
      responseType: "blob",
    });

    const contentType = response.headers['content-type'];
    let mimeType = 'application/pdf';

    if (contentType) {
      mimeType = contentType;
    }
    const blob = new Blob([response.data], { type: mimeType });
    const url = window.URL.createObjectURL(blob);

    const supportedMimes = ['application/pdf', 'image/jpeg', 'image/png', 'text/plain'];
    if (supportedMimes.includes(mimeType)) {
      window.open(url, '_blank');
    } else {
      const link = document.createElement('a');
      link.href = url;

      const contentDisposition = response.headers['content-disposition'];
      let fileName;
      if (contentDisposition) {
        const fileNameMatch = contentDisposition.match(/filename="?(.+)"?/);
        if (fileNameMatch && fileNameMatch[1]) fileName = fileNameMatch[1];
      } else {
        fileName = `resume_${id}`;
      }
      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    }
  } catch (error) {
    console.error(error);
  }
};

export { handleDownloadFile, handleUploadFile, putLApplicationForm };
