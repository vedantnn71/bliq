import {
  Flex,
  Heading,
  Text,
  Button,
  useBreakpointValue,
} from "@chakra-ui/react";
import { BiChevronRight } from "react-icons/bi";
import Image from "next/image";
import Link from "next/link";
import pageData from "configs/pageData.json";
import exampleImage from "assets/example.svg";

const Example = () => {
  const { heading, description, button } = pageData?.example;

  return (
    <Flex
      direction={useBreakpointValue({ base: "column", lg: "row" })}
      justify="space-between"
      p="12"
      bg="white"
    >
      <Flex
        alignItems="flex-start"
        justify="center"
        direction="column"
        gap="8"
        maxW={useBreakpointValue({ base: "100%", lg: "50%" })}
      >
        <Heading overflow="hidden" size="2xl">
          {heading}
        </Heading>
        <Text fontSize="2xl" color="blackAlpha.700">
          {description}
        </Text>

        <Link href="/signup">
          <Button
            rightIcon={<BiChevronRight size="1.75rem" />}
            variant="ghost"
            size="lg"
            p="0"
            _hover={{ gap: "1" }}
          >
            {button}
          </Button>
        </Link>
      </Flex>

      <Image src={exampleImage} alt="example usage of bliq.so" />
    </Flex>
  );
};

export default Example;
