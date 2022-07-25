import { 
  Flex, 
  Box,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  useMediaQuery
} from "@chakra-ui/react";
import { BiMenu } from "react-icons/bi";
import { FC } from "react";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import logo from "assets/logo.svg";
import generateKey from "lib/react/generateKey";

const Nav = () => {
  const [isMobile] = useMediaQuery('(max-width: 768px)');
  const { data, status } = useSession();

  if (data) {
    const { name, image: profile } = data.user;

    if (isMobile) return <MobileNav items={[<h1>hey</h1>]} />

    return (
      <Flex
        direction="column" 
        maxW="max-content"
        h="100vh"
        alignItems="center"
        justify="space-between"
        py="12"
        px="4"
        boxShadow="base"
      >
        <Image 
          height={80}
          width={80}
          src={logo}
          alt="Bliq" 
          priority 
        />
        <Box>
          <Image
            height={50}
            width={50}
            src={profile || ""}
            alt={name}
            style={{ borderRadius: "50%" }}
            priority
          />
        </Box>
      </Flex>
    )
  }

  return <h1>Loading...</h1>
}

interface MobileNavProps {
  items: FC[];
}

const MobileNav: FC<items> = ({ items }) => (
  <Box p="8">
    <Menu>
      <MenuButton
        as={IconButton}
        icon={<BiMenu />}
        variant='outline'
      >
        Actions
      </MenuButton>
      <MenuList>
        {items.map((item, id) => (
          <MenuItem key={generateKey(id)}>
            {item}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  </Box>
)

export default Nav;
