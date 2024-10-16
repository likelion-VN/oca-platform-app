import axios from "./axiosConfig";

export const handleSignUp = async (accountTypeId: number) => {
  try {
    const response = await axios.post(
      `users/sign-up`,
      {
        email: document.cookie
        .split('; ')
        .find(row => row.startsWith('j_user_email='))
        ?.split('=')[1],
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
