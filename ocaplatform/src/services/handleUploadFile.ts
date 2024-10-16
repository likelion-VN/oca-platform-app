import axios from "./axiosConfig";

export const handleUploadFile = async (file: any) => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    const response = await axios.put(`attachments`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        "Authorization": `Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6ImE1MGY2ZTcwZWY0YjU0OGE1ZmQ5MTQyZWVjZDFmYjhmNTRkY2U5ZWUiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI0MjIwNjY1MjU4OTEtZW02MnVubjhranNrNXVpMGM1Zzh1MHNxNWxscDMxY3MuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI0MjIwNjY1MjU4OTEtZW02MnVubjhranNrNXVpMGM1Zzh1MHNxNWxscDMxY3MuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMDYwNzI0MDMyNzU3OTIwMDM5MjEiLCJoZCI6Imxpa2VsaW9uLm5ldCIsImVtYWlsIjoicXVhbmdraGFpMDkwMUBsaWtlbGlvbi5uZXQiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiYXRfaGFzaCI6IlZJQmdTRVhhRU5DVkd4WHg3dWVUTEEiLCJub25jZSI6IjkyMEU1X281RDFJbTZkcFBfWHpkYVdOYUFyTnlZVF8zbk92eUtiSmNsdFkiLCJuYW1lIjoiRG9RdWFuZyBLaGFpIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hL0FDZzhvY0xhQVY1SFU3VDZOa2Y1ZlhkUU9TczhsRnFNaGxzZGJmMHJwb1Y0a0ttRnEybm9tQT1zOTYtYyIsImdpdmVuX25hbWUiOiJEb1F1YW5nICIsImZhbWlseV9uYW1lIjoiS2hhaSAiLCJpYXQiOjE3Mjg5NzM4NjMsImV4cCI6MTcyODk3NzQ2M30.C0RywHp0Zr1pdmbDDYUduuMQ3-PKDT7ZJz1S9oIOBil1uYsuR5nCMcQv6DrVC9hRzyQyjyz-YL7ppS74S1pwM7ubAgdX_XsTAhv3y5Ptr5Tm9LhnwSmHqFAVn38u2bI1kxmmqxDu71MHYBJcrzM1IBGq0TiJBh6SntrzMnSFjZOfq2YCSXbMu8I3tixOLULVMRqElSezLnttNX81lSc_UHTxvufvsHmoayn9QNfH8yLj14oPK2phseKz9mm9Bzh5UQ6My8CBmUVY2vZLPfIvIQABji39hoVzdRF2ZwMh-tAtVazi6A5ToKThTEyqKmgVnXC_WdLpz7FYr9rAbpGCiQ`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error:", error);
  }
};
