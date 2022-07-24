import {
  Flex,
  Box,
  Heading,
  Text,
  Button,
  useBreakpointValue,
} from "@chakra-ui/react";
import { BackgroundImage } from "ui/components/web";
import Image from "next/image";
import Link from "next/link";
import pageData from "configs/pageData.json";
import background from "assets/background.png";

const Hero = () => {
  const { heading, description, button } = pageData?.hero;

  const flexCenter = {
    alignItems: "center",
    justify: "center",
  };

  return (
    <Flex py="16" overflow="hidden" direction="column" {...flexCenter}>
      <Flex direction="column" gap="8" maxW={["90%", "70%"]} {...flexCenter}>
        <Heading
          fontSize={useBreakpointValue({ base: "5xl", md: "7xl", lg: "8xl" })}
          bgGradient="linear-gradient(93.83deg, #5200FF 15.46%, #FF0000 93.63%)"
          bgClip="text"
          fontWeight="800"
          textAlign="center"
          overflow="hidden"
        >
          {heading}
        </Heading>
        <Text
          color="blackAlpha.800"
          fontSize={useBreakpointValue({ base: "xl", md: "2xl", lg: "3xl" })}
          textAlign="center"
        >
          {description}
        </Text>
        <Button size="lg" colorScheme="purple" bg="brand.primary">
          {button}
        </Button>
      </Flex>
      <BackgroundImage src={background} />
    </Flex>
  );
};

export default Hero;
