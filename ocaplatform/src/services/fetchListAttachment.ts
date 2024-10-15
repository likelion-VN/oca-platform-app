import axios, { AxiosResponse } from "axios";
import { apiServiceUrl } from "../constants";
import { Attachments } from "../interfaces/applicationForm";
import { http } from "./config";

export const fetchListAttachments = async (): Promise<
  Attachments[] | void
> => {
  try {
    const response: AxiosResponse<Attachments[]> = await http.get(
      `users/get-attachments`
    );
    return response.data;
  } catch (error) {
    console.error("Error:", error);
  }
};
