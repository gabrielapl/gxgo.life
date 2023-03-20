import { AuthContext } from "@/context/AuthProvider";
import { useContext } from "react";

export function useAuth() {
  const context = useContext(AuthContext);

  return context;
}
