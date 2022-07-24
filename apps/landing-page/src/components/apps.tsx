import {
  Flex,
  Grid,
  Box,
  Heading,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import Image from "next/image";
import pageData from "configs/pageData.json";
import generateKey from "lib/react/generateKey";

const calculateRowsLength = (itemsLength: number) => ~~(itemsLength / 2);

const Apps = () => {
  const { heading, description, categories } = pageData?.apps;

  return (
    <Flex
      direction="column"
      alignItems="center"
      justify="center"
      gap="8"
      px="4"
    >
      <Heading overflow="hidden" textAlign="center" size="2xl">
        {heading}
      </Heading>
      <Text fontSize="2xl" color="blackAlpha.700" textAlign="center">
        {description}
      </Text>
      <Flex gap="20">
        <Flex
          py="8"
          px="10"
          gap="8"
          direction={useBreakpointValue({ base: "column", lg: "row" })}
        >
          {categories.map(({ name, icons }, id) => (
            <Flex
              direction="column"
              justify="space-between"
              gap="8"
              p="8"
              key={generateKey(id)}
              boxShadow="md"
              borderRadius="lg"
              alignItems="center"
            >
              <Heading textAlign="center" fontSize="xl" color="blackAlpha.800">
                {name}
              </Heading>
              <Grid
                templateColumns="repeat(2, 1fr)"
                templateRows={`repeat(${calculateRowsLength(
                  icons.length
                )}, 1fr)`}
                gap="8"
              >
                {icons.map(({ src, alt }, id) => (
                  <Box
                    p="4"
                    boxShadow="sm"
                    borderRadius="lg"
                    key={generateKey(id)}
                  >
                    <Image src={src} height={40} width={40} alt={alt} />
                  </Box>
                ))}
              </Grid>
            </Flex>
          ))}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Apps;
