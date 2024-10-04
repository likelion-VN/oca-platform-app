import axios, { AxiosResponse } from "axios";
import { apiServiceUrl } from "../constants";
import { ResponseAttachments } from "../interfaces/applicationForm";

export const fetchListAttachments = async (): Promise<
  ResponseAttachments[] | void
> => {
  try {
    const response: AxiosResponse<ResponseAttachments[]> = await axios.get(
      `${apiServiceUrl}users/get-attachments`
    );
    return response.data;
  } catch (error) {
    console.error("Error:", error);
  }
};
