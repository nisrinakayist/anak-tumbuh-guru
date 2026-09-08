import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

// Jalan pintas mengambil data akun Guru yang sedang login dari Redux,
// menggantikan penulisan useSelector((state) => state.auth) berulang-ulang.
export default function useAuth() {
  const { user, access_token, loading } = useSelector((state: RootState) => state.auth);
  return { user, accessToken: access_token, loading, isAuthenticated: Boolean(user) };
}
