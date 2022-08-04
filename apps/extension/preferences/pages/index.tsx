import type { NextPage } from 'next'
import { ChakraProvider, Box } from "@chakra-ui/react";
import theme from "ui/theme";

const Home: NextPage = () => {
  return (
    <Box>
      <h2>Hello world!</h2>
      <p>Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.</p>
    </Box>
  )
}

export default Home;
