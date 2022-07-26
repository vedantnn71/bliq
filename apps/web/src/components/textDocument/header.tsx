import { Flex, Box, Heading, Text, Input } from "@chakra-ui/react";
import { useDocumentStore } from "store";
import type { ChangeEvent } from "react";
import logo from "assets/logo.svg";

const Header = () => {
  const name = useDocumentStore((state) => state.name);
  const setName = useDocumentStore((state) => state.setName);
  const status = "Saved";

  return (
    <Flex
      direction="row"
      alignItems="center"
      justify="space-between"
      px="6"
      py="4"
      boxShadow="base"
      w="100%"
      h="max-content"
      overflow="hidden"
    >
      <Input
        value={name}
        color="blackAlpha.800"
        fontWeight="bold"
        maxW="fit-content"
        border="none"
        outline="none"
        onChange={(event: ChangeEvent<HTMLInputElement>) => setName(event.target.value)}
      />
      <Text fontWeight="medium" color="blackAlpha.700">
        {status}
      </Text>
    </Flex>
  );
};

export default Header;
