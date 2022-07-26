import { 
  Flex, 
  Box,
  Heading,
  Text,
  Input
} from "@chakra-ui/react";
import type { ChangeEvent } from "react";
import logo from "assets/logo.svg";

const Header = () => {
  const fileName = "Untitled Document";
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
    >
      <Input 
        value={fileName}
        color="blackAlpha.800"
        fontWeight="bold"
        maxW="fit-content"
        border="none"
        outline="none"
        onChange={(event: ChangeEvent) => {}}
      />
      <Text fontWeight="medium" color="blackAlpha.700">{status}</Text>
    </Flex>
  )
}

export default Header;
