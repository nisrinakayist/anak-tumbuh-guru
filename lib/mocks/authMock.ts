import { User } from "@/lib/types/userType";

export const MOCK_ACCESS_TOKEN = "mock-access-token-123";

export const mockUser: User = {
  id: 1,
  role: "teacher",
  name: "Bu Nisrina",
  nip: "198901012020012001",
  school: { id: 1, name: "SD Negeri Contoh" },
};
