import { api } from "@/service/api";
import { createContext, ReactNode, useEffect, useState } from "react";
import { destroyCookie, parseCookies, setCookie } from "nookies";
import { useRouter } from "next/router";
import { useToast } from "@chakra-ui/react";

type SignInRequest = {
  login: string;
  password: string;
};

export type User = {
  id: string;
  password: string;
  email: string;
  name: string;
  username: string;
  avatar: string;
};

type AuthContextDataProps = {
  user: User | null;
  signIn(login: SignInRequest): Promise<void>;
  signOut(): void;
};

export const AuthContext = createContext({} as AuthContextDataProps);

export function AuthContextProvider({ children }: { children: ReactNode }) {
  const toast = useToast();
  const { push } = useRouter();

  const [user, setUser] = useState<User | null>(null);

  async function signIn({ login, password }: SignInRequest) {
    try {
      const response = await api.post("login-user", {
        login,
        password,
      });

      if (response.data === "") {
        toast({
          title: "não foi possível fazer login.",
          description: "",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      } else {
        const {
          id,
          email,
          name,
          password: passwordResponse,
          username,
          avatar,
        } = response.data;

        setCookie(undefined, "@gxgo-social.id", id, {
          maxAge: 60 * 60 * 24 * 30, // 30 days
          path: "/",
        });

        setUser({
          email,
          id,
          name,
          password: passwordResponse,
          username,
          avatar,
        });

        push("/home");
      }
    } catch (error) {}
  }

  function signOut() {
    destroyCookie(undefined, "@gxgo-social.id");

    push("/");
  }

  useEffect(() => {
    async function loadUserData() {
      const { "@gxgo-social.id": id } = parseCookies();

      const response = await api.get(`get-user/${id}`);

      setUser(response.data);
    }

    loadUserData();
  }, []);

  return (
    <AuthContext.Provider value={{ user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
