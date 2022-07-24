import {
  Flex,
  Box,
  Button,
  IconButton,
  Link as ChakraLink,
  Heading,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useMediaQuery,
} from "@chakra-ui/react";
import { BiMenu } from "react-icons/bi";
import { FC } from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "assets/logo.svg";
import pageData from "configs/pageData.json";
import generateKey from "lib/react/generateKey";

interface NavlinkProps {
  name: string;
  to: string;
  type: string;
}

const Navlink: FC<NavlinkProps> = ({ name, to, type, ...props }) => {
  let isExternal = false;

  if (to.includes("auth")) {
    to = process.env.NEXT_PUBLIC_APP_URL as string + to;
    isExternal = true;
  }

  if (type === "button.primary") {
    return (
      <Button colorScheme="purple" bg="brand.primary">
        <Link href={to} passHref={isExternal}>
          {name}
        </Link>
      </Button>
    );
  }

  return (
    <Link href={to} passHref={isExternal}>
      <ChakraLink>{name}</ChakraLink>
    </Link>
  );
};

const MobileNav = () => {
  const links = pageData?.navbar?.links;

  return (
    <Menu>
      <MenuButton
        as={IconButton}
        aria-label="Options"
        icon={<BiMenu size="1.75rem" />}
        variant="ghost"
      />
      <MenuList>
        {links.map(({ name, to, type }, id) => (
          <MenuItem key={generateKey(id)}>
            <Navlink name={name} to={to} type={type} />
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

const Links = () => {
  const [isSmallScreen] = useMediaQuery("(max-width: 768px)");
  const links = pageData?.navbar?.links;

  if (isSmallScreen) return <MobileNav />;

  return (
    <Flex alignItems="center" gap="12">
      {links.map(({ name, to, type }, id) => (
        <Navlink name={name} to={to} type={type} key={generateKey(id)} />
      ))}
    </Flex>
  );
};

const Navbar = () => {
  const links = pageData?.navbar?.links;

  return (
    <Flex
      direction="row"
      justify="space-between"
      py="4"
      px="12"
      alignItems="center"
      bg="white"
      as="nav"
    >
      <Link href="/">
        <Flex cursor="pointer" alignItems="center">
          <Image src={logo} alt="Bliq logo" priority />
          <Heading size="lg">Bliq</Heading>
        </Flex>
      </Link>
      <Links />
    </Flex>
  );
};

export default Navbar;
