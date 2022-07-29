import { Flex, Box, Heading, Text, Input } from "@chakra-ui/react";
import { DebounceInput } from "react-debounce-input";
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
      <DebounceInput
        value={name}
        debounceTimeout={500}
        onChange={(event: ChangeEvent<HTMLInputElement>) =>
          setName(event.target.value)
        }
        style={{
          border: "none",
          outline: "none",
          color: "rgba(0, 0, 0, 0.9)",
          fontWeight: "550",
        }}
      />
      <Text fontWeight="medium" color="blackAlpha.700">
        {status}
      </Text>
    </Flex>
  );
};

export default Header;
