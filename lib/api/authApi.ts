import { AuthApiResponse, LoginPayload } from "@/lib/types/authType";

// Login Guru (Teacher) menggunakan Username & Password
export const loginApi = async (payload: LoginPayload): Promise<AuthApiResponse> => {
  try {
    const formData = new FormData();
    formData.append("username", payload.username);
    formData.append("password", payload.password);

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/auth/login`, {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: formData,
    });
    const res = await response.json();
    return res;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
