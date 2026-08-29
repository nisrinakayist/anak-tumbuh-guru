import { User } from "@/lib/types/userType";

// Payload untuk login Guru (Teacher) menggunakan Username & Password
export type LoginPayload = {
  username: string;
  password: string;
};

export type AuthApiResponse = {
  code: number;
  status: string;
  message: string;
  data: User | null;
  access_token: string;
};
