import { AuthApiResponse } from "@/lib/types/authType";

export const mockLoginResponse: AuthApiResponse = {
  code: 200,
  status: "success",
  message: "Login berhasil (data dummy)",
  data: {
    id: 1,
    uuid: "mock-teacher-uuid",
    name: "Bu Nisrina",
    username: "guru1",
    email: "guru1@anaktumbuh.id",
    role: "teacher",
    school_id: 1,
    class_id: 1,
    avatar_url: null,
    is_active: 1,
  },
  access_token: "mock-access-token-123",
};
