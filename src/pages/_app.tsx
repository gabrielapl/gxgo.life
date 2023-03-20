import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "@/styles/theme";
import { AuthContextProvider } from "@/context/AuthProvider";
import { queryClient } from "@/service/queryClient";
import { QueryClientProvider } from "react-query";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <AuthContextProvider>
          <Component {...pageProps} />
        </AuthContextProvider>
      </ChakraProvider>
    </QueryClientProvider>
  );
}
