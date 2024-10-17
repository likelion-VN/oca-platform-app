import { getCookieValue } from "../utils";
import axios from "./axiosConfig";

export const handleSignUp = async (accountTypeId: number) => {
  try {
    const response = await axios.post(
      `users/sign-up`,
      {
        email: getCookieValue('user_email'),
        accountTypeId,
      },
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
