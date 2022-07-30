import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { SessionProvider } from "next-auth/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { SEO } from "ui/components/web";
import theme from "ui/theme";
import "styles/fonts.css";
import "styles/globals.css";

const queryClient = new QueryClient();

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        <ChakraProvider theme={theme}>
          <SEO />
          <Component {...pageProps} />
        </ChakraProvider>
        <ReactQueryDevtools initialIsOpen={true} />
      </QueryClientProvider>
    </SessionProvider>
  );
};

export default App;
