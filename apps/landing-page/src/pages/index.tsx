import type { NextPage } from "next";
import { Box, Heading } from "@chakra-ui/react";
import Navbar from "components/navbar";
import Hero from "components/hero";
import Example from "components/example";
import Apps from "components/apps";
import Footer from "components/footer";

const Index: NextPage = () => (
  <>
    <Navbar />
    <Hero />
    <Example />
    <Apps />
    <Footer />
  </>
);

export default Index;
