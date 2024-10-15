import { AxiosResponse } from "axios";
import { Attachments } from "../interfaces/applicationForm";
import axios from "./axiosConfig";

export const fetchListAttachments = async (): Promise<Attachments[] | void> => {
  try {
    const response: AxiosResponse<Attachments[]> = await axios.get(
      `users/get-attachments`
    );
    return response.data;
  } catch (error) {
    console.error("Error:", error);
  }
};
