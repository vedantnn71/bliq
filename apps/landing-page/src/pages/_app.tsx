import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { SEO } from "ui/components/web";
import theme from "ui/theme";
import "styles/fonts.css";
import "styles/globals.css";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ChakraProvider theme={theme}>
      <SEO />
      <Component {...pageProps} />
    </ChakraProvider>
  );
};

export default App;
