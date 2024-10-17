import Cookies from 'js-cookie';
import axios from "./axiosConfig";

export const handleSignUp = async (accountTypeId: number) => {
  try {
    const response = await axios.post(
      `users/sign-up`,
      {
        email: decodeURIComponent(Cookies.get('user_email') || ''),
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
